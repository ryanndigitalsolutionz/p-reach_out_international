import { Link } from "react-router-dom";

export default function BrandLogo({ onClick, primaryColor = "#C8193C" }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="P-REACH OUT International home"
      className="flex min-w-0 shrink-0 items-center gap-2 no-underline sm:gap-2.5"
    >
      <img
        src="/logo/static/P-Reach_Out_Int_Brand.svg"
        alt=""
        draggable={false}
        onDragStart={(event) => event.preventDefault()}
        className="h-8 w-8 shrink-0 select-none rounded-md bg-white object-contain p-0.5 sm:h-9 sm:w-9"
      />

      <span className="flex flex-col leading-tight">
        <span className="text-xs font-extrabold sm:text-sm">
          P-REACH OUT
        </span>
        <span
          className="text-[0.6rem] font-bold tracking-[0.14em] sm:text-[0.68rem]"
          style={{ color: primaryColor }}
        >
          INTERNATIONAL
        </span>
      </span>
    </Link>
  );
}
