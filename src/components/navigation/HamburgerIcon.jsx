export default function HamburgerIcon({
  open = false,
  onClick,
  controls = "mobile-main-navigation",
  style = {},
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls={controls}
      style={style}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
        <span
          className={`h-0.5 w-full rounded-full transition-all duration-300 ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-full rounded-full transition-all duration-300 ${
            open ? "scale-x-0 opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-full rounded-full transition-all duration-300 ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}
