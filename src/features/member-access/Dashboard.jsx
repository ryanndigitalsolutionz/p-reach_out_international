import { useState } from "react";
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
  LuSettings,
  LuUser,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuMenu,
  LuX,
  LuArrowUpRight,
  LuCalendarCheck,
  LuAward,
  LuLockKeyhole,
  LuSparkles,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import { TopBar } from "../../components/navigation/TopBar.jsx";

const navigationItems = [
  { label: "Dashboard", path: "/dashboard", icon: LuLayoutDashboard },
  { label: "Check-in", path: "/check-in", icon: LuHeart },
  { label: "Milestones", path: "/milestones", icon: LuTrendingUp },
  { label: "Groups", path: "/groups", icon: LuUsers },
  { label: "People Hub", path: "/people-hub", icon: LuUsers },
  { label: "P-R News", path: "/p-r-news", icon: LuNewspaper },
  { label: "Journal", path: "/journal", icon: LuBookOpen },
  { label: "Resources", path: "/resources", icon: LuMapPin },
  { label: "Donations", path: "/donations", icon: LuHandHeart },
];

function SidebarLink({ item, collapsed, onNavigate, theme }) {
  const location = useLocation();
  const Icon = item.icon;

  const isActive =
    location.pathname === item.path ||
    location.pathname.startsWith(`${item.path}/`);

  return (
    <Link
      to={item.path}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      aria-current={isActive ? "page" : undefined}
      className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 ${
        collapsed ? "justify-center" : ""
      }`}
      style={{
        backgroundColor: isActive ? theme.bgSoft : "transparent",
        color: isActive ? theme.primary : theme.textMid,
        outlineColor: theme.primary,
      }}
    >
      <Icon
        size={20}
        strokeWidth={isActive ? 2.2 : 1.8}
        className="shrink-0"
      />

      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

export function MemberSidebar({
  collapsed = false,
  onToggle,
  onNavigate,
  mobile = false,
}) {
  const { theme } = useTheme();
  const location = useLocation();

  const isCrisisActive =
    location.pathname === "/crisis" ||
    location.pathname.startsWith("/crisis/");

  return (
    <aside
      className={`flex flex-col border-r ${
        mobile ? "h-full w-[min(290px,86vw)]" : "h-full min-h-full"
      }`}
      style={{
        width: mobile ? undefined : collapsed ? "76px" : "264px",
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      {/* Sidebar heading */}
      <div
        className={`flex min-h-[76px] items-center border-b px-4 ${
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
            onClick={onNavigate}
            aria-label="Close navigation"
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ color: theme.textMid }}
          >
            <LuX size={21} />
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

      {/* Main navigation */}
      <nav
        aria-label="Member navigation"
        className="flex-1 space-y-1 overflow-y-auto px-3 py-5"
      >
        {navigationItems.map((item) => (
          <SidebarLink
            key={item.path}
            item={item}
            collapsed={collapsed && !mobile}
            onNavigate={onNavigate}
            theme={theme}
          />
        ))}
      </nav>

      {/* Persistent SOS shortcut */}
      <div
        className="border-t px-3 py-4"
        style={{ borderColor: theme.border }}
      >
        <Link
          to="/crisis"
          onClick={onNavigate}
          title={!mobile && collapsed ? "SOS Crisis Support" : undefined}
          aria-label="SOS Crisis Support"
          aria-current={isCrisisActive ? "page" : undefined}
          className={`flex min-h-12 items-center gap-3 rounded-xl border px-3 text-sm font-bold no-underline transition-colors ${
            collapsed && !mobile ? "justify-center" : ""
          }`}
          style={{
            color: isCrisisActive ? "#9F1740" : theme.text,
            backgroundColor: "rgba(200, 25, 60, 0.08)",
            borderColor: "rgba(200, 25, 60, 0.18)",
          }}
        >
          <LuPhoneCall size={20} className="shrink-0" />

          {(!collapsed || mobile) && (
            <>
              <span className="flex-1">Crisis Support</span>
              <span className="rounded-full bg-[#C8193C] px-2.5 py-1 text-[10px] font-extrabold tracking-wide text-white">
                SOS
              </span>
            </>
          )}
        </Link>
      </div>

      {/* Member account shortcut */}
      <div
        className="border-t p-3"
        style={{ borderColor: theme.border }}
      >
        <Link
          to="/settings/profile"
          onClick={onNavigate}
          title={!mobile && collapsed ? "My account" : undefined}
          className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold no-underline transition-colors ${
            collapsed && !mobile ? "justify-center" : ""
          }`}
          style={{ color: theme.textMid }}
        >
          <LuUser size={20} className="shrink-0" />

          {(!collapsed || mobile) && (
            <span className="flex-1">My account</span>
          )}

          {(!collapsed || mobile) && (
            <LuSettings size={17} />
          )}
        </Link>
      </div>
    </aside>
  );
}

/**
 * Shared layout for member-access pages.
 * TopBar handles crisis announcements.
 */
export function MemberShell({ children }) {
  const { theme } = useTheme();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileSidebar = () => setMobileOpen(false);

  return (
    <div
      className="flex min-h-screen flex-col overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      <TopBar />

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar */}
        <div className="hidden shrink-0 md:block">
          <MemberSidebar
            collapsed={collapsed}
            onToggle={() =>
              setCollapsed((current) => !current)
            }
          />
        </div>

        {/* Mobile sidebar drawer */}
        {mobileOpen && (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileSidebar}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />

            <div className="fixed inset-y-0 left-0 z-50 md:hidden">
              <MemberSidebar
                mobile
                onNavigate={closeMobileSidebar}
              />
            </div>
          </>
        )}

        {/* Page content */}
        <div className="min-w-0 flex-1">
          {/* Mobile navigation controls */}
          <div
            className="flex items-center justify-between border-b px-4 py-3 md:hidden"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold"
              style={{
                color: theme.text,
                backgroundColor: theme.bgSoft,
              }}
            >
              <LuMenu size={19} />
              Navigation
            </button>

            <Link
              to="/crisis"
              aria-label="SOS Crisis Support"
              className="inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold no-underline"
              style={{
                color: "#9F1740",
                backgroundColor: "rgba(200, 25, 60, 0.09)",
              }}
            >
              <LuPhoneCall size={17} />
              SOS
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function DashboardAction({
  to,
  icon: Icon,
  children,
  primary = false,
  theme,
}) {
  return (
    <Link
      to={to}
      className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold no-underline transition-opacity hover:opacity-85"
      style={{
        color: primary ? "#FFFFFF" : theme.text,
        backgroundColor: primary ? theme.primary : theme.card,
        borderColor: primary ? theme.primary : theme.border,
      }}
    >
      <Icon size={19} />
      {children}
      <LuArrowUpRight size={16} />
    </Link>
  );
}

function ProgressCard({
  icon: Icon,
  title,
  description,
  to,
  action,
  theme,
}) {
  return (
    <article
      className="flex h-full flex-col rounded-2xl border p-5 sm:p-6"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          backgroundColor: theme.bgSoft,
          color: theme.primary,
        }}
      >
        <Icon size={21} />
      </div>

      <h3 className="mt-5 text-base font-extrabold">
        {title}
      </h3>

      <p
        className="mt-2 flex-1 text-sm leading-7"
        style={{ color: theme.textMid }}
      >
        {description}
      </p>

      <Link
        to={to}
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold no-underline transition-opacity hover:opacity-70"
        style={{ color: theme.primary }}
      >
        {action}
        <LuArrowUpRight size={16} />
      </Link>
    </article>
  );
}

function Dashboard({ member = null }) {
  const { theme } = useTheme();

  const displayName =
    member?.preferredName ||
    member?.displayName ||
    member?.fullName ||
    "";

  const currentDate = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <MemberShell>
      <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-10">
        {/* SECTION 01: Welcome and quick actions */}
        <section aria-labelledby="dashboard-welcome">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.16em]"
                style={{ color: theme.primary }}
              >
                Your member space
              </p>

              <h1
                id="dashboard-welcome"
                className="mt-2 text-[clamp(1.8rem,3.5vw,2.7rem)] font-semibold leading-tight"
                style={{
                  color: theme.text,
                  fontFamily: '"Anonymous Pro", monospace',
                }}
              >
                {getGreeting()}
                {displayName ? `, ${displayName}` : ""}
              </h1>

              <p
                className="mt-2 text-sm"
                style={{ color: theme.textMid }}
              >
                {currentDate}
              </p>
            </div>

            <div
              className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
              style={{
                color: theme.primary,
                backgroundColor: theme.bgSoft,
                borderColor: theme.border,
              }}
            >
              <LuCalendarCheck size={17} />
              Your day, your pace
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <DashboardAction
              to="/check-in"
              icon={LuHeart}
              primary
              theme={theme}
            >
              Today's Check-in
            </DashboardAction>

            <DashboardAction
              to="/journal"
              icon={LuBookOpen}
              theme={theme}
            >
              Write a Journal Entry
            </DashboardAction>
          </div>
        </section>

        {/* SECTION 02: Personal progress */}
        <section
          aria-labelledby="personal-progress"
          className="mt-12"
        >
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: theme.primary }}
            >
              Your journey
            </p>

            <h2
              id="personal-progress"
              className="mt-2 text-2xl font-semibold sm:text-3xl"
              style={{
                color: theme.text,
                fontFamily: '"Anonymous Pro", monospace',
              }}
            >
              Your Personal Progress
            </h2>

            <p
              className="mt-2 max-w-2xl text-sm leading-7"
              style={{ color: theme.textMid }}
            >
              Take a moment to recognize the steps you're taking.
              Your progress belongs to you.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ProgressCard
              icon={LuAward}
              title="Milestones"
              description="Your achievements and milestones will appear here as you take part in the community."
              to="/milestones"
              action="Explore milestones"
              theme={theme}
            />

            <ProgressCard
              icon={LuHeart}
              title="Check-in Activity"
              description="Visit your private check-in space to reflect on your wellbeing and review your own history."
              to="/check-in"
              action="Visit check-in"
              theme={theme}
            />

            <ProgressCard
              icon={LuTrendingUp}
              title="Your Personal Journey"
              description="Keep building at your own pace. Your personal progress can grow with the goals that matter to you."
              to="/milestones"
              action="View your progress"
              theme={theme}
            />
          </div>

          <div
            className="mt-4 flex items-start gap-3 rounded-2xl border p-4"
            style={{
              backgroundColor: theme.bgSoft,
              borderColor: theme.border,
            }}
          >
            <LuLockKeyhole
              size={19}
              className="mt-0.5 shrink-0"
              style={{ color: theme.primary }}
            />

            <p
              className="text-xs leading-6 sm:text-sm"
              style={{ color: theme.textMid }}
            >
              Your check-in answers and assessment details are not
              displayed to other members. Your personal reflections
              belong in your private member space.
            </p>
          </div>
        </section>

        {/* SECTION 03: Encouragement and support */}
        <section
          aria-labelledby="encouragement-support"
          className="mt-12 pb-10"
        >
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: theme.primary }}
            >
              A little encouragement
            </p>

            <h2
              id="encouragement-support"
              className="mt-2 text-2xl font-semibold sm:text-3xl"
              style={{
                color: theme.text,
                fontFamily: '"Anonymous Pro", monospace',
              }}
            >
              Encouragement & Support
            </h2>
          </div>

          {/* Motivational message */}
          <div
            className="mt-6 overflow-hidden rounded-3xl border p-7 text-center sm:p-10"
            style={{
              backgroundColor: theme.bgSoft,
              borderColor: theme.border,
            }}
          >
            <LuSparkles
              size={22}
              className="mx-auto"
              style={{ color: theme.primary }}
            />

            <p
              className="mt-4 text-2xl leading-relaxed sm:text-3xl"
              style={{
                color: theme.text,
                fontFamily: '"Story Script", cursive',
              }}
            >
              Small steps still move you forward.
            </p>

            <p
              className="mt-3 text-xs"
              style={{ color: theme.textMid }}
            >
              Take today one moment at a time.
            </p>
          </div>

          {/* Support links */}
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <ProgressCard
              icon={LuMapPin}
              title="Find Resources"
              description="Explore helpful information and resources available through P-REACH OUT."
              to="/resources"
              action="Explore resources"
              theme={theme}
            />

            <ProgressCard
              icon={LuPhoneCall}
              title="Crisis Support"
              description="Find emergency contacts and support services when you or someone else needs help."
              to="/crisis"
              action="Get support"
              theme={theme}
            />

            <ProgressCard
              icon={LuHandHeart}
              title="Support Our Work"
              description="Help sustain P-REACH OUT's community programmes and outreach."
              to="/donations"
              action="Make a contribution"
              theme={theme}
            />
          </div>
        </section>
      </main>
    </MemberShell>
  );
}

export default Dashboard;
