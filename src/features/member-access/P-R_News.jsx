
import { Link } from "react-router-dom";
import { LuArrowLeft, LuNewspaper, LuRadio } from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import { MemberShell } from "./Dashboard.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

function PRNews() {
  const { theme } = useTheme();

  return (
    <MemberShell>
      <main
        className="member-access min-h-screen px-5 py-10 sm:px-8 lg:px-10"
        style={{ backgroundColor: theme.bg, color: theme.text }}
      >
        <div className="mx-auto flex min-h-[75vh] max-w-5xl flex-col items-center justify-center text-center">
          <Link
            to="/dashboard"
            className="mb-12 inline-flex items-center gap-2 self-start text-sm font-semibold no-underline transition-opacity hover:opacity-70"
            style={{ color: theme.textMid || theme.text }}
          >
            <LuArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div
            className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border"
            style={{
              backgroundColor: theme.bgSoft,
              borderColor: theme.border,
              color: theme.primary,
            }}
          >
            <LuNewspaper size={30} />
          </div>

          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: theme.primary }}
          >
            Stay informed
          </p>

          <h1
            className="mt-3 text-4xl font-semibold sm:text-5xl"
            style={{ color: theme.text }}
          >
            P-R News.
          </h1>

          <p
            className="mt-5 max-w-xl text-sm leading-7 sm:text-base"
            style={{ color: theme.textMid || theme.text }}
          >
            Updates, announcements, organisational activities,
            programmes and important news from P-REACH OUT International.
          </p>

          <div
            className="mt-10 flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border px-6 py-10"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <LuRadio size={25} style={{ color: theme.primary }} />

            <Spinner
              size="lg"
              label="Preparing P-R News..."
              showLabel={false}
            />

            <div>
              <h2
                className="text-xl font-semibold"
                style={{ color: theme.text }}
              >
                Coming Soon
              </h2>

              <p
                className="mt-2 text-sm"
                style={{ color: theme.textMid || theme.text }}
              >
                We're preparing the latest updates for you.
              </p>
            </div>
          </div>
        </div>
      </main>
    </MemberShell>
  );
}

export default PRNews;
