import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);
  const { pathname, hash } = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      hash: s.location.hash,
    }),
  });

  // Website-wide useEffect: Scrolls window to top whenever route pathname changes
  useEffect(() => {
    // If no hash is present, instantly scroll to the top of the page
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [pathname, hash]);

  // Monitor scroll depth to show/hide the modern floating "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className={cn(
        "fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 transition-all duration-300 sm:bottom-7 sm:right-7 sm:h-12 sm:w-12",
        "glass-strong shadow-[0_10px_30px_-10px_rgba(151,207,255,0.45)] hover:border-primary hover:shadow-[0_15px_35px_-8px_rgba(151,207,255,0.7)] active:scale-95",
        showButton
          ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
          : "pointer-events-none translate-y-6 opacity-0 scale-90"
      )}
    >
      <ArrowUp className="h-5 w-5 text-primary transition-transform duration-300 hover:-translate-y-0.5" />
    </button>
  );
}
