import { Link } from "react-router-dom";
import {
  LuBookOpen,
  LuArrowUpRight,
  LuClipboardCheck,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import Header from "../../components/navigation/Header.jsx";

export default function LibraryPage({ embedded = false }) {
  const { theme } = useTheme();

  return (
    <div
      id={embedded ? "library" : undefined}
      className="min-h-screen scroll-mt-20 overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {!embedded && <Header />}

      <main>
        {/* Library Introduction */}
        <section className="flex min-h-[65vh] items-center px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mx-auto max-w-3xl text-center">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.13em]"
                style={{
                  color: theme.primary,
                  backgroundColor: theme.bgSoft,
                  borderColor: theme.border,
                }}
              >
                <LuBookOpen size={15} />
                Mental Health Library
              </span>

              <h1
                className="mt-7 text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.15]"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Understand Mental Health.
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  Find Information That Helps.
                </span>
              </h1>

              <p
                className="mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                Explore articles, symptom guides, and treatment
                information covering a range of mental health
                conditions. Our library is designed to help people
                learn, recognize challenges, and understand possible
                next steps without stigma.
              </p>

              <p
                className="mt-5 text-sm font-semibold sm:text-base"
                style={{ color: theme.text }}
              >
                Access the library now. There is no charge for access.
              </p>

              <div className="mt-9 flex justify-center">
                <Link
                  to="/library/list"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white no-underline"
                  style={{ backgroundColor: theme.primary }}
                >
                  <LuBookOpen size={18} />
                  Visit The Library
                  <LuArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mental Health Assessment */}
        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div
            className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2rem] border p-7 sm:p-10 lg:flex-row lg:items-center lg:px-12"
            style={{
              backgroundColor: theme.bgSoft,
              borderColor: theme.border,
              color: theme.text,
            }}
          >
            <div className="max-w-2xl">
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                <LuClipboardCheck size={16} />
                Need a Starting Point?
              </span>

              <h2
                className="mt-4 text-2xl leading-tight sm:text-3xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Not Sure Where to Start?
              </h2>

              <p
                className="mt-4 text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                Take our mental health assessment to reflect on
                your well-being and explore possible next steps.
                It is a starting point for understanding yourself,
                not a medical diagnosis.
              </p>
            </div>

            <Link
              to="/assessment"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white no-underline"
              style={{ backgroundColor: theme.primary }}
            >
              Take Assessment
              <LuArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
