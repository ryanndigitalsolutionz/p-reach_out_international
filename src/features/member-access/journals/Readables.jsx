
import {
  LuBookOpen,
  LuLibrary,
  LuShoppingBag,
} from "react-icons/lu";

import { useTheme } from "../../../contexts/ThemeContext.jsx";
import Spinner from "../../../components/ui/Spinner.jsx";

function Readables() {
  const { theme } = useTheme();

  return (
    <section
      className="member-access flex min-h-[460px] flex-col items-center justify-center rounded-3xl border px-5 py-12 text-center sm:min-h-[500px] sm:px-8"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: theme.bgSoft,
          color: theme.primary,
        }}
      >
        <LuLibrary size={30} />
      </div>

      <p
        className="text-xs font-bold uppercase tracking-[0.18em]"
        style={{ color: theme.primary }}
      >
        Your digital collection
      </p>

      <h2
        className="mt-3 text-2xl font-semibold sm:text-3xl"
        style={{ color: theme.text }}
      >
        Your next chapter is waiting.
      </h2>

      <p
        className="mt-3 max-w-xl text-sm leading-7"
        style={{ color: theme.textMid || theme.text }}
      >
        Books, guides and educational documents purchased from
        the P-REACH OUT Store will be available here, ready to
        open and read within the application.
      </p>

      <div
        className="mt-9 flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border p-7"
        style={{
          backgroundColor: theme.bgSoft,
          borderColor: theme.border,
        }}
      >
        <div className="flex items-center gap-3">
          <LuShoppingBag
            size={21}
            style={{ color: theme.primary }}
          />
          <LuBookOpen
            size={21}
            style={{ color: theme.primary }}
          />
        </div>

        <Spinner
          size="lg"
          label="Preparing your reading collection..."
          showLabel={false}
        />

        <div>
          <h3
            className="text-xl font-semibold"
            style={{ color: theme.text }}
          >
            Coming Soon
          </h3>

          <p
            className="mt-2 text-sm"
            style={{ color: theme.textMid || theme.text }}
          >
            Your purchased readables will appear here once the
            Store is available.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Readables;
