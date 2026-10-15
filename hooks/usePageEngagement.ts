"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

const SCROLL_DEPTHS = [25, 50, 75, 100];

// Sends scroll_depth and time_on_page to PostHog (no-op until PostHog is loaded).
export function usePageEngagement(page: string) {
  useEffect(() => {
    const reached = new Set<number>();
    let frame: number | null = null;

    const measure = () => {
      frame = null;
      const height = document.documentElement.scrollHeight;
      const depth = Math.min(100, Math.round(((window.scrollY + window.innerHeight) / height) * 100));
      for (const threshold of SCROLL_DEPTHS) {
        if (depth >= threshold && !reached.has(threshold) && posthog.__loaded) {
          posthog.capture("scroll_depth", { page, depth: threshold });
          reached.add(threshold);
        }
      }
    };
    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [page]);

  useEffect(() => {
    let last = performance.now();
    let visibleMs = 0;
    let lastSent = 0;

    const tick = () => {
      const now = performance.now();
      visibleMs += now - last;
      last = now;
    };
    const send = (reason: string) => {
      if (document.visibilityState === "visible") tick();
      const seconds = Math.round(visibleMs / 1000);
      if (seconds <= lastSent || !posthog.__loaded) return;
      posthog.capture("time_on_page", { page, duration_seconds: seconds, reason });
      lastSent = seconds;
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        tick();
        send("visibility_hidden");
      } else {
        last = performance.now();
      }
    };
    const onExit = () => send("page_exit");

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onExit);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onExit);
      send("page_exit");
    };
  }, [page]);
}
