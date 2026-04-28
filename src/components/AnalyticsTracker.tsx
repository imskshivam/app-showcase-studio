import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { initAnalytics, trackPageView } from "@/lib/firebase";

export function AnalyticsTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
