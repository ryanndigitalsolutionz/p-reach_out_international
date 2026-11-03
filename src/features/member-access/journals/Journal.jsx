
import { useState } from "react";
import {
  LuBookOpen,
  LuNotebook,
  LuLibrary,
} from "react-icons/lu";

import { useTheme } from "../../../contexts/ThemeContext.jsx";
import { MemberShell } from "../Dashboard.jsx";

import Diary from "./Diary.jsx";
import Readables from "./Readables.jsx";

const journalTabs = [
  {
    id: "diary",
    label: "My Diary",
    icon: LuNotebook,
  },
  {
    id: "readables",
    label: "My Readables",
    icon: LuLibrary,
  },
];

function Journal() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("diary");

  return (
    <MemberShell>
      <main
        className="member-access min-h-screen px-4 py-8 sm:px-6 sm:py-10 lg:px-10"
        style={{
          backgroundColor: theme.bg,
          color: theme.text,
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          {/* Workspace introduction */}
          <header className="mb-8">
            <p
              className="text-xs font-bold uppercase tracking-[0.17em]"
              style={{ color: theme.primary }}
            >
              Your personal space
            </p>

            <h1
              className="mt-3 text-3xl font-semibold sm:text-4xl"
              style={{ color: theme.text }}
            >
              Journal & Readables
            </h1>

            <p
              className="mt-3 max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: theme.textMid || theme.text }}
            >
              A place for personal reflection and the digital
              resources you've collected along the way.
            </p>
          </header>

          {/* Workspace switch */}
          <div
            className="mb-7 inline-flex w-full max-w-md gap-1 rounded-2xl border p-1.5"
            style={{
              backgroundColor: theme.bgSoft,
              borderColor: theme.border,
            }}
            role="tablist"
            aria-label="Journal sections"
          >
            {journalTabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`journal-tab-${tab.id}`}
                  aria-selected={active}
                  aria-controls={`journal-panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition-colors duration-200"
                  style={{
                    backgroundColor: active
                      ? theme.card
                      : "transparent",
                    color: active
                      ? theme.primary
                      : theme.textMid || theme.text,
                    boxShadow: active
                      ? "0 2px 8px rgba(0,0,0,0.06)"
                      : "none",
                  }}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Diary panel stays mounted between tab switches */}
          <section
            id="journal-panel-diary"
            role="tabpanel"
            aria-labelledby="journal-tab-diary"
            hidden={activeTab !== "diary"}
            className="min-w-0"
          >
            <Diary active={activeTab === "diary"} />
          </section>

          {/* Readables panel */}
          <section
            id="journal-panel-readables"
            role="tabpanel"
            aria-labelledby="journal-tab-readables"
            hidden={activeTab !== "readables"}
            className="min-w-0"
          >
            <Readables />
          </section>
        </div>
      </main>
    </MemberShell>
  );
}

export default Journal;
