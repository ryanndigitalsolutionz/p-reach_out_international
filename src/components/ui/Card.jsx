
import { useTheme } from "../../contexts/ThemeContext.jsx";

export default function Card({
  title,
  description,
  headerAction,
  footer,
  children,
  padding = "md",
  className = "",
  onClick,
}) {
  const { theme } = useTheme();

  const paddingSizes = {
    none: "p-0",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  return (
    <article
      onClick={onClick}
      className={[
        "overflow-hidden rounded-2xl border",
        paddingSizes[padding] || paddingSizes.md,
        className,
      ].filter(Boolean).join(" ")}
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      {(title || description || headerAction) && (
        <header
          className={[
            "flex items-start justify-between gap-4",
            children ? "mb-5" : "",
          ].join(" ")}
        >
          <div className="min-w-0">
            {title && (
              <h3 className="text-lg font-extrabold">
                {title}
              </h3>
            )}

            {description && (
              <p
                className="mt-1 text-sm leading-6"
                style={{ color: theme.textMid }}
              >
                {description}
              </p>
            )}
          </div>

          {headerAction && (
            <div className="shrink-0">
              {headerAction}
            </div>
          )}
        </header>
      )}

      {children}

      {footer && (
        <footer
          className="mt-5 border-t pt-4"
          style={{ borderColor: theme.border }}
        >
          {footer}
        </footer>
      )}
    </article>
  );
}
