
import {
  LuActivity,
  LuHeart,
  LuInfo,
  LuShieldCheck,
} from "react-icons/lu";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const WHO5_ITEMS = ["A1", "A2", "A3", "A4", "A5"];
const PHQ2_ITEMS = ["B1", "B2"];
const GAD2_ITEMS = ["B3", "B4"];
const PHQ9_ITEMS = ["B1", "B2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"];
const GAD7_ITEMS = ["B3", "B4", "E3", "E4", "E5", "E6", "E7"];

function getNumber(value) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function calculateCompleteSum(items, answers) {
  const values = items.map((item) => getNumber(answers[item]));

  if (values.some((value) => value === null)) {
    return null;
  }

  return values.reduce((total, value) => total + value, 0);
}

function getWho5Band(score) {
  if (score === null) return "Incomplete";
  if (score >= 51) return "Good wellbeing range";
  if (score >= 29) return "Low wellbeing";
  return "Very low wellbeing";
}

function getPhq9Band(score) {
  if (score === null) return "Incomplete";
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  if (score <= 19) return "Moderately severe";
  return "Severe";
}

function getGad7Band(score) {
  if (score === null) return "Incomplete";
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  return "Severe";
}

export function calculateWellbeingScores(answers = {}) {
  const who5Raw = calculateCompleteSum(WHO5_ITEMS, answers);
  const who5Score = who5Raw === null ? null : who5Raw * 4;

  const phq2 = calculateCompleteSum(PHQ2_ITEMS, answers);
  const gad2 = calculateCompleteSum(GAD2_ITEMS, answers);

  const phqFollowUpRequired = phq2 !== null && phq2 >= 3;
  const gadFollowUpRequired = gad2 !== null && gad2 >= 3;

  const phq9Raw = phqFollowUpRequired
    ? calculateCompleteSum(PHQ9_ITEMS, answers)
    : null;

  const gad7Raw = gadFollowUpRequired
    ? calculateCompleteSum(GAD7_ITEMS, answers)
    : null;

  const moodAnswer = getNumber(answers.C1);

  return {
    who5: {
      raw: who5Raw,
      score: who5Score,
      band: getWho5Band(who5Score),
    },
    mood: moodAnswer === null ? null : moodAnswer * 10,
    phq2,
    gad2,
    phqFollowUpRequired,
    gadFollowUpRequired,
    phq9: {
      score: phq9Raw,
      band: getPhq9Band(phq9Raw),
    },
    gad7: {
      score: gad7Raw,
      band: getGad7Band(gad7Raw),
    },
  };
}

export function calculateSoberRate(soberStats = {}) {
  const rawTracked = getNumber(soberStats.trackedDays);
  const rawSober = getNumber(soberStats.soberDays);

  const trackedDays = Math.max(0, Math.floor(rawTracked ?? 0));
  const soberDays = Math.min(
    trackedDays,
    Math.max(0, Math.floor(rawSober ?? 0))
  );

  if (trackedDays === 0) {
    return {
      soberDays,
      trackedDays,
      percentage: null,
    };
  }

  return {
    soberDays,
    trackedDays,
    percentage: Math.round((soberDays / trackedDays) * 100),
  };
}

function ScoreCard({ label, value, description, icon: Icon }) {
  const { theme } = useTheme();

  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-medium" style={{ color: theme.text }}>
          {label}
        </span>
        <Icon size={18} style={{ color: "#dc2626" }} />
      </div>

      <p className="text-2xl font-bold" style={{ color: theme.text }}>
        {value}
      </p>

      <p
        className="mt-1 text-xs leading-relaxed"
        style={{ color: theme.text, opacity: 0.65 }}
      >
        {description}
      </p>
    </div>
  );
}

function SoberRate({ answers = {}, soberStats = {} }) {
  const { theme } = useTheme();

  const scores = calculateWellbeingScores(answers);
  const sober = calculateSoberRate(soberStats);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold" style={{ color: theme.text }}>
          Your wellbeing results
        </h2>
        <p
          className="mt-1 text-sm"
          style={{ color: theme.text, opacity: 0.65 }}
        >
          A summary of your latest weekly check-in.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ScoreCard
          label="WHO-5 wellbeing"
          value={
            scores.who5.score === null
              ? "—"
              : `${scores.who5.score}/100`
          }
          description={scores.who5.band}
          icon={LuHeart}
        />

        <ScoreCard
          label="Personal mood"
          value={
            scores.mood === null
              ? "—"
              : `${scores.mood}/100`
          }
          description="Your own mood rating for this week"
          icon={LuActivity}
        />

        <ScoreCard
          label="PHQ-2 screening"
          value={
            scores.phq2 === null
              ? "—"
              : `${scores.phq2}/6`
          }
          description={
            scores.phq2 === null
              ? "Not completed"
              : scores.phqFollowUpRequired
                ? "Further questions recommended"
                : "Short screening completed"
          }
          icon={LuInfo}
        />

        <ScoreCard
          label="GAD-2 screening"
          value={
            scores.gad2 === null
              ? "—"
              : `${scores.gad2}/6`
          }
          description={
            scores.gad2 === null
              ? "Not completed"
              : scores.gadFollowUpRequired
                ? "Further questions recommended"
                : "Short screening completed"
          }
          icon={LuInfo}
        />
      </div>

      {(scores.phqFollowUpRequired || scores.gadFollowUpRequired) && (
        <div
          className="rounded-2xl border p-4"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
          }}
        >
          <h3
            className="font-semibold"
            style={{ color: theme.text }}
          >
            Follow-up screening
          </h3>

          {scores.phqFollowUpRequired && (
            <p
              className="mt-2 text-sm"
              style={{ color: theme.text, opacity: 0.75 }}
            >
              PHQ-9: {scores.phq9.score === null
                ? "Follow-up answers are not yet available."
                : `${scores.phq9.score}/27 — ${scores.phq9.band}`}
            </p>
          )}

          {scores.gadFollowUpRequired && (
            <p
              className="mt-2 text-sm"
              style={{ color: theme.text, opacity: 0.75 }}
            >
              GAD-7: {scores.gad7.score === null
                ? "Follow-up answers are not yet available."
                : `${scores.gad7.score}/21 — ${scores.gad7.band}`}
            </p>
          )}
        </div>
      )}

      <div
        className="rounded-2xl border p-5"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: "rgba(220,38,38,0.1)" }}
          >
            <LuShieldCheck size={22} style={{ color: "#dc2626" }} />
          </div>

          <div>
            <h3 className="font-semibold" style={{ color: theme.text }}>
              Your sober progress
            </h3>
            <p
              className="text-xs"
              style={{ color: theme.text, opacity: 0.6 }}
            >
              Based on your Milestones records
            </p>
          </div>
        </div>

        {sober.percentage === null ? (
          <p
            className="mt-4 text-sm"
            style={{ color: theme.text, opacity: 0.7 }}
          >
            Your sober percentage will appear once you have recorded your
            sober-day activity.
          </p>
        ) : (
          <>
            <div className="mt-5 flex items-end justify-between gap-3">
              <p className="text-3xl font-bold" style={{ color: theme.text }}>
                {sober.percentage}%
              </p>

              <p
                className="text-sm"
                style={{ color: theme.text, opacity: 0.7 }}
              >
                {sober.soberDays} of {sober.trackedDays} tracked days
              </p>
            </div>

            <div
              className="mt-3 h-2.5 overflow-hidden rounded-full"
              style={{ backgroundColor: theme.border }}
            >
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${sober.percentage}%`,
                  backgroundColor: "#dc2626",
                }}
              />
            </div>
          </>
        )}
      </div>

      <p
        className="flex items-start gap-2 text-xs leading-relaxed"
        style={{ color: theme.text, opacity: 0.6 }}
      >
        <LuInfo size={15} className="mt-0.5 shrink-0" />
        These questionnaire scores are wellbeing screening indicators, not
        medical diagnoses. They are intended to help you reflect on your
        experience and identify when additional support may be useful.
      </p>
    </section>
  );
}

export default SoberRate;
