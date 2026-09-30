import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";

const CONSENT_STORAGE_KEY = "autoviax_cookie_consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!consent) {
        // Small delay for smooth entrance after page load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked/unavailable
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, "essential");
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      role="region"
      aria-label="GDPR Cookie Consent"
      className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm sm:bottom-6 sm:right-6 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 p-5 shadow-2xl backdrop-blur-xl transition-all"
        style={{
          backgroundColor: "rgba(1, 2, 6, 0.92)",
          boxShadow: "0 12px 40px -8px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(151, 207, 255, 0.15)",
        }}
      >
        {/* Subtle accent glow line at top */}
        <div
          className="absolute inset-x-0 top-0 h-[1px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(151, 207, 255, 0.5) 50%, transparent 100%)",
          }}
        />

        {/* Close Button */}
        <button
          onClick={handleDecline}
          aria-label="Close cookie banner"
          className="absolute top-3.5 right-3.5 rounded-lg p-1 text-[#D2D2D2]/70 hover:text-[#EFEFEF] hover:bg-white/5 transition-colors"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-start gap-3.5">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10"
            style={{ backgroundColor: "#050709" }}
          >
            <Cookie className="size-4 text-[#97CFFF]" />
          </div>

          <div className="space-y-1 pr-4">
            <h3
              className="text-sm font-semibold tracking-tight"
              style={{ color: "#EFEFEF" }}
            >
              Cookie Preferences
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "#D2D2D2" }}
            >
              We use essential and analytics cookies to optimize autonomous telemetry and operational insights. Read our{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-2 hover:text-[#97CFFF] transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 rounded-lg px-3.5 py-2 text-xs font-semibold tracking-wide transition-all shadow-sm hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: "#97CFFF",
              color: "#010206",
            }}
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleDecline}
            className="rounded-lg px-3.5 py-2 text-xs font-medium border border-white/10 transition-all hover:bg-white/5 active:scale-[0.98]"
            style={{
              backgroundColor: "#050709",
              color: "#D2D2D2",
            }}
          >
            Essential Only
          </button>
        </div>
      </div>
    </aside>
  );
}
