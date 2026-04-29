// Google Sign-In for Markva — client-only.
//
// - Set GOOGLE_CLIENT_ID below to enable Google sign-in.
// - The Google ID token is decoded in the browser and stored in localStorage.
//   Fine for gating UI; NOT a real security boundary.

import { useSyncExternalStore } from "react";

// TODO: Replace with your own from https://console.cloud.google.com/apis/credentials
export const GOOGLE_CLIENT_ID = "";

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

// Decode JWT payload (no verification — client-only mode).
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
        callback: (resp: { credential: string }) => {
          try {
            const payload = decodeJwt<{
              sub: string;
              name: string;
              email: string;
              picture?: string;
            }>(resp.credential);
            const user: AuthUser = {
              sub: payload.sub,
              name: payload.name,
              email: payload.email,
              picture: payload.picture,
            };
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

export async function signOut() {
  auth.set(null);
}
