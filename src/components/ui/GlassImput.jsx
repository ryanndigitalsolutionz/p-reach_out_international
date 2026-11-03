
import { forwardRef, useId } from "react";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const GlassInput = forwardRef(function GlassInput(
  {
    id,
    name,
    label,
    type = "text",
    placeholder = "",
    value,
    defaultValue,
    onChange,
    required = false,
    disabled = false,
    readOnly = false,
    autoComplete,
    autoFocus,
    inputMode,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    leftIcon: LeftIcon,
    rightElement,
    hint,
    error,
    className = "",
    wrapperClassName = "",
    labelClassName = "",
    style = {},
    ...inputProps
  },
  ref
) {
  const { theme } = useTheme();
  const generatedId = useId();

  const inputId = id || name || generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const borderColor = error
    ? "#DC2626"
    : theme.border;

  return (
    <div className={`w-full ${wrapperClassName}`}>
      {label && (
        <label
          htmlFor={inputId}
          className={[
            "mb-2 block text-sm font-bold",
            labelClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ color: theme.text }}
        >
          {label}

          {required && (
            <span
              className="ml-1"
              style={{ color: theme.primary }}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      <div
        className="flex min-h-12 w-full items-center gap-3 rounded-xl border px-4 transition-colors duration-200 focus-within:outline-2 focus-within:outline-offset-2"
        style={{
          backgroundColor: theme.card,
          borderColor,
          outlineColor: error ? "#DC2626" : theme.primary,
          backdropFilter: "blur(12px)",
          opacity: disabled ? 0.55 : 1,
        }}
      >
        {LeftIcon && (
          <LeftIcon
            size={19}
            className="shrink-0"
            style={{ color: theme.textMid }}
            aria-hidden="true"
          />
        )}

        <input
          {...inputProps}
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          inputMode={inputMode}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            "min-w-0 min-h-12 w-full bg-transparent py-3 text-sm",
            "outline-none placeholder:opacity-60",
            "disabled:cursor-not-allowed",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            color: theme.text,
            ...style,
          }}
        />

        {rightElement && (
          <div className="flex shrink-0 items-center">
            {rightElement}
          </div>
        )}
      </div>

      {hint && (
        <p
          id={hintId}
          className="mt-2 text-xs leading-5"
          style={{ color: theme.textMid }}
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-xs font-semibold leading-5"
          style={{ color: "#DC2626" }}
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default GlassInput;
