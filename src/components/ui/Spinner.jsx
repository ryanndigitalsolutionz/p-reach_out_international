
import { useTheme } from "../../contexts/ThemeContext.jsx";

export default function Spinner({
  label = "Processing...",
  showLabel = true,
  size = "md",
  className = "",
}) {
  const { theme } = useTheme();

  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "flex flex-col items-center justify-center gap-3",
        className,
      ].filter(Boolean).join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "inline-block animate-spin rounded-full",
          sizes[size] || sizes.md,
        ].join(" ")}
        style={{
          borderColor: `${theme.border} transparent transparent transparent`,
          borderTopColor: "#C8193C",
          borderRightColor: "#171717",
        }}
      />

      {showLabel && (
        <span
          className="text-sm font-semibold"
          style={{ color: theme.textMid }}
        >
          {label}
        </span>
      )}

      <span className="sr-only">{label}</span>
    </div>
  );
}
