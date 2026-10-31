import { FaBars, FaXmark } from "react-icons/fa6";

export default function HamburgerIcon({
  open = false,
  onClick,
  controls = "mobile-main-navigation",
  style = {},
}) {
  const Icon = open ? FaXmark : FaBars;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls={controls}
      style={style}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}
