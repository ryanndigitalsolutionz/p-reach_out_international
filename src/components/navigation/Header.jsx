import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuChevronDown,
  LuHeartHandshake,
  LuMenu,
  LuX,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import BrandLogo from "../branding/BrandLogo.jsx";
import Sidebar from "./Sidebar.jsx";
import ThemeSelector from "./ThemeSelector.jsx";

export const NAVIGATION_ITEMS = [
  {
    label: "Support",
    links: [
      { label: "Our Services", to: "/services" },
      { label: "Individual Counselling", to: "/counselling" },
      { label: "Group Counselling", to: "/group-counselling" },
      { label: "Mentorship", to: "/mentorship" },
      { label: "Public Speaking", to: "/public-speaking" },
      { label: "Crisis Support", to: "/crisis-support" },
    ],
  },
  {
    label: "Library",
    links: [
      { label: "Mental Health Library", to: "/library" },
      { label: "Educational Resources", to: "/resources" },
      { label: "P-REACH OUT Store", to: "/store" },
    ],
  },
  {
    label: "P-REACH News",
    links: [
      { label: "Latest News", to: "/p-reach-news" },
      { label: "Mission Updates", to: "/p-reach-news/missions" },
      { label: "Community Stories", to: "/p-reach-news/community" },
    ],
  },
  {
    label: "Contact",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "Meet Our Team", to: "/contact/team" },
      { label: "Get Help", to: "/contact/help" },
    ],
  },
  {
    label: "Policies",
    links: [
      { label: "Privacy Policy", to: "/policies/privacy" },
      { label: "Terms of Service", to: "/policies/terms" },
      { label: "Payment Policy", to: "/policies/payments" },
      { label: "Content Policy", to: "/policies/content" },
    ],
  },
];

export default function Header() {
  const { theme } = useTheme();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeNavigation = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 px-2 py-1 sm:px-4 lg:px-5"
        style={{
          backgroundColor: "transparent",
          border: "none",
          pointerEvents: "none",
        }}
      >
        <div
          className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border px-3 py-1 sm:gap-3 sm:px-4"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          }}
        >
          <BrandLogo onClick={closeNavigation} />

          {/* Desktop Navigation */}
          <nav
            className="hidden items-center gap-3 xl:flex"
            aria-label="Main navigation"
          >
            {NAVIGATION_ITEMS.map((item) => {
              const isOpen = openDropdown === item.label;

              const menuId = `navigation-${item.label
                .toLowerCase()
                .replaceAll(" ", "-")}`;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    onClick={() =>
                      setOpenDropdown(isOpen ? null : item.label)
                    }
                    onFocus={() => setOpenDropdown(item.label)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setOpenDropdown(null);
                      }
                    }}
                    className="flex items-center gap-1 whitespace-nowrap py-2 text-xs font-semibold"
                    style={{ color: theme.navText }}
                  >
                    {item.label}

                    <LuChevronDown
                      size={13}
                      className={isOpen ? "rotate-180" : ""}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={menuId}
                      role="menu"
                      className="absolute left-0 top-full z-[80] w-60 rounded-2xl border p-2 shadow-xl"
                      style={{
                        backgroundColor: theme.card,
                        borderColor: theme.border,
                        color: theme.text,
                      }}
                    >
                      {item.links.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          role="menuitem"
                          onClick={closeNavigation}
                          className="block rounded-xl px-4 py-3 text-sm font-medium no-underline"
                          style={{ color: theme.text }}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Theme Selector and Donate */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>

            <Link
              to="/donations"
              onClick={closeNavigation}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-white no-underline sm:px-4"
              style={{ backgroundColor: theme.primary }}
            >
              <LuHeartHandshake size={17} strokeWidth={2} />
              <span>Donate</span>
            </Link>

            {/* Mobile Navigation Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((previous) => !previous)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-main-navigation"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border xl:hidden"
              style={{
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              {mobileOpen ? (
                <LuX size={19} />
              ) : (
                <LuMenu size={19} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Reserves space for the fixed header */}
      <div className="h-[68px]" aria-hidden="true" />

      <Sidebar
        isOpen={mobileOpen}
        onClose={closeNavigation}
        navigationItems={NAVIGATION_ITEMS}
      />
    </>
  );
}
