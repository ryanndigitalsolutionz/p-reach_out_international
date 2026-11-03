
import { Link } from "react-router-dom";
import {
  LuClipboardCheck,
  LuCalendarClock,
  LuAward,
  LuHeartPulse,
  LuTrendingUp,
  LuLockKeyhole,
  LuBookOpen,
  LuCalendarDays,
  LuInfo,
  LuCircleCheck,
  LuClock,
  LuUsers,
} from "react-icons/lu";

import { useTheme } from "../../../contexts/ThemeContext.jsx";
import { MemberShell } from "../Dashboard.jsx";

/*
 * FRONTEND PREVIEW DATA
 *
 * Replace these values with authorized member data when
 * the check-in and milestones APIs are integrated.
 *
 * No questionnaire answers or personal notes are stored here.
 */

const previewData = {
  latestCheckIn: {
    date: "October 27, 2026",
    who5: 72,
    mood: 8,
    phq2: 1,
    gad2: 1,
    followUpsShown: false,
  },

  recovery: {
    currentStreak: 12,
    soberDays: 20,
    recordedDays: 30,
  },

  moodHistory: [
    { week: "Oct 6", who5: 54, mood: 6 },
    { week: "Oct 13", who5: 61, mood: 7 },
    { week: "Oct 20", who5: 64, mood: 6.5 },
    { week: "Oct 27", who5: 72, mood: 8 },
  ],

  history: [
    { week: "October 27, 2026", who5: 72, mood: 8, completed: true },
    { week: "October 20, 2026", who5: 64, mood: 6.5, completed: true },
    { week: "October 13, 2026", who5: 61, mood: 7, completed: true },
    { week: "October 6, 2026", who5: 54, mood: 6, completed: true },
  ],
};

function SectionHeading({ eyebrow, title, description, theme }) {
  return (
    <div className="mb-6">
      <p
        className="text-xs font-bold uppercase tracking-[0.16em]"
        style={{ color: theme.primary }}
      >
        {eyebrow}
      </p>

      <h2
        className="mt-2 text-2xl font-semibold sm:text-3xl"
        style={{ color: theme.text }}
      >
        {title}
      </h2>

      {description && (
        <p
          className="mt-2 max-w-2xl text-sm leading-7"
          style={{ color: theme.textMid }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  description,
  to,
  action,
  theme,
  featured = false,
}) {
  return (
    <article
      className="flex h-full flex-col rounded-2xl border p-5 sm:p-6"
      style={{
        backgroundColor: featured ? theme.bgSoft : theme.card,
        borderColor: featured ? theme.primary : theme.border,
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          backgroundColor: featured
            ? theme.card
            : theme.bgSoft,
          color: theme.primary,
        }}
      >
        <Icon size={21} strokeWidth={1.8} />
      </div>

      <h3
        className="mt-5 text-base font-bold"
        style={{ color: theme.text }}
      >
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
        className="mt-5 inline-flex min-h-10 w-fit items-center rounded-lg text-sm font-bold no-underline transition-opacity hover:opacity-70"
        style={{ color: theme.primary }}
      >
        {action}
      </Link>
    </article>
  );
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
  description,
  theme,
}) {
  return (
    <article
      className="rounded-2xl border p-4 sm:p-5"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: theme.bgSoft,
            color: theme.primary,
          }}
        >
          <Icon size={20} />
        </div>

        <div className="min-w-0">
          <p
            className="text-xs font-semibold"
            style={{ color: theme.textMid }}
          >
            {label}
          </p>

          <p
            className="mt-0.5 text-2xl font-bold tabular-nums"
            style={{ color: theme.text }}
          >
            {value}
          </p>
        </div>
      </div>

      {description && (
        <p
          className="mt-3 text-xs leading-5"
          style={{ color: theme.textMid }}
        >
          {description}
        </p>
      )}
    </article>
  );
}

function MoodTrendChart({ data, theme }) {
  const chartWidth = 720;
  const chartHeight = 240;
  const left = 45;
  const right = 695;
  const top = 24;
  const bottom = 172;

  const xPosition = (index) =>
    left +
    (index / Math.max(data.length - 1, 1)) *
      (right - left);

  const yPosition = (value) =>
    bottom - (value / 100) * (bottom - top);

  const createPath = (key) =>
    data
      .map((item, index) => {
        const command = index === 0 ? "M" : "L";

        return `${command} ${xPosition(index)} ${yPosition(
          item[key]
        )}`;
      })
      .join(" ");

  const who5Color = theme.primary;
  const moodColor = "#C18B43";

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <LuTrendingUp
            size={19}
            style={{ color: theme.primary }}
          />

          <h3 className="text-base font-bold">
            Wellbeing Trend
          </h3>
        </div>

        <span
          className="text-xs"
          style={{ color: theme.textMid }}
        >
          Weekly results
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-5">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: who5Color }}
          />
          WHO-5 Wellbeing
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: moodColor }}
          />
          Personal Mood
        </div>
      </div>

      <div className="mt-5 w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="h-auto w-full"
          role="img"
          aria-label="Weekly comparison of WHO-5 wellbeing and self-rated mood scores"
        >
          {[0, 50, 100].map((value) => {
            const y = yPosition(value);

            return (
              <g key={value}>
                <line
                  x1={left}
                  y1={y}
                  x2={right}
                  y2={y}
                  stroke={theme.border}
                  strokeDasharray="4 5"
                />

                <text
                  x="30"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill={theme.textMid}
                >
                  {value}
                </text>
              </g>
            );
          })}

          <path
            d={createPath("who5")}
            fill="none"
            stroke={who5Color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={createPath("mood")}
            fill="none"
            stroke={moodColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.map((item, index) => (
            <g key={item.week}>
              <circle
                cx={xPosition(index)}
                cy={yPosition(item.who5)}
                r="4.5"
                fill={who5Color}
                stroke={theme.card}
                strokeWidth="2"
              />

              <circle
                cx={xPosition(index)}
                cy={yPosition(item.mood * 10)}
                r="4.5"
                fill={moodColor}
                stroke={theme.card}
                strokeWidth="2"
              />

              <text
                x={xPosition(index)}
                y="202"
                textAnchor="middle"
                fontSize="11"
                fill={theme.textMid}
              >
                {item.week}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <p
        className="mt-2 text-xs leading-5"
        style={{ color: theme.textMid }}
      >
        Both measures use a 0–100 scale. Your personal mood
        rating is converted from 0–10 for comparison.
      </p>

      <div
        className="mt-4 rounded-xl p-3 text-xs leading-6"
        style={{
          backgroundColor: theme.bgSoft,
          color: theme.textMid,
        }}
      >
        <LuInfo
          size={15}
          className="mr-2 inline-block"
          style={{ color: theme.primary }}
        />
        Your results are best understood over several weeks,
        not from a single score.
      </div>
    </div>
  );
}

function LatestResults({ results, theme }) {
  const resultItems = [
    {
      label: "WHO-5 Wellbeing",
      value: `${results.who5}/100`,
      description: "Higher scores indicate better wellbeing.",
    },
    {
      label: "Personal Mood",
      value: `${results.mood}/10`,
      description: "Your own weekly mood rating.",
    },
    {
      label: "PHQ-2",
      value: `${results.phq2}/6`,
      description: "Short low-mood screening score.",
    },
    {
      label: "GAD-2",
      value: `${results.gad2}/6`,
      description: "Short anxiety screening score.",
    },
  ];

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h3 className="text-base font-bold">
          Latest Wellbeing Results
        </h3>

        <span
          className="text-xs"
          style={{ color: theme.textMid }}
        >
          {results.date}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {resultItems.map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-4"
            style={{ backgroundColor: theme.bgSoft }}
          >
            <p
              className="text-xs font-semibold"
              style={{ color: theme.textMid }}
            >
              {item.label}
            </p>

            <p
              className="mt-2 text-2xl font-bold tabular-nums"
              style={{ color: theme.text }}
            >
              {item.value}
            </p>

            <p
              className="mt-2 text-xs leading-5"
              style={{ color: theme.textMid }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <p
        className="mt-5 text-xs leading-6"
        style={{ color: theme.textMid }}
      >
        These are screening and tracking measures, not medical
        diagnoses. Additional PHQ-9 or GAD-7 questions appear
        only when the relevant screening threshold is reached.
      </p>
    </div>
  );
}

function CheckInHistory({ history, theme }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div
        className="flex flex-col justify-between gap-2 border-b p-5 sm:flex-row sm:items-center sm:px-6"
        style={{ borderColor: theme.border }}
      >
        <div>
          <h3 className="font-bold">
            Previous Check-Ins
          </h3>

          <p
            className="mt-1 text-xs"
            style={{ color: theme.textMid }}
          >
            Your private weekly wellbeing history
          </p>
        </div>

        <Link
          to="/check-in/questionnaire"
          className="text-sm font-bold no-underline transition-opacity hover:opacity-70"
          style={{ color: theme.primary }}
        >
          New check-in
        </Link>
      </div>

      <div className="divide-y" style={{ borderColor: theme.border }}>
        {history.map((item) => (
          <div
            key={item.week}
            className="flex flex-col justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center sm:px-6"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuCalendarDays size={19} />
              </div>

              <div>
                <p className="text-sm font-bold">
                  {item.week}
                </p>

                <p
                  className="mt-1 text-xs"
                  style={{ color: theme.textMid }}
                >
                  WHO-5: {item.who5}/100
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:justify-end">
              <div className="text-left sm:text-right">
                <p className="text-sm font-semibold">
                  Mood: {item.mood}/10
                </p>

                <p
                  className="mt-1 text-xs"
                  style={{ color: theme.textMid }}
                >
                  Weekly check-in
                </p>
              </div>

              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuCircleCheck size={14} />
                Completed
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="border-t px-5 py-4 sm:px-6"
        style={{
          borderColor: theme.border,
          backgroundColor: theme.bgSoft,
        }}
      >
        <p
          className="flex items-center gap-2 text-xs leading-5"
          style={{ color: theme.textMid }}
        >
          <LuLockKeyhole
            size={15}
            className="shrink-0"
            style={{ color: theme.primary }}
          />
          Your individual answers and optional notes remain private.
          This history displays summary scores only.
        </p>
      </div>
    </div>
  );
}

function RecoveryOverview({ recovery, theme }) {
  const soberRate =
    recovery.recordedDays > 0
      ? Math.round(
          (recovery.soberDays / recovery.recordedDays) * 100
        )
      : 0;

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold">
            Recovery Overview
          </h3>

          <p
            className="mt-1 text-xs"
            style={{ color: theme.textMid }}
          >
            From your Milestones records
          </p>
        </div>

        <LuAward
          size={21}
          style={{ color: theme.primary }}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: theme.bgSoft }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: theme.textMid }}
          >
            Current streak
          </p>

          <p
            className="mt-2 text-3xl font-bold tabular-nums"
            style={{ color: theme.text }}
          >
            {recovery.currentStreak}d
          </p>

          <p
            className="mt-1 text-xs"
            style={{ color: theme.textMid }}
          >
            Consecutive sober days
          </p>
        </div>

        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: theme.bgSoft }}
        >
          <p
            className="text-xs font-semibold"
            style={{ color: theme.textMid }}
          >
            30-day sober rate
          </p>

          <p
            className="mt-2 text-3xl font-bold tabular-nums"
            style={{ color: theme.text }}
          >
            {soberRate}%
          </p>

          <p
            className="mt-1 text-xs"
            style={{ color: theme.textMid }}
          >
            {recovery.soberDays}/{recovery.recordedDays} days recorded
          </p>
        </div>
      </div>

      <Link
        to="/milestones"
        className="mt-5 inline-flex min-h-10 items-center text-sm font-bold no-underline transition-opacity hover:opacity-70"
        style={{ color: theme.primary }}
      >
        View recovery milestones
      </Link>
    </div>
  );
}

function CheckInSummary() {
  const { theme } = useTheme();

  const currentDate = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const latest = {
    ...previewData.latestCheckIn,
    date: `Last completed: ${previewData.latestCheckIn.date}`,
  };

  return (
    <MemberShell>
      <main className="mx-auto w-full max-w-[1500px] space-y-10 px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-10">
        {/* Page introduction */}
        <header>
          <p
            className="text-xs font-bold uppercase tracking-[0.16em]"
            style={{ color: theme.primary }}
          >
            Your Wellbeing Space
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1
                className="text-3xl font-semibold sm:text-4xl"
                style={{ color: theme.text }}
              >
                Check-In
              </h1>

              <p
                className="mt-3 max-w-2xl text-sm leading-7"
                style={{ color: theme.textMid }}
              >
                A place to reflect on your wellbeing, follow your
                recovery journey, and connect with counselling support.
              </p>
            </div>

            <div
              className="flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: theme.textMid,
              }}
            >
              <LuCalendarDays
                size={16}
                style={{ color: theme.primary }}
              />
              {currentDate}
            </div>
          </div>
        </header>

        {/* Quick actions */}
        <section aria-label="Check-in actions">
          <div className="grid gap-4 lg:grid-cols-2">
            <ActionCard
              icon={LuClipboardCheck}
              title="Weekly Wellbeing Check-In"
              description="Reflect on the past seven days, complete your questions and review your personal wellbeing results."
              to="/check-in/questionnaire"
              action="Start weekly check-in"
              theme={theme}
              featured
            />

            <ActionCard
              icon={LuCalendarClock}
              title="Counselling Sessions"
              description="Request an individual or group counselling session with the P-REACH OUT team."
              to="/check-in/booked-sessions"
              action="Book a counselling session"
              theme={theme}
            />
          </div>
        </section>

        {/* Recovery overview */}
        <section aria-labelledby="recovery-overview">
          <SectionHeading
            eyebrow="Your recovery journey"
            title="Progress, at Your Own Pace"
            description="Recovery is not linear. Your recorded milestones help you recognise consistency without judging difficult days."
            theme={theme}
          />

          <RecoveryOverview
            recovery={previewData.recovery}
            theme={theme}
          />
        </section>

        {/* Wellbeing trend */}
        <section aria-labelledby="wellbeing-trend">
          <SectionHeading
            eyebrow="Understand your patterns"
            title="Your Wellbeing Trend"
            description="Compare your general wellbeing with the mood rating you give yourself each week."
            theme={theme}
          />

          <MoodTrendChart
            data={previewData.moodHistory}
            theme={theme}
          />
        </section>

        {/* Latest results */}
        <section aria-labelledby="latest-results">
          <SectionHeading
            eyebrow="Your latest reflection"
            title="Latest Check-In Results"
            description="A summary of your most recent completed weekly questionnaire."
            theme={theme}
          />

          <LatestResults
            results={latest}
            theme={theme}
          />
        </section>

        {/* Check-in history */}
        <section aria-labelledby="check-in-history">
          <SectionHeading
            eyebrow="Look back"
            title="Check-In History"
            description="Review your previous weekly check-ins and follow your progress over time."
            theme={theme}
          />

          <CheckInHistory
            history={previewData.history}
            theme={theme}
          />
        </section>

        {/* Upcoming counselling sessions */}
        <section aria-labelledby="counselling-sessions">
          <SectionHeading
            eyebrow="Professional support"
            title="Your Counselling Sessions"
            description="Keep track of individual and group counselling appointments."
            theme={theme}
          />

          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <div className="mx-auto flex max-w-xl flex-col items-center text-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuUsers size={23} />
              </div>

              <h3 className="mt-4 text-lg font-bold">
                No upcoming sessions
              </h3>

              <p
                className="mt-2 text-sm leading-7"
                style={{ color: theme.textMid }}
              >
                Your booked counselling sessions will appear here.
                You can request an individual or group session whenever
                you're ready.
              </p>

              <Link
                to="/check-in/booked-sessions"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-white no-underline transition-opacity hover:opacity-85"
                style={{ backgroundColor: theme.primary }}
              >
                Explore session booking
              </Link>
            </div>
          </div>
        </section>

        {/* Privacy and screening information */}
        <section
          className="flex items-start gap-3 rounded-2xl border p-4 sm:p-5"
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

          <div>
            <h3 className="text-sm font-bold">
              Your wellbeing information is private
            </h3>

            <p
              className="mt-1 text-xs leading-6 sm:text-sm"
              style={{ color: theme.textMid }}
            >
              Your individual questionnaire answers and private notes
              are not displayed to other members. Scores are used for
              personal tracking and screening, not diagnosis.
            </p>
          </div>
        </section>

        {/* Preview data notice */}
        <p
          className="pb-3 text-center text-[11px]"
          style={{ color: theme.textMid }}
        >
          Frontend preview data is currently displayed. Your actual
          records will appear when member data integration is connected.
        </p>
      </main>
    </MemberShell>
  );
}

export default CheckInSummary;
