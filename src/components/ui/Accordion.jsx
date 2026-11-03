
import { useId, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { useTheme } from "../../contexts/ThemeContext.jsx";

function Accordion({
  id,
  title,
  number,
  children,
  open,
  defaultOpen = false,
  onToggle,
}) {
  const { theme } = useTheme();

  const generatedId = useId();
  const componentId = id || generatedId;

  const triggerId = `${componentId}-trigger`;
  const panelId = `${componentId}-panel`;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : internalOpen;

  const handleToggle = () => {
    const nextOpen = !isOpen;

    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onToggle?.(nextOpen);
  };

  return (
    <article
      className="overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      {/* Accordion trigger */}
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggle}
        className="flex w-full items-center gap-4 px-4 py-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-3px] sm:px-6"
        style={{
          color: theme.text,
          backgroundColor: isOpen ? theme.bgSoft : "transparent",
        }}
      >
        {number !== undefined && (
          <span
            className="shrink-0 text-xs font-bold tracking-widest"
            style={{ color: theme.primary }}
          >
            {number}
          </span>
        )}

        <span className="flex-1 text-sm font-bold sm:text-base">
          {title}
        </span>

        <LuChevronDown
          size={20}
          className={`shrink-0 transition-transform duration-500 ease-in-out motion-reduce:transition-none ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          style={{ color: theme.primary }}
          aria-hidden="true"
        />
      </button>

      {/* Animated answer panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="grid overflow-hidden transition-[grid-template-rows] duration-[550ms] ease-in-out motion-reduce:transition-none"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="border-t px-4 py-5 transition-opacity duration-500 ease-in-out sm:px-6"
            style={{
              borderColor: theme.border,
              color: theme.textMid,
              opacity: isOpen ? 1 : 0,
            }}
          >
            <div className="space-y-4 text-sm leading-7 sm:text-base sm:leading-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Accordion;
