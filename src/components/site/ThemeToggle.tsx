"use client";

import { useSyncExternalStore } from "react";

type Mode = "light" | "dark";

const EVENT = "upveraoffer:themechange";

/**
 * The theme lives on <html class="dark">, which is set by the inline script
 * below before first paint. That element is the source of truth, so the
 * component subscribes to it as an external store rather than mirroring it
 * into React state — which keeps hydration correct and avoids a setState
 * inside an effect.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

function getSnapshot(): Mode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Mode {
  // The server cannot know the visitor's preference; React re-reads the real
  // value immediately after hydration.
  return "light";
}

export function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private-mode browsers can throw; the toggle still works for the session.
    }
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
    >
      <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" aria-hidden="true">
        {mode === "dark" ? (
          <path
            d="M16 11.4A6.5 6.5 0 1 1 8.6 4a5.2 5.2 0 0 0 7.4 7.4Z"
            fill="currentColor"
          />
        ) : (
          <>
            <circle cx="10" cy="10" r="3.4" fill="currentColor" />
            <path
              d="M10 2.2v1.6M10 16.2v1.6M17.8 10h-1.6M3.8 10H2.2M15.5 4.5l-1.1 1.1M5.6 14.4l-1.1 1.1M15.5 15.5l-1.1-1.1M5.6 5.6 4.5 4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </button>
  );
}

/**
 * Runs before paint so the correct theme is applied with no flash.
 * Kept as a raw string because it must execute before React hydrates.
 */
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark'
                      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`;
