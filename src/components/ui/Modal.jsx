
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { LuX } from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";

function Modal({
  isOpen,
  onClose,
  title,
  description,
  ariaLabel = "Dialog",
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = "",
}) {
  const { theme } = useTheme();

  const dialogRef = useRef(null);

  const generatedId = useId();
  const titleId = `${generatedId}-title`;
  const descriptionId = `${generatedId}-description`;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        onClose?.();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;

      const focusableElements = dialog?.querySelectorAll(
        'a[href], button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) {
        event.preventDefault();
        dialog?.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === dialog)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          document.activeElement === dialog)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      onMouseDown={(event) => {
        if (
          closeOnOverlay &&
          event.target === event.currentTarget
        ) {
          onClose?.();
        }
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
        className={[
          "relative my-auto w-full overflow-hidden rounded-2xl border shadow-2xl outline-none",
          sizes[size] || sizes.md,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
          color: theme.text,
        }}
      >
        {/* Modal heading */}
        {(title || showCloseButton) && (
          <div
            className="flex items-start justify-between gap-4 border-b px-5 py-4 sm:px-6"
            style={{ borderColor: theme.border }}
          >
            <div className="min-w-0">
              {title && (
                <h2
                  id={titleId}
                  className="text-lg font-extrabold sm:text-xl"
                >
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id={descriptionId}
                  className="mt-1 text-sm leading-6"
                  style={{ color: theme.textMid }}
                >
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-opacity hover:opacity-70"
                style={{
                  borderColor: theme.border,
                  color: theme.textMid,
                }}
              >
                <LuX size={19} />
              </button>
            )}
          </div>
        )}

        {/* Modal content */}
        <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
          {children}
        </div>

        {/* Optional footer actions */}
        {footer && (
          <div
            className="flex flex-wrap items-center justify-end gap-3 border-t px-5 py-4 sm:px-6"
            style={{ borderColor: theme.border }}
          >
            {footer}
          </div>
        )}
      </section>
    </div>,
    document.body
  );
}

export default Modal;
