
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCircleCheck,
  LuClock,
  LuHeart,
  LuInfo,
  LuLockKeyhole,
  LuMessageCircle,
  LuPhoneCall,
  LuShieldAlert,
} from "react-icons/lu";

import { useTheme } from "../../../contexts/ThemeContext.jsx";
import MoodGraph from "../../../components/extras/MoodGraph.jsx";
import SoberRate, {
  calculateWellbeingScores,
} from "../../../components/extras/SoberRate.jsx";
import Spinner from "../../../components/ui/Spinner.jsx";

const wellbeingOptions = [
  { value: 5, label: "All of the time" },
  { value: 4, label: "Most of the time" },
  { value: 3, label: "More than half of the time" },
  { value: 2, label: "Less than half of the time" },
  { value: 1, label: "Some of the time" },
  { value: 0, label: "At no time" },
];

const frequencyOptions = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" },
];

const wellbeingQuestions = [
  { id: "A1", question: "I have felt cheerful and in good spirits" },
  { id: "A2", question: "I have felt calm and relaxed" },
  { id: "A3", question: "I have felt active and vigorous" },
  { id: "A4", question: "I woke up feeling fresh and rested" },
  {
    id: "A5",
    question: "My daily life has been filled with things that interest me",
  },
];

const screeningQuestions = [
  {
    id: "B1",
    question: "Little interest or pleasure in doing things",
  },
  {
    id: "B2",
    question: "Feeling down, depressed, or hopeless",
  },
  {
    id: "B3",
    question: "Feeling nervous, anxious or on edge",
  },
  {
    id: "B4",
    question: "Not being able to stop or control worrying",
  },
];

const phqFollowUpQuestions = [
  {
    id: "D3",
    question: "Trouble falling or staying asleep, or sleeping too much",
  },
  {
    id: "D4",
    question: "Feeling tired or having little energy",
  },
  {
    id: "D5",
    question: "Poor appetite or overeating",
  },
  {
    id: "D6",
    question:
      "Feeling bad about yourself, or that you are a failure or have let yourself or your family down",
  },
  {
    id: "D7",
    question:
      "Trouble concentrating on things, such as reading or watching television",
  },
  {
    id: "D8",
    question:
      "Moving or speaking so slowly that other people could have noticed, or the opposite: being so fidgety or restless that you have been moving around a lot more than usual",
  },
  {
    id: "D9",
    question:
      "Thoughts that you would be better off dead, or of hurting yourself in some way",
    safetyQuestion: true,
  },
];

const gadFollowUpQuestions = [
  {
    id: "E3",
    question: "Worrying too much about different things",
  },
  {
    id: "E4",
    question: "Trouble relaxing",
  },
  {
    id: "E5",
    question: "Being so restless that it is hard to sit still",
  },
  {
    id: "E6",
    question: "Becoming easily annoyed or irritable",
  },
  {
    id: "E7",
    question: "Feeling afraid, as if something awful might happen",
  },
];

const supportContacts = [
  {
    name: "Emergency services",
    number: "112",
    href: "tel:112",
    description: "For immediate danger or urgent emergency assistance.",
  },
  {
    name: "Befrienders Kenya",
    number: "+254 722 178 177",
    href: "tel:+254722178177",
    description:
      "Emotional support and suicide prevention. Contact them to confirm current availability.",
  },
  {
    name: "National Child Helpline",
    number: "116",
    href: "tel:116",
    description: "Free, 24-hour support for children and young people.",
  },
  {
    name: "One2One Hotline",
    number: "1190",
    href: "tel:1190",
    description: "Telephone and SMS support, open daily from 8 AM to 10 PM.",
  },
  {
    name: "NACADA",
    number: "1192",
    href: "tel:1192",
    description:
      "Counselling and referrals for substance-related concerns.",
  },
  {
    name: "COVAW",
    number: "0800 720 553",
    href: "tel:0800720553",
    description:
      "Support for women and girls experiencing gender-based violence.",
  },
];

function hasAnswer(answers, id) {
  return answers[id] !== undefined && answers[id] !== null;
}

function isSectionComplete(answers, questions) {
  return questions.every((question) => hasAnswer(answers, question.id));
}

function clearAnswers(answers, ids) {
  const updated = { ...answers };

  ids.forEach((id) => {
    delete updated[id];
  });

  return updated;
}

function ChoiceQuestion({
  id,
  question,
  options,
  answer,
  onChange,
  theme,
  safetyQuestion = false,
}) {
  return (
    <fieldset
      className="rounded-2xl border p-4 sm:p-5"
      style={{
        backgroundColor: theme.card,
        borderColor: safetyQuestion ? "#dc7777" : theme.border,
      }}
    >
      <legend className="sr-only">
        {id}: {question}
      </legend>

      <div className="mb-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: theme.primary }}
          >
            {id}
          </span>

          {safetyQuestion && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{
                backgroundColor: "rgba(220, 38, 38, 0.1)",
                color: "#b91c1c",
              }}
            >
              <LuShieldAlert size={13} />
              Sensitive question
            </span>
          )}
        </div>

        <h3
          className="mt-2 text-sm font-semibold leading-6 sm:text-base"
          style={{ color: theme.text }}
        >
          {question}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = answer === option.value;

          return (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-sm transition-colors focus-within:ring-2"
              style={{
                backgroundColor: selected
                  ? "rgba(220, 38, 38, 0.08)"
                  : theme.card,
                borderColor: selected ? theme.primary : theme.border,
                color: theme.text,
              }}
            >
              <input
                type="radio"
                name={id}
                value={option.value}
                checked={selected}
                onChange={() => onChange(id, option.value)}
                className="h-4 w-4 shrink-0 accent-red-600"
              />

              <span className="leading-5">{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function SectionHeading({ eyebrow, title, description, theme }) {
  return (
    <div className="mb-5">
      <p
        className="text-xs font-bold uppercase tracking-[0.15em]"
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
          style={{ color: theme.text, opacity: 0.7 }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function SupportContact({ contact, theme }) {
  return (
    <article
      className="flex flex-col justify-between gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div>
        <h3 className="font-semibold" style={{ color: theme.text }}>
          {contact.name}
        </h3>

        <p
          className="mt-1 text-sm leading-6"
          style={{ color: theme.text, opacity: 0.65 }}
        >
          {contact.description}
        </p>
      </div>

      <a
        href={contact.href}
        className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-4 py-2.5 text-sm font-bold no-underline transition-opacity hover:opacity-80 sm:self-center"
        style={{
          backgroundColor: theme.primary,
          color: "#ffffff",
        }}
      >
        <LuPhoneCall size={16} />
        {contact.number}
      </a>
    </article>
  );
}

function SafetySupportScreen({ onReturn, theme }) {
  return (
    <section
      className="mx-auto w-full max-w-4xl space-y-6 py-5 sm:py-8"
      aria-labelledby="safety-support-heading"
    >
      <div
        className="rounded-3xl border p-5 sm:p-8"
        style={{
          backgroundColor: theme.card,
          borderColor: "#dc7777",
        }}
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: "rgba(220, 38, 38, 0.1)",
            color: "#dc2626",
          }}
        >
          <LuHeart size={25} />
        </div>

        <p
          className="mt-5 text-xs font-bold uppercase tracking-[0.15em]"
          style={{ color: "#b91c1c" }}
        >
          Your safety matters
        </p>

        <h1
          id="safety-support-heading"
          className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl"
          style={{ color: theme.text }}
        >
          You do not have to carry this alone.
        </h1>

        <p
          className="mt-4 max-w-2xl text-sm leading-7"
          style={{ color: theme.text, opacity: 0.8 }}
        >
          Thank you for being honest. It can be difficult to share what
          you are experiencing. You deserve support, and there are people
          you can talk to.
        </p>

        <p
          className="mt-3 max-w-2xl text-sm leading-7"
          style={{ color: theme.text, opacity: 0.8 }}
        >
          You do not need to finish this questionnaire before reaching
          out. Consider contacting someone you trust and asking them to
          stay with you while you seek support.
        </p>
      </div>

      <div>
        <h2
          className="text-xl font-semibold"
          style={{ color: theme.text }}
        >
          Contact someone who can help
        </h2>

        <p
          className="mt-2 text-sm leading-6"
          style={{ color: theme.text, opacity: 0.65 }}
        >
          These contacts provide different kinds of support. Choose the
          one that best fits what you need.
        </p>

        <div className="mt-4 grid gap-3">
          {supportContacts.map((contact) => (
            <SupportContact
              key={contact.name}
              contact={contact}
              theme={theme}
            />
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl border p-5"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
        }}
      >
        <h2 className="font-semibold" style={{ color: theme.text }}>
          Need immediate help?
        </h2>

        <p
          className="mt-2 text-sm leading-7"
          style={{ color: theme.text, opacity: 0.75 }}
        >
          If you feel you may act on these thoughts now, or you are in
          immediate danger, call 112 or go to the nearest emergency
          department. Do not wait for an online message or email response.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="tel:112"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold no-underline"
            style={{
              backgroundColor: theme.primary,
              color: "#ffffff",
            }}
          >
            <LuPhoneCall size={17} />
            Call 112
          </a>

          <Link
            to="/crisis"
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold no-underline"
            style={{
              borderColor: theme.border,
              color: theme.text,
            }}
          >
            View crisis support
            <LuArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div
        className="rounded-2xl border p-5"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
        }}
      >
        <div className="flex items-center gap-2">
          <LuMessageCircle size={19} style={{ color: theme.primary }} />
          <h2 className="font-semibold" style={{ color: theme.text }}>
            Contact P-REACH OUT
          </h2>
        </div>

        <p
          className="mt-2 text-sm leading-6"
          style={{ color: theme.text, opacity: 0.7 }}
        >
          You can also contact the organisation's team to ask about
          counselling and follow-up support.
        </p>

        <Link
          to="/contact"
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold no-underline"
          style={{ color: theme.primary }}
        >
          Contact the team
          <LuArrowRight size={16} />
        </Link>
      </div>

      <button
        type="button"
        onClick={onReturn}
        className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold"
        style={{
          borderColor: theme.border,
          color: theme.text,
          backgroundColor: theme.card,
        }}
      >
        <LuArrowLeft size={17} />
        Return to questionnaire
      </button>

      <p
        className="text-xs leading-6"
        style={{ color: theme.text, opacity: 0.55 }}
      >
        Support information and contact availability can change.
        Contact details should be reviewed periodically.
      </p>
    </section>
  );
}

function ResultsSupportNote({ scores, theme }) {
  const shouldSuggestSupport =
    (scores.who5.score !== null && scores.who5.score <= 50) ||
    (scores.phq9.score !== null && scores.phq9.score >= 10) ||
    (scores.gad7.score !== null && scores.gad7.score >= 10);

  if (!shouldSuggestSupport) {
    return null;
  }

  return (
    <section
      className="rounded-2xl border p-5"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="flex items-start gap-3">
        <LuHeart
          size={21}
          className="mt-0.5 shrink-0"
          style={{ color: theme.primary }}
        />

        <div>
          <h2 className="font-semibold" style={{ color: theme.text }}>
            Consider talking to someone
          </h2>

          <p
            className="mt-2 text-sm leading-7"
            style={{ color: theme.text, opacity: 0.75 }}
          >
            Some of your responses suggest that extra support may be
            useful. Speaking with a counsellor or another trusted person
            could help you explore how you have been feeling.
          </p>

          <Link
            to="/crisis"
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold no-underline"
            style={{ color: theme.primary }}
          >
            Explore support contacts
            <LuArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Questionnaire({
  history = [],
  soberStats = {},
}) {
  const { theme } = useTheme();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [safetyScreen, setSafetyScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadingTimeoutRef = useRef(null);

  const scores = useMemo(
    () => calculateWellbeingScores(answers),
    [answers]
  );

  const safetyTriggered = Number(answers.D9) > 0;
  const primaryColor = theme.primary || "#dc2626";

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current !== null) {
        window.clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  const steps = [
    {
      title: "Your wellbeing",
      subtitle:
        "A few questions about how you have felt over the last 7 days.",
    },
    {
      title: "Mood and worry",
      subtitle:
        "How often have you been bothered by the following over the last 7 days?",
    },
    {
      title: "Your own rating",
      subtitle:
        "Now, reflect on your mood and anything you would like to note.",
    },
    {
      title:
        scores.phqFollowUpRequired || scores.gadFollowUpRequired
          ? "A few more questions"
          : "Review your check-in",
      subtitle:
        scores.phqFollowUpRequired || scores.gadFollowUpRequired
          ? "These additional questions appear only when needed."
          : "You have completed the questions needed for this week's check-in.",
    },
  ];

  function handleAnswerChange(id, value) {
    setAnswers((previous) => {
      let updated = {
        ...previous,
        [id]: value,
      };

      if (id === "B1" || id === "B2") {
        const b1 = id === "B1" ? value : previous.B1;
        const b2 = id === "B2" ? value : previous.B2;

        const complete = b1 !== undefined && b2 !== undefined;

        if (!complete || Number(b1) + Number(b2) < 3) {
          updated = clearAnswers(updated, [
            "D3",
            "D4",
            "D5",
            "D6",
            "D7",
            "D8",
            "D9",
          ]);
        }
      }

      if (id === "B3" || id === "B4") {
        const b3 = id === "B3" ? value : previous.B3;
        const b4 = id === "B4" ? value : previous.B4;

        const complete = b3 !== undefined && b4 !== undefined;

        if (!complete || Number(b3) + Number(b4) < 3) {
          updated = clearAnswers(updated, [
            "E3",
            "E4",
            "E5",
            "E6",
            "E7",
          ]);
        }
      }

      return updated;
    });
  }

  function isCurrentStepComplete() {
    if (step === 0) {
      return isSectionComplete(answers, wellbeingQuestions);
    }

    if (step === 1) {
      return isSectionComplete(answers, screeningQuestions);
    }

    if (step === 2) {
      return hasAnswer(answers, "C1");
    }

    const phqComplete =
      !scores.phqFollowUpRequired ||
      isSectionComplete(answers, phqFollowUpQuestions);

    const gadComplete =
      !scores.gadFollowUpRequired ||
      isSectionComplete(answers, gadFollowUpQuestions);

    return phqComplete && gadComplete;
  }

  function handleContinue() {
    if (!isCurrentStepComplete()) {
      return;
    }

    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function handleBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleFinish() {
    if (!isCurrentStepComplete() || isLoading) {
      return;
    }

    // Safety responses bypass the normal loading delay.
    if (safetyTriggered) {
      setSafetyScreen(true);
      return;
    }

    setIsLoading(true);

    loadingTimeoutRef.current = window.setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      loadingTimeoutRef.current = null;
    }, 3000);
  }

  function handleEditAnswers() {
    setSubmitted(false);
    setStep(0);
  }

  function handleReturnFromSafety() {
    setSafetyScreen(false);
    setSubmitted(false);
    setStep(3);
  }

  const graphEntries = useMemo(() => {
    if (!submitted || safetyTriggered) {
      return history;
    }

    const currentEntry = {
      id: "current-check-in",
      date: new Date().toISOString().slice(0, 10),
      mood: scores.mood,
      who5: scores.who5.score,
    };

    return [...history, currentEntry];
  }, [history, submitted, safetyTriggered, scores]);

  const moodDifference =
    scores.mood !== null && scores.who5.score !== null
      ? Math.abs(scores.mood - scores.who5.score)
      : null;

  // Standalone safety support screen. No MemberShell or sidebar.
  if (safetyScreen) {
    return (
      <div className="member-access min-h-screen px-4 py-6 sm:px-6 lg:px-10">
        <SafetySupportScreen
          onReturn={handleReturnFromSafety}
          theme={theme}
        />
      </div>
    );
  }

  // Standalone loading screen. Uses the existing Spinner component.
  if (isLoading) {
    return (
      <main
        className="member-access flex min-h-screen flex-col items-center justify-center px-5 py-12"
        style={{ backgroundColor: theme.bg }}
      >
        <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
          <Spinner
            label="Loading..."
            size="lg"
            className="py-5"
          />

          <h1
            className="mt-5 text-xl font-semibold"
            style={{ color: theme.text }}
          >
            Preparing your results
          </h1>

          <p
            className="mt-2 text-sm leading-6"
            style={{ color: theme.text, opacity: 0.65 }}
          >
            Gathering your wellbeing scores and updating your
            check-in overview.
          </p>
        </div>
      </main>
    );
  }

  // Standalone results screen. No MemberShell or sidebar.
  if (submitted) {
    return (
      <main
        className="member-access min-h-screen px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-10"
        style={{ backgroundColor: theme.bg }}
      >
        <div className="mx-auto w-full max-w-5xl space-y-7">
          <section>
            <p
              className="text-xs font-bold uppercase tracking-[0.15em]"
              style={{ color: primaryColor }}
            >
              Weekly wellbeing check-in
            </p>

            <h1
              className="mt-2 text-3xl font-semibold sm:text-4xl"
              style={{ color: theme.text }}
            >
              Your check-in results
            </h1>

            <p
              className="mt-3 max-w-2xl text-sm leading-7"
              style={{ color: theme.text, opacity: 0.7 }}
            >
              Thank you for taking time to reflect on your week.
              These results are here to help you notice patterns
              and understand how you have been feeling.
            </p>
          </section>

          <SoberRate
            answers={answers}
            soberStats={soberStats}
          />

          <MoodGraph entries={graphEntries} />

          {moodDifference !== null && moodDifference >= 30 && (
            <section
              className="rounded-2xl border p-5"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
              }}
            >
              <div className="flex items-start gap-3">
                <LuInfo
                  size={20}
                  className="mt-0.5 shrink-0"
                  style={{ color: primaryColor }}
                />

                <div>
                  <h2
                    className="font-semibold"
                    style={{ color: theme.text }}
                  >
                    A moment to reflect
                  </h2>

                  <p
                    className="mt-2 text-sm leading-7"
                    style={{ color: theme.text, opacity: 0.75 }}
                  >
                    Your mood rating and your questionnaire answers
                    look different this week. Neither one is wrong.
                    You may find it helpful to write a little more
                    about your experience in your diary.
                  </p>
                </div>
              </div>
            </section>
          )}

          <ResultsSupportNote scores={scores} theme={theme} />

          <p
            className="text-xs leading-6"
            style={{ color: theme.text, opacity: 0.55 }}
          >
            These screening scores are not a diagnosis. Because this
            check-in uses a 7-day look-back, published screening
            cutoffs should be treated as approximate. Trends are
            more useful when viewed across several weekly check-ins
            rather than from one result alone.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleEditAnswers}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              <LuArrowLeft size={17} />
              Review answers
            </button>

            <Link
              to="/check-in"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold no-underline transition-opacity hover:opacity-85"
              style={{
                backgroundColor: primaryColor,
                color: "#ffffff",
              }}
            >
              Back to check-in
              <LuArrowRight size={17} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Main questionnaire. Standalone for both public and member access.
  return (
    <main
      className="member-access min-h-screen px-4 py-7 sm:px-6 sm:py-9 lg:px-10 lg:py-10"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              className="text-xs font-bold uppercase tracking-[0.15em]"
              style={{ color: primaryColor }}
            >
              Weekly wellbeing check-in
            </p>

            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{
                borderColor: theme.border,
                color: theme.text,
                backgroundColor: theme.card,
              }}
            >
              <LuClock size={14} />
              About 2 minutes
            </span>
          </div>

          <h1
            className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl"
            style={{ color: theme.text }}
          >
            Check in with yourself.
          </h1>

          <p
            className="mt-3 max-w-2xl text-sm leading-7"
            style={{ color: theme.text, opacity: 0.7 }}
          >
            There are no right or wrong answers. Just answer as honestly
            as you can based on your experience over the last 7 days.
          </p>
        </header>

        <section
          className="mb-6 rounded-2xl border p-4 sm:p-5"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
          }}
          aria-label="Questionnaire progress"
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className="text-sm font-semibold"
              style={{ color: theme.text }}
            >
              Step {step + 1} of {steps.length}
            </span>

            <span
              className="text-xs font-medium"
              style={{ color: theme.text, opacity: 0.65 }}
            >
              {Math.round(((step + 1) / steps.length) * 100)}% complete
            </span>
          </div>

          <div
            className="mt-3 h-2 overflow-hidden rounded-full"
            style={{ backgroundColor: theme.border }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-300"
              style={{
                width: `${((step + 1) / steps.length) * 100}%`,
                backgroundColor: primaryColor,
              }}
            />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {steps.map((item, index) => {
              const active = index === step;
              const complete = index < step;

              return (
                <div key={item.title} className="min-w-0">
                  <div
                    className="mb-2 h-1 rounded-full"
                    style={{
                      backgroundColor: complete || active
                        ? primaryColor
                        : theme.border,
                    }}
                  />

                  <span
                    className="block truncate text-[10px] font-semibold sm:text-xs"
                    style={{
                      color: theme.text,
                      opacity: active || complete ? 1 : 0.5,
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {safetyTriggered && (
          <section
            role="alert"
            className="mb-6 rounded-2xl border p-4 sm:p-5"
            style={{
              backgroundColor: "rgba(220, 38, 38, 0.07)",
              borderColor: "#dc7777",
            }}
          >
            <div className="flex items-start gap-3">
              <LuShieldAlert
                size={22}
                className="mt-0.5 shrink-0"
                style={{ color: "#b91c1c" }}
              />

              <div>
                <h2
                  className="font-semibold"
                  style={{ color: theme.text }}
                >
                  Support is available right now
                </h2>

                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: theme.text, opacity: 0.8 }}
                >
                  Thank you for being honest. You do not have to carry
                  this alone. You can pause the questionnaire and reach
                  out to someone who can support you.
                </p>

                <button
                  type="button"
                  onClick={() => setSafetyScreen(true)}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold"
                  style={{
                    backgroundColor: "#b91c1c",
                    color: "#ffffff",
                  }}
                >
                  View support options
                  <LuArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        )}

        <section
          className="rounded-3xl border p-4 sm:p-7"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
          }}
        >
          <SectionHeading
            eyebrow={`Part ${["A", "B", "C", "D"][step]}`}
            title={steps[step].title}
            description={steps[step].subtitle}
            theme={theme}
          />

          {step === 0 && (
            <div className="space-y-4">
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: theme.text, opacity: 0.55 }}
              >
                Over the last 7 days
              </p>

              {wellbeingQuestions.map((question) => (
                <ChoiceQuestion
                  key={question.id}
                  id={question.id}
                  question={question.question}
                  options={wellbeingOptions}
                  answer={answers[question.id]}
                  onChange={handleAnswerChange}
                  theme={theme}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div
                className="rounded-xl p-3 text-sm leading-6"
                style={{
                  backgroundColor:
                    theme.bgSoft || "rgba(128,128,128,0.08)",
                  color: theme.text,
                }}
              >
                These four questions form two short screening scales.
                Additional questions will appear only when needed.
              </div>

              {screeningQuestions.map((question) => (
                <ChoiceQuestion
                  key={question.id}
                  id={question.id}
                  question={question.question}
                  options={frequencyOptions}
                  answer={answers[question.id]}
                  onChange={handleAnswerChange}
                  theme={theme}
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <fieldset>
                <legend
                  className="text-sm font-semibold"
                  style={{ color: theme.text }}
                >
                  C1. How would you rate your mood this week?
                </legend>

                <p
                  className="mt-1 text-sm"
                  style={{ color: theme.text, opacity: 0.65 }}
                >
                  Choose a number from 0 to 10.
                </p>

                <div className="mt-5 grid grid-cols-6 gap-2 sm:grid-cols-11">
                  {Array.from({ length: 11 }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleAnswerChange("C1", index)}
                      aria-pressed={answers.C1 === index}
                      className="flex min-h-11 items-center justify-center rounded-xl border text-sm font-bold transition-colors"
                      style={{
                        backgroundColor: answers.C1 === index
                          ? primaryColor
                          : theme.card,
                        borderColor: answers.C1 === index
                          ? primaryColor
                          : theme.border,
                        color: answers.C1 === index
                          ? "#ffffff"
                          : theme.text,
                      }}
                    >
                      {index}
                    </button>
                  ))}
                </div>

                <div
                  className="mt-2 flex justify-between text-xs"
                  style={{ color: theme.text, opacity: 0.65 }}
                >
                  <span>0 · Very low</span>
                  <span>10 · Very good</span>
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="weekly-reflection"
                  className="text-sm font-semibold"
                  style={{ color: theme.text }}
                >
                  C2. Is there anything you want to note about this week?
                </label>

                <p
                  className="mt-1 text-sm leading-6"
                  style={{ color: theme.text, opacity: 0.65 }}
                >
                  This is optional. Use this space to reflect in your own
                  words.
                </p>

                <textarea
                  id="weekly-reflection"
                  rows={5}
                  maxLength={2000}
                  value={answers.C2 || ""}
                  onChange={(event) =>
                    handleAnswerChange("C2", event.target.value)
                  }
                  placeholder="Write anything you would like to remember about this week..."
                  className="mt-3 w-full resize-y rounded-2xl border p-4 text-sm leading-6 outline-none transition-colors focus:ring-2"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />

                <div
                  className="mt-2 flex items-start gap-2 text-xs leading-5"
                  style={{ color: theme.text, opacity: 0.6 }}
                >
                  <LuLockKeyhole size={15} className="mt-0.5 shrink-0" />

                  <span>
                    Prototype privacy notice: this note is not currently
                    encrypted or saved. It stays in this page's temporary
                    browser state and will be lost when you leave or reload.
                    Secure diary storage will be connected separately.
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {scores.phqFollowUpRequired && (
                <div className="space-y-4">
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: theme.text }}
                    >
                      Additional mood questions
                    </h3>

                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: theme.text, opacity: 0.65 }}
                    >
                      These follow-up questions are shown because your
                      PHQ-2 answers reached the follow-up threshold.
                    </p>
                  </div>

                  {phqFollowUpQuestions.map((question) => (
                    <ChoiceQuestion
                      key={question.id}
                      id={question.id}
                      question={question.question}
                      options={frequencyOptions}
                      answer={answers[question.id]}
                      onChange={handleAnswerChange}
                      theme={theme}
                      safetyQuestion={question.safetyQuestion}
                    />
                  ))}
                </div>
              )}

              {scores.gadFollowUpRequired && (
                <div className="space-y-4">
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: theme.text }}
                    >
                      Additional worry and anxiety questions
                    </h3>

                    <p
                      className="mt-1 text-sm leading-6"
                      style={{ color: theme.text, opacity: 0.65 }}
                    >
                      These follow-up questions are shown because your
                      GAD-2 answers reached the follow-up threshold.
                    </p>
                  </div>

                  {gadFollowUpQuestions.map((question) => (
                    <ChoiceQuestion
                      key={question.id}
                      id={question.id}
                      question={question.question}
                      options={frequencyOptions}
                      answer={answers[question.id]}
                      onChange={handleAnswerChange}
                      theme={theme}
                    />
                  ))}
                </div>
              )}

              {!scores.phqFollowUpRequired &&
                !scores.gadFollowUpRequired && (
                  <div
                    className="rounded-2xl border p-5"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    }}
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: "rgba(15, 118, 110, 0.1)",
                        color: "#0f766e",
                      }}
                    >
                      <LuCircleCheck size={23} />
                    </div>

                    <h3
                      className="mt-4 font-semibold"
                      style={{ color: theme.text }}
                    >
                      No additional questions are needed.
                    </h3>

                    <p
                      className="mt-2 text-sm leading-7"
                      style={{ color: theme.text, opacity: 0.7 }}
                    >
                      Your short screening answers did not reach either
                      follow-up threshold. You can now review and finish
                      your weekly check-in.
                    </p>
                  </div>
                )}

              <div
                className="rounded-2xl p-4"
                style={{
                  backgroundColor:
                    theme.bgSoft || "rgba(128,128,128,0.08)",
                  color: theme.text,
                }}
              >
                <div className="flex items-center gap-2">
                  <LuInfo size={17} />
                  <h3 className="text-sm font-semibold">
                    Before you finish
                  </h3>
                </div>

                <p className="mt-2 text-sm leading-6">
                  Your answers are used to calculate your wellbeing
                  indicators. These scores are screening and tracking
                  tools, not medical diagnoses.
                </p>
              </div>
            </div>
          )}

          <div
            className="mt-7 flex flex-col-reverse justify-between gap-3 border-t pt-5 sm:flex-row sm:items-center"
            style={{ borderColor: theme.border }}
          >
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                borderColor: theme.border,
                color: theme.text,
                backgroundColor: theme.card,
              }}
            >
              <LuArrowLeft size={17} />
              Previous
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={handleContinue}
                disabled={!isCurrentStepComplete()}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor: primaryColor,
                  color: "#ffffff",
                }}
              >
                Continue
                <LuArrowRight size={17} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={!isCurrentStepComplete()}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor: safetyTriggered
                    ? "#b91c1c"
                    : primaryColor,
                  color: "#ffffff",
                }}
              >
                {safetyTriggered
                  ? "Continue to support"
                  : "Complete check-in"}
                <LuCircleCheck size={17} />
              </button>
            )}
          </div>
        </section>

        <footer className="mt-5 flex flex-wrap items-start gap-2">
          <LuInfo
            size={15}
            className="mt-0.5 shrink-0"
            style={{ color: theme.text, opacity: 0.55 }}
          />

          <p
            className="max-w-3xl text-xs leading-6"
            style={{ color: theme.text, opacity: 0.55 }}
          >
            This weekly check-in adapts the questionnaires' usual
            two-week recall period to the last 7 days. The published
            cutoffs are therefore guides, not diagnoses. Your answers
            are not being sent to a server or saved by this prototype.
          </p>
        </footer>
      </div>
    </main>
  );
}

export default Questionnaire;
