import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LuLayoutDashboard,
  LuHeart,
  LuTrendingUp,
  LuUsers,
  LuNewspaper,
  LuBookOpen,
  LuMapPin,
  LuHandHeart,
  LuPhoneCall,
  LuUser,
  LuSettings,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuChevronDown,
  LuChevronRight,
  LuCreditCard,
  LuBell,
  LuLogOut,
  LuInfo,
  LuShieldCheck,
  LuX,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import ThemeSelector from "./ThemeSelector.jsx";

const SESSION_KEY = "p-reach-out:preview-session:v1";

/* Member navigation */
const memberNavigationItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    label: "Check-in",
    to: "/check-in",
    icon: LuHeart,
  },
  {
    label: "Milestones",
    to: "/milestones",
    icon: LuTrendingUp,
  },
  {
    label: "Groups",
    to: "/groups",
    icon: LuUsers,
  },
  {
    label: "People Hub",
    to: "/people-hub",
    icon: LuUsers,
  },
  {
    label: "P-R News",
    to: "/p-r-news",
    icon: LuNewspaper,
  },
  {
    label: "Journal",
    to: "/journal",
    icon: LuBookOpen,
  },
  {
    label: "Resources",
    to: "/resources",
    icon: LuMapPin,
  },
  {
    label: "Donations",
    to: "/donations",
    icon: LuHandHeart,
  },
];

/* Account settings */
const accountSettingsItems = [
  {
    label: "General",
    to: "/settings/general",
    icon: LuSettings,
  },
  {
    label: "My Profile",
    to: "/settings/profile",
    icon: LuUser,
  },
  {
    label: "My Account",
    to: "/settings/account",
    icon: LuUser,
  },
  {
    label: "Payment Method",
    to: "/settings/payment-method",
    icon: LuCreditCard,
  },
  {
    label: "Notifications",
    to: "/settings/notifications",
    icon: LuBell,
    showChevron: true,
  },
];

/* Support pages */
const supportItems = [
  {
    label: "Group Operations",
    to: "/support/group-operations",
  },
  {
    label: "Team & Volunteers",
    to: "/support/team-volunteers",
  },
  {
    label: "Payments & Records",
    to: "/support/payments-records",
  },
  {
    label: "P-REACH OUT Information",
    to: "/support/information",
  },
  {
    label: "Data Privacy",
    to: "/support/data-privacy",
  },
  {
    label: "Content & News",
    to: "/support/content-news",
  },
];

/* Policies */
const policyItems = [
  {
    label: "Payment Policy",
    to: "/policies/payment",
  },
  {
    label: "Terms & Conditions",
    to: "/policies/terms-and-conditions",
  },
  {
    label: "Terms of Service",
    to: "/policies/terms-of-service",
  },
  {
    label: "Content & News Policy",
    to: "/policies/content-news",
  },
  {
    label: "Privacy Policy",
    to: "/policies/privacy",
  },
  {
    label: "Retention & Access Policy",
    to: "/policies/retention-access",
  },
];

/* Read the active preview session created by Login or Signup. */
function readPreviewSession() {
  try {
    if (typeof window === "undefined") return null;

    const stored = window.localStorage.getItem(SESSION_KEY);

    if (!stored) return null;

    const session = JSON.parse(stored);

    return session && typeof session === "object"
      ? session
      : null;
  } catch {
    return null;
  }
}

/* Get a display name from the saved session. */
function getMemberName(session) {
  if (!session) return "My account";

  return (
    session.fullName?.trim() ||
    [session.firstName, session.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    session.preferredName?.trim() ||
    session.displayName?.trim() ||
    "Member"
  );
}

/* Generate initials for the account avatar. */
function getMemberInitials(name) {
  if (!name || name === "My account") return null;

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/* Individual member navigation item. */
function MemberNavigationItem({
  item,
  collapsed,
  onNavigate,
  theme,
}) {
  const location = useLocation();
  const Icon = item.icon;

  const isActive =
    location.pathname === item.to ||
    location.pathname.startsWith(`${item.to}/`);

  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      aria-current={isActive ? "page" : undefined}
      className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 ${
        collapsed ? "justify-center" : ""
      }`}
      style={{
        color: isActive ? theme.primary : theme.textMid,
        backgroundColor: isActive ? theme.bgSoft : "transparent",
        outlineColor: theme.primary,
      }}
    >
      <Icon
        size={20}
        strokeWidth={isActive ? 2.2 : 1.8}
        className="shrink-0"
      />

      {!collapsed && (
        <span className="truncate">{item.label}</span>
      )}
    </Link>
  );
}

/* Member sidebar content. */
function MemberSidebarContent({
  collapsed,
  mobile,
  onClose,
  onToggle,
  theme,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const accountMenuRef = useRef(null);

  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const [memberSession, setMemberSession] = useState(
    readPreviewSession
  );

  const memberName = getMemberName(memberSession);
  const memberEmail = memberSession?.email || "";
  const memberInitials = getMemberInitials(memberName);

  const isCrisisActive =
    location.pathname === "/crisis" ||
    location.pathname.startsWith("/crisis/");

  /* Sync session changes from other browser tabs. */
  useEffect(() => {
    const syncSession = () => {
      setMemberSession(readPreviewSession());
    };

    window.addEventListener("storage", syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
    };
  }, []);

  /* Close the account menu when clicking outside or pressing Escape. */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
        setMoreOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
        setMoreOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );

      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeAccountMenu = () => {
    setAccountMenuOpen(false);
    setMoreOpen(false);
  };

  const handleNavigate = () => {
    closeAccountMenu();
    onClose?.();
  };

  const handleAccountMenuToggle = () => {
    if (accountMenuOpen) {
      closeAccountMenu();
    } else {
      setAccountMenuOpen(true);
      setMoreOpen(false);
    }
  };

  /* End the preview session without deleting the registered account. */
  const handleLogout = () => {
    try {
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      // Continue to the sign-in page even if storage is unavailable.
    }

    setMemberSession(null);
    closeAccountMenu();
    onClose?.();

    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Sidebar heading */}
      <div
        className={`flex min-h-[76px] shrink-0 items-center border-b px-4 ${
          collapsed && !mobile
            ? "justify-center"
            : "justify-between"
        }`}
        style={{ borderColor: theme.border }}
      >
        {(!collapsed || mobile) && (
          <div className="min-w-0">
            <p
              className="truncate text-sm font-extrabold tracking-wide"
              style={{ color: theme.text }}
            >
              P-REACH OUT
            </p>

            <p
              className="mt-0.5 text-xs"
              style={{ color: theme.textMid }}
            >
              Member space
            </p>
          </div>
        )}

        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              color: theme.textMid,
              backgroundColor: theme.bgSoft,
            }}
          >
            <LuX size={20} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggle}
            aria-label={
              collapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            title={
              collapsed ? "Expand sidebar" : "Collapse sidebar"
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors"
            style={{
              color: theme.textMid,
              backgroundColor: theme.bgSoft,
            }}
          >
            {collapsed ? (
              <LuPanelLeftOpen size={19} />
            ) : (
              <LuPanelLeftClose size={19} />
            )}
          </button>
        )}
      </div>

      {/* Member navigation */}
      <nav
        aria-label="Member navigation"
        className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-5"
      >
        {memberNavigationItems.map((item) => (
          <MemberNavigationItem
            key={item.to}
            item={item}
            collapsed={collapsed && !mobile}
            onNavigate={onClose}
            theme={theme}
          />
        ))}
      </nav>

      {/* Persistent SOS shortcut */}
      <div
        className="shrink-0 border-t px-3 py-4"
        style={{ borderColor: theme.border }}
      >
        <Link
          to="/crisis"
          onClick={onClose}
          title={
            collapsed && !mobile
              ? "SOS Crisis Support"
              : undefined
          }
          aria-label="SOS Crisis Support"
          aria-current={isCrisisActive ? "page" : undefined}
          className={`flex min-h-12 items-center gap-3 rounded-xl border px-3 text-sm font-bold no-underline transition-colors ${
            collapsed && !mobile ? "justify-center" : ""
          }`}
          style={{
            color: "#A21C42",
            backgroundColor: "rgba(200, 25, 60, 0.08)",
            borderColor: "rgba(200, 25, 60, 0.18)",
          }}
        >
          <LuPhoneCall size={20} className="shrink-0" />

          {(!collapsed || mobile) ? (
            <>
              <span className="flex-1">Crisis Support</span>

              <span className="rounded-full bg-[#C8193C] px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-white">
                SOS
              </span>
            </>
          ) : (
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#C8193C]"
              aria-hidden="true"
            />
          )}
        </Link>
      </div>

      {/* Account menu trigger and dropdown */}
      <div
        ref={accountMenuRef}
        className="relative shrink-0 border-t p-3"
        style={{ borderColor: theme.border }}
      >
        <button
          type="button"
          onClick={handleAccountMenuToggle}
          aria-haspopup="true"
          aria-expanded={accountMenuOpen}
          aria-controls="member-account-menu"
          title={
            collapsed && !mobile
              ? `${memberName} — Account settings`
              : undefined
          }
          className={`flex min-h-14 w-full items-center gap-3 rounded-xl px-2 text-left transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 ${
            collapsed && !mobile ? "justify-center" : ""
          }`}
          style={{
            color: theme.textMid,
            outlineColor: theme.primary,
            backgroundColor: accountMenuOpen
              ? theme.bgSoft
              : "transparent",
          }}
        >
          {/* Member avatar */}
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-bold"
            style={{
              backgroundColor: theme.bgSoft,
              color: theme.primary,
            }}
          >
            {memberInitials || <LuUser size={20} />}
          </span>

          {(!collapsed || mobile) && (
            <>
              <span className="flex min-w-0 flex-1 flex-col">
                <span
                  className="truncate text-sm font-semibold"
                  style={{ color: theme.text }}
                >
                  {memberName}
                </span>

                <span
                  className="mt-0.5 truncate text-xs"
                  style={{ color: theme.textMid }}
                >
                  {memberEmail || "Preview account"}
                </span>
              </span>

              <LuSettings
                size={19}
                className="shrink-0"
                aria-hidden="true"
              />
            </>
          )}
        </button>

        {/* Dropdown panel opens upwards */}
        {accountMenuOpen && (
          <div
            id="member-account-menu"
            aria-label="Member account menu"
            className={`absolute z-[100] max-h-[min(76vh,640px)] overflow-y-auto rounded-2xl border p-2 shadow-2xl ${
              collapsed && !mobile
                ? "bottom-0 left-full ml-2 w-72"
                : "bottom-full left-0 mb-2 w-full"
            }`}
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              color: theme.text,
            }}
          >
            {/* Identity summary */}
            <div
              className="flex items-center gap-3 rounded-xl p-3"
              style={{ backgroundColor: theme.bgSoft }}
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  backgroundColor: theme.card,
                  color: theme.primary,
                }}
              >
                {memberInitials || <LuUser size={19} />}
              </span>

              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-bold">
                  {memberName}
                </span>

                <span
                  className="mt-0.5 truncate text-xs"
                  style={{ color: theme.textMid }}
                >
                  {memberEmail || "Preview account"}
                </span>
              </span>
            </div>

            {/* Settings group */}
            <div className="px-2 pb-1 pt-4">
              <p
                className="text-[10px] font-extrabold uppercase tracking-[0.16em]"
                style={{ color: theme.textMid }}
              >
                Settings
              </p>
            </div>

            <div className="space-y-0.5">
              {accountSettingsItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  location.pathname === item.to;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={handleNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className="flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors"
                    style={{
                      color: isActive ? theme.primary : theme.textMid,
                      backgroundColor: isActive
                        ? theme.bgSoft
                        : "transparent",
                    }}
                  >
                    <Icon size={17} className="shrink-0" />

                    <span className="flex-1">{item.label}</span>

                    {item.showChevron && (
                      <LuChevronRight
                        size={15}
                        className="shrink-0 opacity-50"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div
              className="my-2 border-t"
              style={{ borderColor: theme.border }}
            />

            {/* Log out */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors hover:bg-red-500/10"
              style={{ color: "#C62845" }}
            >
              <LuLogOut size={17} />
              <span>Log Out</span>
            </button>

            <div
              className="my-2 border-t"
              style={{ borderColor: theme.border }}
            />

            {/* More: support and policies */}
            <button
              type="button"
              onClick={() => setMoreOpen((previous) => !previous)}
              aria-expanded={moreOpen}
              aria-controls="member-more-navigation"
              className="flex min-h-10 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors hover:opacity-75"
              style={{ color: theme.textMid }}
            >
              <LuInfo size={17} />

              <span className="flex-1">More...</span>

              <LuChevronDown
                size={16}
                className={`shrink-0 transition-transform ${
                  moreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {moreOpen && (
              <div
                id="member-more-navigation"
                className="mt-1 space-y-3 rounded-xl p-2"
                style={{ backgroundColor: theme.bgSoft }}
              >
                {/* Support */}
                <section>
                  <div className="flex items-center gap-2 px-2 py-2">
                    <LuInfo
                      size={14}
                      style={{ color: theme.primary }}
                    />

                    <h3
                      className="text-[10px] font-extrabold uppercase tracking-[0.16em]"
                      style={{ color: theme.textMid }}
                    >
                      Support
                    </h3>
                  </div>

                  <div className="space-y-0.5">
                    {supportItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={handleNavigate}
                        className="block rounded-lg px-3 py-2 text-xs font-medium leading-5 no-underline transition-colors hover:opacity-70"
                        style={{ color: theme.text }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </section>

                <div
                  className="border-t"
                  style={{ borderColor: theme.border }}
                />

                {/* Policies — displayed immediately below Support */}
                <section>
                  <div className="flex items-center gap-2 px-2 py-2">
                    <LuShieldCheck
                      size={14}
                      style={{ color: theme.primary }}
                    />

                    <h3
                      className="text-[10px] font-extrabold uppercase tracking-[0.16em]"
                      style={{ color: theme.textMid }}
                    >
                      Policies
                    </h3>
                  </div>

                  <div className="space-y-0.5">
                    {policyItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={handleNavigate}
                        className="block rounded-lg px-3 py-2 text-xs font-medium leading-5 no-underline transition-colors hover:opacity-70"
                        style={{ color: theme.text }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

/* Member sidebar shell. */
function MemberSidebar({
  collapsed = false,
  onToggle,
  mobile = false,
  isOpen = true,
  onClose,
}) {
  const { theme } = useTheme();

  if (mobile && !isOpen) return null;

  const sidebar = (
    <aside
      id={mobile ? "member-mobile-navigation" : "member-sidebar"}
      aria-label="Member sidebar"
      className={`flex flex-col overflow-visible ${
        mobile
          ? "relative h-full w-[min(290px,86vw)]"
          : "sticky top-0 hidden h-screen shrink-0 border-r md:flex"
      }`}
      style={{
        width: mobile ? undefined : collapsed ? "76px" : "264px",
        backgroundColor: theme.card,
        borderColor: theme.border,
        transition: mobile
          ? undefined
          : "width 280ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <MemberSidebarContent
        collapsed={collapsed && !mobile}
        mobile={mobile}
        onClose={onClose}
        onToggle={onToggle}
        theme={theme}
      />
    </aside>
  );

  if (!mobile) return sidebar;

  return (
    <div className="fixed inset-0 z-[80] md:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/45 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 left-0">
        {sidebar}
      </div>
    </div>
  );
}

/* Existing public mobile navigation. */
function PublicSidebar({
  isOpen,
  onClose,
  navigationItems = [],
}) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] xl:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/50 backdrop-blur-sm"
      />

      <aside
        id="mobile-main-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute right-0 top-0 flex h-full w-[min(88vw,380px)] flex-col overflow-y-auto border-l p-5 shadow-2xl"
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          borderColor: theme.border,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-extrabold">
            Navigation
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border"
            style={{
              borderColor: theme.border,
              color: theme.text,
            }}
          >
            <LuX size={20} />
          </button>
        </div>

        <nav className="mt-7 flex flex-1 flex-col gap-2">
          {navigationItems.map((item) => (
            <details
              key={item.label}
              className="group rounded-xl border"
              style={{ borderColor: theme.border }}
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 font-bold"
                style={{ color: theme.text }}
              >
                {item.label}

                <LuChevronDown
                  size={17}
                  className="shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>

              <div className="flex flex-col gap-1 px-2 pb-2">
                {item.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className="rounded-lg px-4 py-3 text-sm no-underline transition-opacity hover:opacity-70"
                    style={{ color: theme.textMid }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </nav>

        <div
          className="mt-5 flex flex-col gap-4 border-t pt-5"
          style={{ borderColor: theme.border }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: theme.textMid }}
          >
            Appearance
          </span>

          <ThemeSelector className="w-full" />

          <Link
            to="/donations"
            onClick={onClose}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 font-bold text-white no-underline"
            style={{ backgroundColor: theme.primary }}
          >
            Donate
          </Link>
        </div>
      </aside>
    </div>
  );
}

/* Public/member sidebar selector. */
function Sidebar(props) {
  if (props.variant === "member") {
    return <MemberSidebar {...props} />;
  }

  return <PublicSidebar {...props} />;
}

export default Sidebar;
