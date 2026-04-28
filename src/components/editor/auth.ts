// Google Sign-In for Markva.
//
// Two modes — pick one:
//
// 1) CLIENT-ONLY (default, no backend)
//    - Set GOOGLE_CLIENT_ID below.
//    - Leave AUTH_SERVER_URL = "".
//    - The Google ID token is decoded in the browser. Fine for gating UI;
//      NOT a real security boundary.
//
// 2) SERVER-VERIFIED (recommended for production)
//    - Run the Express server in /server (see server/README.md).
//    - Set AUTH_SERVER_URL to its origin, e.g. "http://localhost:8787".
//    - The token is verified server-side and a HttpOnly cookie is issued.
//    - Call hydrateAuth() once on app start to restore the session.

import { useSyncExternalStore } from "react";

// TODO: Replace with your own from https://console.cloud.google.com/apis/credentials
export const GOOGLE_CLIENT_ID = "";

// Leave "" to run client-only. Set to your auth server origin to enable server verification.
export const AUTH_SERVER_URL = "";

export type AuthUser = {
  sub: string;
  name: string;
  email: string;
  picture?: string;
};

const STORAGE_KEY = "markva.auth.user";

const listeners = new Set<() => void>();
let current: AuthUser | null = readInitial();

function readInitial(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

export const auth = {
  get: () => current,
  set: (u: AuthUser | null) => {
    current = u;
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    }
    emit();
  },
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useAuth(): AuthUser | null {
  return useSyncExternalStore(
    (cb) => auth.subscribe(cb),
    () => current,
    () => null,
  );
}

// Decode JWT payload (no verification — only used in client-only mode).
function decodeJwt<T>(token: string): T {
  const payload = token.split(".")[1];
  const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(json) as T;
}

let gisLoading: Promise<void> | null = null;
function loadGis(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).google?.accounts?.id) return Promise.resolve();
  if (gisLoading) return gisLoading;
  gisLoading = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(s);
  });
  return gisLoading;
}

async function exchangeCredentialWithServer(credential: string): Promise<AuthUser> {
  const res = await fetch(`${AUTH_SERVER_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ credential }),
  });
  if (!res.ok) throw new Error(`Auth server rejected token (${res.status})`);
  const { user } = (await res.json()) as { user: AuthUser };
  return user;
}

/** Trigger Google sign-in. Resolves with the signed-in user. */
export async function signInWithGoogle(): Promise<AuthUser> {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error(
      "Google sign-in is not configured. Add your Google OAuth Client ID in src/components/editor/auth.ts (GOOGLE_CLIENT_ID).",
    );
  }
  await loadGis();
  const google = (window as any).google;
  return new Promise<AuthUser>((resolve, reject) => {
    try {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (resp: { credential: string }) => {
          try {
            let user: AuthUser;
            if (AUTH_SERVER_URL) {
              user = await exchangeCredentialWithServer(resp.credential);
            } else {
              const payload = decodeJwt<{
                sub: string;
                name: string;
                email: string;
                picture?: string;
              }>(resp.credential);
              user = {
                sub: payload.sub,
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
              };
            }
            auth.set(user);
            resolve(user);
          } catch (e) {
            reject(e);
          }
        },
      });
      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
          reject(new Error("Sign-in was dismissed. Please try again."));
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

/** Restore session from the auth server cookie. Call once on app startup. */
export async function hydrateAuth(): Promise<void> {
  if (!AUTH_SERVER_URL) return;
  try {
    const res = await fetch(`${AUTH_SERVER_URL}/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) {
      auth.set(null);
      return;
    }
    const { user } = (await res.json()) as { user: AuthUser | null };
    auth.set(user);
  } catch {
    /* offline — keep current state */
  }
}

export async function signOut() {
  if (AUTH_SERVER_URL) {
    try {
      await fetch(`${AUTH_SERVER_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      /* ignore */
    }
  }
  auth.set(null);
}
