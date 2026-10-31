import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

export default function ThemeSelector({ className = "" }) {
  const { theme, themeName, setThemeName, THEMES } = useTheme();
  const [open, setOpen] = useState(false);

  const currentName = THEMES[themeName]?.name || themeName;

  const selectTheme = (key) => {
    setThemeName(key);
    setOpen(false);
  };

  return (
    <div
      className={`relative ${className}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
      style={{ fontFamily: '"Anonymous Pro", monospace' }}
    >
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-h-11 items-center justify-between gap-3 rounded-full border px-3 py-2 text-sm font-bold transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          borderColor: theme.border,
          outlineColor: theme.primary,
        }}
      >
        <span>{currentName}</span>

        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m5 7 5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Choose appearance theme"
          className="absolute right-0 top-full z-[80] mt-3 w-52 rounded-2xl border p-2 shadow-xl"
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            borderColor: theme.border,
          }}
        >
          {Object.entries(THEMES).map(([key, item]) => {
            const selected = themeName === key;

            return (
              <button
                key={key}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => selectTheme(key)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-base transition hover:opacity-75"
                style={{
                  backgroundColor: selected ? theme.bgSoft : "transparent",
                  fontFamily: '"Anonymous Pro", monospace',
                }}
              >
                <span className="flex-1 font-bold">
                  {item.name || key}
                </span>

                {selected && (
                  <span
                    className="text-lg font-bold"
                    style={{ color: theme.primary }}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}