// Firebase Analytics setup
// 👉 Replace the values below with your Firebase project config
// (Firebase Console → Project Settings → General → Your apps → SDK setup and configuration)
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAnalytics,
  isSupported,
  logEvent as fbLogEvent,
  setUserId as fbSetUserId,
  setUserProperties as fbSetUserProperties,
  type Analytics,
} from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-XXXXXXXXXX",
};

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let initPromise: Promise<Analytics | null> | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined") return null;
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  if (analytics) return analytics;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const supported = await isSupported();
      if (!supported) return null;
      const a = getFirebaseApp();
      if (!a) return null;
      analytics = getAnalytics(a);
      return analytics;
    } catch (err) {
      console.warn("[firebase] analytics init failed", err);
      return null;
    }
  })();

  return initPromise;
}

export async function trackEvent(
  name: string,
  params?: Record<string, unknown>,
) {
  const a = await initAnalytics();
  if (!a) return;
  fbLogEvent(a, name as string, params as Record<string, unknown> | undefined);
}

export async function trackPageView(path: string, title?: string) {
  await trackEvent("page_view", {
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : path,
    page_title: title ?? (typeof document !== "undefined" ? document.title : undefined),
  });
}

export async function setAnalyticsUserId(userId: string | null) {
  const a = await initAnalytics();
  if (!a) return;
  fbSetUserId(a, userId ?? "");
}

export async function setAnalyticsUserProperties(props: Record<string, unknown>) {
  const a = await initAnalytics();
  if (!a) return;
  fbSetUserProperties(a, props as Record<string, unknown>);
}
