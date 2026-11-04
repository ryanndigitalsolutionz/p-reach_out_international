
import {
  LuSettings2,
  LuBell,
  LuPalette,
  LuUsers,
  LuGlobe,
  LuAccessibility,
  LuClock,
  LuArrowRight,
} from "react-icons/lu";

import { useTheme } from "../../../contexts/ThemeContext.jsx";
import { MemberShell } from "../Dashboard.jsx";

const plannedSettings = [
  {
    title: "Notifications",
    description:
      "Manage updates about community activities, group announcements, and platform notifications.",
    icon: LuBell,
  },
  {
    title: "Display & Appearance",
    description:
      "Additional display preferences, reading comfort, and interface customisation.",
    icon: LuPalette,
  },
  {
    title: "Community Preferences",
    description:
      "Manage how you discover, participate in, and interact with community spaces.",
    icon: LuUsers,
  },
  {
    title: "Language & Region",
    description:
      "Choose your preferred language, regional format, and other localisation options.",
    icon: LuGlobe,
  },
  {
    title: "Accessibility",
    description:
      "Future controls for text readability, motion preferences, and accessible navigation.",
    icon: LuAccessibility,
  },
];

function GeneralSettingCard({ item, theme }) {
  const Icon = item.icon;

  return (
    <article
      className="flex h-full flex-col rounded-2xl border p-5 sm:p-6"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: theme.bgSoft,
            color: theme.primary,
          }}
        >
          <Icon size={21} />
        </div>

        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
          style={{
            backgroundColor: theme.bgSoft,
            color: theme.textMid,
          }}
        >
          <LuClock size={12} />
          Coming Soon
        </span>
      </div>

      <h3
        className="mt-5 text-base font-bold"
        style={{ color: theme.text }}
      >
        {item.title}
      </h3>

      <p
        className="mt-2 flex-1 text-sm leading-7"
        style={{ color: theme.textMid }}
      >
        {item.description}
      </p>

      <div
        className="mt-5 flex items-center gap-2 border-t pt-4 text-xs font-semibold"
        style={{
          borderColor: theme.border,
          color: theme.textMid,
        }}
      >
        <span>Preference controls will appear here</span>
        <LuArrowRight size={15} />
      </div>
    </article>
  );
}

function General() {
  const { theme } = useTheme();

  return (
    <MemberShell>
      <main className="mx-auto w-full max-w-[1100px] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
        {/* Page heading */}
        <header className="mb-8">
          <p
            className="text-xs font-bold uppercase tracking-[0.17em]"
            style={{ color: theme.primary }}
          >
            Member Settings
          </p>

          <h1
            className="mt-2 text-3xl font-semibold sm:text-4xl"
            style={{ color: theme.text }}
          >
            General Settings
          </h1>

          <p
            className="mt-3 max-w-2xl text-sm leading-7"
            style={{ color: theme.textMid }}
          >
            Personalise your P-REACH OUT experience.
            Additional preferences will be introduced as
            the platform and its features grow.
          </p>
        </header>

        {/* Current appearance information */}
        <section
          className="mb-7 flex flex-col gap-4 rounded-3xl border p-5 sm:flex-row sm:items-center sm:p-7"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
          }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: theme.bgSoft,
              color: theme.primary,
            }}
          >
            <LuSettings2 size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold">
              Your preferences, your experience.
            </h2>

            <p
              className="mt-1 text-sm leading-6"
              style={{ color: theme.textMid }}
            >
              Your appearance theme can already be changed
              using the theme selector in the member sidebar.
              More general preferences are being prepared.
            </p>
          </div>
        </section>

        {/* Planned preference categories */}
        <div className="mb-5">
          <p
            className="text-xs font-bold uppercase tracking-[0.15em]"
            style={{ color: theme.primary }}
          >
            Your preferences
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            More ways to customise your space
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {plannedSettings.map((item) => (
            <GeneralSettingCard
              key={item.title}
              item={item}
              theme={theme}
            />
          ))}
        </div>

        {/* Closing notice */}
        <div
          className="mt-7 flex items-start gap-3 rounded-2xl border p-4"
          style={{
            backgroundColor: theme.bgSoft,
            borderColor: theme.border,
          }}
        >
          <LuSettings2
            size={19}
            className="mt-0.5 shrink-0"
            style={{ color: theme.primary }}
          />

          <p
            className="text-xs leading-6"
            style={{ color: theme.textMid }}
          >
            General Settings will grow alongside new P-REACH
            OUT features. Account security, profile information,
            and payment preferences have their own dedicated
            settings pages.
          </p>
        </div>
      </main>
    </MemberShell>
  );
}

export default General;
