
import { LuLoaderCircle } from "react-icons/lu";
import { useTheme } from "../../contexts/ThemeContext.jsx";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  loading = false,
  loadingLabel,
  disabled = false,
  fullWidth = false,
  className = "",
  style = {},
  onClick,
  ...buttonProps
}) {
  const { theme } = useTheme();

  const variants = {
    primary: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
      color: "#FFFFFF",
    },

    secondary: {
      backgroundColor: theme.bgSoft,
      borderColor: theme.border,
      color: theme.text,
    },

    outline: {
      backgroundColor: "transparent",
      borderColor: theme.border,
      color: theme.text,
    },

    ghost: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      color: theme.primary,
    },

    danger: {
      backgroundColor: "#B42318",
      borderColor: "#B42318",
      color: "#FFFFFF",
    },
  };

  const sizes = {
    sm: "min-h-9 px-4 py-2 text-xs",
    md: "min-h-11 px-5 py-2.5 text-sm",
    lg: "min-h-12 px-6 py-3 text-base",
  };

  const selectedVariant = variants[variant] || variants.primary;
  const selectedSize = sizes[size] || sizes.md;

  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-full border font-bold",
        "transition-colors transition-opacity duration-200",
        "hover:opacity-85",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        selectedSize,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        ...selectedVariant,
        outlineColor: theme.primary,
        ...style,
      }}
    >
      {loading ? (
        <LuLoaderCircle
          size={18}
          className="animate-spin shrink-0"
          aria-hidden="true"
        />
      ) : LeftIcon ? (
        <LeftIcon size={18} className="shrink-0" aria-hidden="true" />
      ) : null}

      <span>
        {loading && loadingLabel ? loadingLabel : children}
      </span>

      {!loading && RightIcon && (
        <RightIcon
          size={18}
          className="shrink-0"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export default Button;
