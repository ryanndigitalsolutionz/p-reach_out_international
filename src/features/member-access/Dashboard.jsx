import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LuHeart,
  LuTrendingUp,
  LuBookOpen,
  LuMapPin,
  LuHandHeart,
  LuPhoneCall,
  LuCalendarCheck,
  LuMenu,
  LuAward,
  LuLockKeyhole,
  LuSparkles,
} from "react-icons/lu";
import { ImExit } from "react-icons/im";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import { TopBar } from "../../components/navigation/TopBar.jsx";
import Sidebar from "../../components/navigation/Sidebar.jsx";

export function MemberShell({ children }) {
  const { theme } = useTheme();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCrisisPage = location.pathname === "/crisis";

  const closeMobileSidebar = () => setMobileOpen(false);

  return (
    <div
      className="member-access flex min-h-screen flex-col overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily: "var(--font-member)",
      }}
    >
      <TopBar />

      {isCrisisPage ? (
        /* Standalone Crisis Page Layout */
        <div className="flex min-h-0 flex-1 flex-col">
          <header
            className="border-b px-4 py-3 sm:px-6"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <div className="mx-auto max-w-[1120px]">
              <Link
                to="/dashboard"
                className="inline-flex min-h-10 items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold no-underline transition-colors"
                style={{
                  color: theme.text,
                  backgroundColor: theme.bgSoft,
                }}
              >
                <ImExit size={18} />
                Return to Dashboard
              </Link>
            </div>
          </header>

          <div className="min-w-0 flex-1">
            {children}
          </div>
        </div>
      ) : (
        /* Regular Member Application Layout */
        <div className="flex min-h-0 flex-1">
          {/* Desktop Sidebar */}
          <Sidebar
            variant="member"
            collapsed={collapsed}
            onToggle={() =>
              setCollapsed((current) => !current)
            }
          />

          {/* Mobile Sidebar Drawer */}
          <Sidebar
            variant="member"
            mobile
            isOpen={mobileOpen}
            onClose={closeMobileSidebar}
          />

          {/* Main Content */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Mobile Controls */}
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
      )}
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
      className="flex min-h-14 items-center justify-center gap-3 rounded-2xl border px-5 py-3 text-sm font-bold no-underline transition-colors hover:opacity-85"
      style={{
        color: primary ? "#FFFFFF" : theme.text,
        backgroundColor: primary ? theme.primary : theme.card,
        borderColor: primary ? theme.primary : theme.border,
      }}
    >
      <Icon size={20} />
      {children}
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
        <Icon size={21} strokeWidth={1.8} />
      </div>

      <h3 className="mt-5 text-base font-bold">
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
        className="mt-5 inline-flex w-fit items-center text-sm font-bold no-underline transition-opacity hover:opacity-70"
        style={{ color: theme.primary }}
      >
        {action}
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
                Your Member Space
              </p>

              <h1
                id="dashboard-welcome"
                className="mt-2 text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-tight"
                style={{ color: theme.text }}
              >
                {getGreeting()}
                {displayName ? `, ${displayName}` : ""}
              </h1>

              <p
                className="mt-3 text-sm"
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
              <LuCalendarCheck size={18} />
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
              Your Journey
            </p>

            <h2
              id="personal-progress"
              className="mt-2 text-2xl font-semibold sm:text-3xl"
              style={{ color: theme.text }}
            >
              Your Personal Progress
            </h2>

            <p
              className="mt-3 max-w-2xl text-sm leading-7"
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

          {/* Privacy notice */}
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
              Your check-in answers and assessment details are
              private to you. They are not displayed to other
              members or included in community activity.
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
              A Little Encouragement
            </p>

            <h2
              id="encouragement-support"
              className="mt-2 text-2xl font-semibold sm:text-3xl"
              style={{ color: theme.text }}
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
                fontFamily: "var(--font-script)",
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
