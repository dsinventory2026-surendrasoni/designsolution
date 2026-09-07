"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Trustindex Google Reviews Widget Component
 * Widget ID: d756d588027288541856bd7ab60
 *
 * Implemented in a Next.js App Router-safe manner:
 * - Executes only on the client inside useEffect (no SSR / hydration errors).
 * - Dynamically appends the official Trustindex loader script to an isolated container.
 * - MutationObserver detects when Trustindex injects review elements and hides the loader seamlessly.
 * - Cleanup function purges injected nodes on unmount to prevent React DOM reconciliation errors.
 */
export default function TrustindexWidget({ className = "" }) {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset container contents to prevent duplicate widgets if remounted
    container.innerHTML = "";
    setIsLoading(true);

    // Watch for Trustindex elements being added to the DOM
    const observer = new MutationObserver(() => {
      if (
        container.querySelector(".ti-widget") ||
        container.querySelector(".ti-reviews-container") ||
        container.querySelector(".ti-widget-container")
      ) {
        setIsLoading(false);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    // Create the exact Trustindex script element
    const script = document.createElement("script");
    script.src = "https://cdn.trustindex.io/loader.js?d756d588027288541856bd7ab60";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // Allow a brief moment for Trustindex to complete HTML injection
      setTimeout(() => {
        setIsLoading(false);
      }, 400);
    };

    script.onerror = () => {
      setIsLoading(false);
    };

    // Fallback safety timeout (4 seconds) so the spinner never gets stuck
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
      observer.disconnect();
    }, 4000);

    // Append script to container so Trustindex replaces it right inside this container
    container.appendChild(script);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className={`trustindex-wrapper relative w-full overflow-hidden ${className}`}>
      {/* Loading Skeleton / Spinner while Trustindex script fetches reviews */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-300">
            Loading Google Reviews...
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Synchronizing live reviews from Google Business Profile
          </p>
        </div>
      )}

      {/* Trustindex Target Container */}
      <div
        ref={containerRef}
        className={`trustindex-target w-full transition-opacity duration-500 ${
          isLoading ? "opacity-0 min-h-[120px]" : "opacity-100 min-h-[360px]"
        }`}
      />
    </div>
  );
}
