import { Link, useLocation } from "react-router-dom";
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
  LuX,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import ThemeSelector from "./ThemeSelector.jsx";

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

function MemberSidebarContent({
  collapsed,
  mobile,
  onClose,
  onToggle,
  theme,
}) {
  const location = useLocation();

  const isCrisisActive =
    location.pathname === "/crisis" ||
    location.pathname.startsWith("/crisis/");

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

      {/* Account shortcut */}
      <div
        className="shrink-0 border-t p-3"
        style={{ borderColor: theme.border }}
      >
        <Link
          to="/settings/profile"
          onClick={onClose}
          title={
            collapsed && !mobile ? "My account" : undefined
          }
          className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold no-underline transition-colors ${
            collapsed && !mobile ? "justify-center" : ""
          }`}
          style={{ color: theme.textMid }}
        >
          <LuUser size={20} className="shrink-0" />

          {(!collapsed || mobile) && (
            <>
              <span className="flex-1">My account</span>
              <LuSettings size={17} />
            </>
          )}
        </Link>
      </div>
    </>
  );
}

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
      className={`flex flex-col overflow-hidden ${
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

/* Existing public mobile navigation */
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

function Sidebar(props) {
  if (props.variant === "member") {
    return <MemberSidebar {...props} />;
  }

  return <PublicSidebar {...props} />;
}

export default Sidebar;
