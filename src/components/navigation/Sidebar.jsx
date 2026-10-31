import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import ThemeSelector from "./ThemeSelector.jsx";

export default function Sidebar({
  isOpen,
  onClose,
  navigationItems = [],
}) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] xl:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/50 backdrop-blur-sm"
      />

      <aside
        id="mobile-main-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="absolute right-0 top-0 flex h-full w-[min(88vw,380px)] flex-col overflow-y-auto border-l p-5 shadow-2xl"
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          borderColor: theme.border,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-extrabold">
            Navigation
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border text-2xl"
            style={{ borderColor: theme.border }}
          >
            ×
          </button>
        </div>

        <nav className="mt-7 flex flex-1 flex-col gap-2">
          {navigationItems.map((item) => (
            <details
              key={item.label}
              className="group rounded-xl border"
              style={{ borderColor: theme.border }}
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 font-bold"
                style={{ color: theme.text }}
              >
                {item.label}

                <span
                  className="transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </summary>

              <div className="flex flex-col gap-1 px-2 pb-2">
                {item.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className="rounded-lg px-4 py-3 text-sm no-underline transition hover:opacity-70"
                    style={{ color: theme.textMid }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </nav>

        <div
          className="mt-5 flex flex-col gap-4 border-t pt-5"
          style={{ borderColor: theme.border }}
        >
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: theme.textMid }}
          >
            Appearance
          </span>

          <ThemeSelector className="w-full" />

          <Link
            to="/donations"
            onClick={onClose}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 font-bold text-white no-underline"
            style={{ backgroundColor: theme.primary }}
          >
            Donate
          </Link>
        </div>
      </aside>
    </div>
  );
}
