import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext.jsx";

import BrandLogo from "../branding/BrandLogo.jsx";
import HamburgerIcon from "./HamburgerIcon.jsx";
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
        className="sticky top-0 z-50 px-2 py-2 sm:px-4 lg:px-6"
        style={{
          backgroundColor: theme.navBg,
          borderBottom: `1px solid ${theme.border}`,
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border px-3 py-1.5 sm:gap-4 sm:px-4"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
            color: theme.text,
          }}
        >
          <BrandLogo onClick={closeNavigation} />

          {/* Desktop navigation */}
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
                    className="flex items-center gap-1 whitespace-nowrap py-2 text-xs font-semibold transition-opacity hover:opacity-65"
                    style={{ color: theme.navText }}
                  >
                    {item.label}

                    <svg
                      viewBox="0 0 20 20"
                      className={`h-3 w-3 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="m5 7 5 5 5-5" />
                    </svg>
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
                          className="block rounded-xl px-4 py-3 text-sm font-medium no-underline transition hover:opacity-70"
                          style={{
                            color: theme.text,
                            backgroundColor: "transparent",
                          }}
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

          {/* Theme and primary action */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:block">
              <ThemeSelector />
            </div>

            <Link
              to="/donations"
              onClick={closeNavigation}
              className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-white no-underline transition-transform hover:-translate-y-0.5 sm:px-4"
              style={{ backgroundColor: theme.primary }}
            >
              <span aria-hidden="true">♥</span>
              <span>Donate</span>
            </Link>

            <div className="xl:hidden">
              <HamburgerIcon
                open={mobileOpen}
                onClick={() => setMobileOpen((previous) => !previous)}
                style={{
                  borderColor: theme.border,
                  color: theme.text,
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <Sidebar
        isOpen={mobileOpen}
        onClose={closeNavigation}
        navigationItems={NAVIGATION_ITEMS}
      />
    </>
  );
}
