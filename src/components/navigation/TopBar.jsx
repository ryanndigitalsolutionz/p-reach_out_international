
import { LuInfo } from "react-icons/lu";
import { useTheme } from "../../contexts/ThemeContext.jsx";

function TopBar({ message = "" }) {
  const { theme } = useTheme();

  const announcement =
    typeof message === "string" ? message.trim() : "";

  if (!announcement) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sticky top-0 z-40 w-full border-b px-4 py-3 sm:px-6"
      style={{
        backgroundColor: theme.bgSoft,
        color: theme.text,
        borderColor: theme.border,
      }}
    >
      <div className="mx-auto flex max-w-[1500px] items-start gap-3">
        <LuInfo
          size={19}
          className="mt-0.5 shrink-0"
          style={{ color: theme.primary }}
          aria-hidden="true"
        />

        <p className="min-w-0 flex-1 text-sm font-semibold leading-6">
          {announcement}
        </p>
      </div>
    </div>
  );
}

export { TopBar };
export default TopBar;
