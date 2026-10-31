import { Link } from "react-router-dom";

export default function BrandLogo({ onClick, primaryColor = "#C8193C" }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="P-REACH OUT International home"
      className="flex min-w-0 shrink-0 items-center gap-2 no-underline sm:gap-3"
    >
      <img
        src="/logo/static/P-Reach_Out_Int_Brand.svg"
        alt=""
        draggable={false}
        onDragStart={(event) => event.preventDefault()}
        className="h-9 w-9 shrink-0 select-none rounded-lg bg-white object-contain p-0.5 sm:h-11 sm:w-11"
      />

      <span className="flex flex-col leading-tight">
        <span className="text-sm font-extrabold sm:text-base">P-REACH OUT</span>
        <span
          className="text-[0.65rem] font-bold tracking-[0.16em] sm:text-xs"
          style={{ color: primaryColor }}
        >
          INTERNATIONAL
        </span>
      </span>
    </Link>
  );
}
