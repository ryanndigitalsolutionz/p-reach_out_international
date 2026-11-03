import { useEffect, useState } from "react";
import {
  LuShieldAlert,
  LuSiren,
  LuPhone,
  LuMessageCircle,
  LuLifeBuoy,
  LuPill,
  LuHeartHandshake,
  LuBaby,
  LuWind,
  LuInfo,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import { MemberShell } from "../../features/member-access/Dashboard.jsx";

const emergencyLines = [
  {
    id: "police-emergency",
    name: "Police / Ambulance Emergency",
    description:
      "National emergency contact for urgent police and emergency assistance.",
    numbers: ["112"],
  },
  {
    id: "red-cross",
    name: "Kenya Red Cross Emergency",
    description:
      "Emergency and humanitarian support through the Kenya Red Cross Society.",
    numbers: ["1199"],
  },
];

const categoryStyles = {
  teal: {
    background: "#D8E8E4",
    foreground: "#0D6E64",
  },
  blue: {
    background: "#DFEFF7",
    foreground: "#1C7FA8",
  },
  rose: {
    background: "#FCE7EF",
    foreground: "#C2417A",
  },
  violet: {
    background: "#EEE9FA",
    foreground: "#7C5CBF",
  },
};

const crisisCategories = [
  {
    id: "mental-health",
    navLabel: "Suicide & mental health",
    title: "Suicide & Mental Health Crisis",
    icon: LuLifeBuoy,
    color: "teal",
    hotlines: [
      {
        name: "Befrienders Kenya",
        description:
          "Free, confidential emotional support for people experiencing distress or having thoughts of suicide.",
        numbers: ["0722 178 177"],
        whatsapp: "254722178177",
        hours: "Monday–Friday, 9 AM–5 PM",
      },
      {
        name: "Emergency Medicine Kenya Foundation (EMKF)",
        description:
          "Suicide prevention and crisis support helpline.",
        numbers: ["0800 723 253"],
      },
      {
        name: "Niskize Counselling Helpline",
        description:
          "Telephone counselling for people experiencing distress and other difficult situations.",
        numbers: ["0900 620 800"],
        hours: "24-hour telephone counselling",
      },
    ],
  },
  {
    id: "substance-use",
    navLabel: "Substance use",
    title: "Alcohol & Drug Abuse",
    icon: LuPill,
    color: "blue",
    hotlines: [
      {
        name: "NACADA National Helpline",
        description:
          "Free, confidential counselling and referrals for alcohol and drug use, provided by the National Authority for the Campaign Against Alcohol and Drug Abuse.",
        numbers: ["1192"],
        hours: "Available 24 hours, every day",
      },
    ],
  },
  {
    id: "gender-based-violence",
    navLabel: "Gender-based violence",
    title: "Gender-Based Violence",
    icon: LuHeartHandshake,
    color: "rose",
    hotlines: [
      {
        name: "National GBV Hotline",
        description:
          "Toll-free national hotline providing counselling and coordinated referrals for survivors of gender-based violence.",
        numbers: ["1195"],
        hours: "Available 24 hours, every day",
      },
      {
        name: "Gender Violence Recovery Centre (GVRC)",
        description:
          "Medical treatment and psychosocial support for survivors through the Gender Violence Recovery Centre at Nairobi Women's Hospital.",
        numbers: ["0719 638 006", "0709 667 000"],
      },
    ],
  },
  {
    id: "child-protection",
    navLabel: "Child protection",
    title: "Child Protection",
    icon: LuBaby,
    color: "violet",
    hotlines: [
      {
        name: "Childline Kenya",
        description:
          "Free national helpline for children experiencing abuse, neglect, exploitation, or distress. Adults can also report concerns on a child's behalf.",
        numbers: ["116"],
        whatsapp: "254722116116",
        hours: "Available 24 hours, every day",
      },
    ],
  },
];

function phoneHref(number) {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}

function whatsappHref(number) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}

function EmergencyContact({ line, theme }) {
  return (
    <article
      className="flex flex-col justify-between gap-5 rounded-2xl p-5 sm:flex-row sm:items-center"
      style={{ backgroundColor: theme.card }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <LuSiren
            size={19}
            className="shrink-0"
            style={{ color: "#993C1D" }}
          />

          <h3
            className="text-sm font-extrabold"
            style={{ color: theme.text }}
          >
            {line.name}
          </h3>
        </div>

        <p
          className="mt-2 text-sm leading-6"
          style={{ color: theme.textMid }}
        >
          {line.description}
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        {line.numbers.map((number) => (
          <a
            key={number}
            href={phoneHref(number)}
            className="inline-flex min-h-11 min-w-[112px] items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-extrabold text-white no-underline transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#993C1D" }}
          >
            <LuPhone size={17} />
            {number}
          </a>
        ))}
      </div>
    </article>
  );
}

function HotlineRow({ line, color, theme }) {
  const styles = categoryStyles[color];

  return (
    <div
      className="flex flex-col justify-between gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
    >
      <div className="min-w-0 flex-1">
        <h3
          className="text-sm font-extrabold"
          style={{ color: theme.text }}
        >
          {line.name}
        </h3>

        <p
          className="mt-1 text-sm leading-6"
          style={{ color: theme.textMid }}
        >
          {line.description}
        </p>

        {line.hours && (
          <p
            className="mt-2 text-xs font-semibold"
            style={{ color: theme.textMid }}
          >
            {line.hours}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        {line.numbers.map((number) => (
          <a
            key={number}
            href={phoneHref(number)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-bold text-white no-underline transition-opacity hover:opacity-85"
            style={{ backgroundColor: styles.foreground }}
          >
            <LuPhone size={16} />
            {number}
          </a>
        ))}

        {line.whatsapp && (
          <a
            href={whatsappHref(line.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-sm font-bold text-emerald-800 no-underline transition-colors hover:bg-emerald-100"
          >
            <LuMessageCircle size={16} />
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

function BreathingExercise({ theme }) {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(0);

  const phases = [
    { label: "Breathe in…", instruction: "Slowly breathe in" },
    { label: "Hold…", instruction: "Gently hold your breath" },
    { label: "Breathe out…", instruction: "Slowly breathe out" },
  ];

  useEffect(() => {
    if (!running) {
      setPhase(0);
      return undefined;
    }

    setPhase(0);

    const interval = window.setInterval(() => {
      setPhase((current) => (current + 1) % phases.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [running]);

  const circleScale =
    !running ? 0.76 : phase === 2 ? 0.68 : 1;

  return (
    <section
      className="flex flex-col items-center gap-5 rounded-3xl border p-6 text-center sm:p-8"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div
        className="flex items-center gap-2 text-sm font-extrabold"
        style={{ color: theme.text }}
      >
        <LuWind
          size={19}
          style={{ color: theme.primary }}
        />
        A Moment to Breathe
      </div>

      <div
        className="relative flex h-40 w-40 items-center justify-center rounded-full"
        style={{ backgroundColor: theme.bgSoft }}
      >
        <div
          className="absolute inset-2 rounded-full"
          style={{
            backgroundColor: theme.primary,
            opacity: 0.16,
            transform: `scale(${circleScale})`,
            transition: "transform 4000ms ease-in-out",
          }}
        />

        <div
          className="absolute inset-6 rounded-full"
          style={{
            backgroundColor: theme.primary,
            opacity: 0.12,
          }}
        />

        <span
          aria-live="polite"
          className="relative px-2 text-sm font-extrabold"
          style={{ color: theme.primary }}
        >
          {running ? phases[phase].label : "Ready"}
        </span>
      </div>

      <div className="max-w-sm">
        <p
          className="text-sm font-semibold"
          style={{ color: theme.text }}
        >
          {running
            ? phases[phase].instruction
            : "Take a moment for yourself."}
        </p>

        <p
          className="mt-2 text-xs leading-6"
          style={{ color: theme.textMid }}
        >
          Four seconds breathing in, four seconds holding,
          and four seconds breathing out. Repeat for as long
          as it feels comfortable.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setRunning((current) => !current)}
        className="inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85"
        style={{ backgroundColor: theme.primary }}
      >
        {running ? "Stop exercise" : "Start breathing exercise"}
      </button>

      <p
        className="max-w-sm text-xs leading-5"
        style={{ color: theme.textMid }}
      >
        Stop whenever you need to. Return to your natural
        breathing if the exercise feels uncomfortable.
      </p>
    </section>
  );
}

function CrisisCategory({ category, theme }) {
  const Icon = category.icon;
  const styles = categoryStyles[category.color];

  return (
    <section
      id={category.id}
      className="scroll-mt-6 rounded-3xl border p-5 shadow-sm sm:p-7"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: styles.background }}
        >
          <Icon
            size={23}
            style={{ color: styles.foreground }}
          />
        </div>

        <h2
          className="text-lg font-extrabold sm:text-xl"
          style={{ color: theme.text }}
        >
          {category.title}
        </h2>
      </div>

      <div
        className="divide-y"
        style={{ borderColor: theme.border }}
      >
        {category.hotlines.map((line) => (
          <HotlineRow
            key={line.name}
            line={line}
            color={category.color}
            theme={theme}
          />
        ))}
      </div>
    </section>
  );
}

export default function CrisisPage() {
  const { theme } = useTheme();

  const navigationItems = [
    { id: "emergency", label: "Emergency" },
    ...crisisCategories.map((category) => ({
      id: category.id,
      label: category.navLabel,
    })),
  ];

  return (
    <MemberShell>
      <main className="mx-auto w-full max-w-[1120px] space-y-7 px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
        {/* Page introduction */}
        <header>
          <p
            className="text-xs font-bold uppercase tracking-[0.16em]"
            style={{ color: theme.primary }}
          >
            Help is available
          </p>

          <h1
            className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl"
            style={{
              color: theme.text,
              fontFamily: '"Anonymous Pro", monospace',
            }}
          >
            Crisis Support
          </h1>

          <p
            className="mt-3 max-w-2xl text-sm leading-7 sm:text-base"
            style={{ color: theme.textMid }}
          >
            You don't have to face this alone. Find emergency
            contacts and confidential support services below.
          </p>
        </header>

        {/* Category navigation */}
        <nav
          aria-label="Crisis support categories"
          className="flex flex-wrap gap-2"
        >
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="inline-flex min-h-10 items-center rounded-full border px-4 py-2 text-xs font-bold no-underline transition-colors hover:opacity-75 sm:text-sm"
              style={{
                color: theme.text,
                backgroundColor: theme.card,
                borderColor: theme.border,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Immediate emergency contacts */}
        <section
          id="emergency"
          className="scroll-mt-6 rounded-3xl border p-5 sm:p-7"
          style={{
            backgroundColor: "#FAECE7",
            borderColor: "#F0997B",
          }}
        >
          <div className="mb-5 flex items-center gap-2">
            <LuShieldAlert
              size={22}
              style={{ color: "#993C1D" }}
            />

            <h2 className="text-base font-extrabold text-[#4A1B0C] sm:text-lg">
              If you or someone else is in immediate danger
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {emergencyLines.map((line) => (
              <EmergencyContact
                key={line.id}
                line={line}
                theme={theme}
              />
            ))}
          </div>

          <p className="mt-5 text-xs leading-6 text-[#71351F]">
            For urgent police or ambulance assistance, call 112.
            The Kenya Red Cross line is also available for
            emergency and humanitarian support.
          </p>
        </section>

        {/* Encouragement */}
        <div
          className="rounded-2xl p-5 text-sm leading-7 sm:p-6"
          style={{
            backgroundColor: theme.bgSoft,
            color: theme.text,
          }}
        >
          If you're having thoughts of suicide or experiencing
          overwhelming distress, please reach out to someone
          you trust or contact one of the support services below.
          Asking for help is a sign of strength, not failure.
        </div>

        {/* Guided breathing */}
        <BreathingExercise theme={theme} />

        {/* Crisis categories */}
        <div className="space-y-5">
          {crisisCategories.map((category) => (
            <CrisisCategory
              key={category.id}
              category={category}
              theme={theme}
            />
          ))}
        </div>

        {/* Closing support message */}
        <section
          className="rounded-3xl border p-6 text-center sm:p-8"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
          }}
        >
          <LuInfo
            size={22}
            className="mx-auto"
            style={{ color: theme.primary }}
          />

          <p
            className="mx-auto mt-4 max-w-3xl text-sm leading-7"
            style={{ color: theme.textMid }}
          >
            Hotlines aren't the only option. If there's a friend,
            family member, sponsor, or counsellor you trust,
            reaching out to them matters too. You don't have
            to carry this by yourself.
          </p>
        </section>
      </main>
    </MemberShell>
  );
}
