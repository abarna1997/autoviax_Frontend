import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  pagePath: string;
  hash?: string;
  sectionId?: string;
}

const NAV: NavItem[] = [
  { id: "home", label: "Home", pagePath: "/", sectionId: "top" },
  { id: "about", label: "About", pagePath: "/about" },
  { id: "features", label: "Features", pagePath: "/", hash: "feature", sectionId: "feature" },
  { id: "usecases", label: "Use Cases", pagePath: "/", hash: "usecase", sectionId: "usecase" },
  { id: "pricing", label: "Pricing", pagePath: "/", hash: "pricing", sectionId: "pricing" },
  { id: "contact", label: "Contact", pagePath: "/contact" },
];

function smoothScrollToElement(targetId?: string, smooth = true): boolean {
  if (!targetId || targetId === "top") {
    window.scrollTo({
      top: 0,
      behavior: smooth ? "smooth" : "auto",
    });
    return true;
  }

  const el = document.getElementById(targetId);
  if (el) {
    const headerOffset = 90;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: smooth ? "smooth" : "auto",
    });
    return true;
  }
  return false;
}

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link to="/" onClick={onClick} className={cn("group flex items-center gap-2 sm:gap-3", className)}>
      <img
        src="/logo.svg"
        alt="AutoViaX Logo"
        className="h-10 w-auto object-contain transition-all duration-300 sm:h-12 md:h-14 lg:h-16"
      />
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const isClickScrollingRef = useRef(false);

  const { pathname, hash } = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      hash: s.location.hash,
    }),
  });

  // Update scrolled state for background glass styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Handle cross-page navigation or direct URL load with hash (e.g. navigating from /product to /#feature)
  useEffect(() => {
    if (pathname === "/") {
      const pendingTarget = sessionStorage.getItem("autoviax_nav_target");
      const targetHash = pendingTarget || hash?.replace(/^#/, "");

      if (targetHash) {
        sessionStorage.removeItem("autoviax_nav_target");
        const matchingNav = NAV.find(
          (item) => item.hash === targetHash || item.sectionId === targetHash
        );
        if (matchingNav) {
          setActiveSection(matchingNav.id);
        }

        isClickScrollingRef.current = true;
        let attempts = 0;
        const tryScroll = () => {
          attempts++;
          const success = smoothScrollToElement(targetHash, attempts > 1);
          if (!success && attempts < 15) {
            setTimeout(tryScroll, 60);
          } else {
            setTimeout(() => {
              isClickScrollingRef.current = false;
            }, 800);
          }
        };

        setTimeout(tryScroll, 50);
      } else if (!isClickScrollingRef.current && window.scrollY < 200) {
        setActiveSection("home");
      }
    }
  }, [pathname, hash]);

  // Scroll-spy when on the home page
  useEffect(() => {
    if (pathname !== "/") return;

    const onScrollSpy = () => {
      if (isClickScrollingRef.current) return;

      if (window.scrollY < 200) {
        setActiveSection("home");
        return;
      }

      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isBottom) {
        setActiveSection("usecases");
        return;
      }

      const sections = [
        { id: "feature", navId: "features" },
        { id: "usecase", navId: "usecases" },
        { id: "pricing", navId: "pricing" },
      ];

      const headerOffset = 140;
      let current = "home";

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= headerOffset) {
            current = sec.navId;
          }
        }
      }

      setActiveSection(current);
    };

    onScrollSpy();
    window.addEventListener("scroll", onScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", onScrollSpy);
  }, [pathname]);

  const isItemActive = (item: NavItem) => {
    if (item.pagePath !== pathname) {
      return false;
    }
    if (pathname === "/") {
      return activeSection === item.id;
    }
    return true;
  };

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    setOpen(false);

    // If clicking a section link on the same page
    if (item.pagePath === pathname && item.sectionId) {
      e.preventDefault();
      isClickScrollingRef.current = true;
      setActiveSection(item.id);
      smoothScrollToElement(item.sectionId, true);

      const targetUrl = item.hash ? `/#${item.hash}` : "/";
      window.history.pushState(null, "", targetUrl);

      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 850);
      return;
    }

    // If navigating from another page (like /product) to a section on "/"
    if (item.pagePath !== pathname && item.sectionId) {
      if (item.hash) {
        sessionStorage.setItem("autoviax_nav_target", item.hash);
      }
      setActiveSection(item.id);
      isClickScrollingRef.current = true;
      return;
    }

    setActiveSection(item.id);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    setOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      isClickScrollingRef.current = true;
      setActiveSection("home");
      smoothScrollToElement("top", true);
      window.history.pushState(null, "", "/");
      setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 850);
    }
  };

  const isProductActive = pathname === "/product";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5",
          scrolled
            ? "glass-strong shadow-[0_20px_60px_-40px_rgba(151,207,255,0.7)]"
            : "border border-transparent bg-transparent",
        )}
      >
        <Logo onClick={handleLogoClick} />

        <nav className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {NAV.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.id}
                to={item.pagePath}
                hash={item.hash}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "relative rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors duration-300 lg:px-4 lg:py-2 lg:text-sm",
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-2.5 -bottom-0.5 h-0.5 hairline bg-primary transition-all duration-300 lg:inset-x-3",
                    active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/product"
            onClick={() => setOpen(false)}
            className={cn(
              "group hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 sm:inline-flex lg:px-4 lg:py-2 lg:text-sm",
              isProductActive
                ? "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(151,207,255,0.6)] ring-2 ring-primary/80"
                : "bg-primary text-primary-foreground hover:shadow-[0_16px_40px_-16px] hover:shadow-primary/80",
            )}
          >
            AutoViaX core
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary/40 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "glass-strong mx-auto mt-2 max-w-7xl overflow-y-auto rounded-2xl transition-all duration-400 md:hidden",
          open ? "max-h-[85vh] opacity-100 shadow-2xl" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col p-3 gap-1">
          {NAV.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.id}
                to={item.pagePath}
                hash={item.hash}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "rounded-xl px-4 py-3 text-sm transition-colors",
                  active
                    ? "bg-primary/15 text-primary font-medium border border-primary/30"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/product"
            onClick={() => setOpen(false)}
            className={cn(
              "mt-2 rounded-xl px-4 py-3 text-center text-sm font-medium transition-all",
              isProductActive
                ? "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(151,207,255,0.6)] ring-2 ring-primary/80"
                : "bg-primary text-primary-foreground",
            )}
          >
            AutoViaX core
          </Link>
        </nav>
      </div>
    </header>
  );
}
