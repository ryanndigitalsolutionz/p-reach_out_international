
export default function CurvedDivider({
  waveColor = "#FFFFFF",
  domeColor = "#C8193C",
  height = "clamp(44px, 5vw, 72px)",
  domeOpacity = 1,
  flip = false,
  className = "",
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full overflow-hidden leading-none ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="block h-full w-full"
        focusable="false"
      >
        <g
          transform={
            flip
              ? "translate(0 100) scale(1 -1)"
              : undefined
          }
        >
          {/* Stretched background dome */}
          <path
            d="
              M0 42
              C210 14 390 6 600 30
              C840 58 1020 51 1200 24
              C1300 8 1380 9 1440 20
              V100 H0 Z
            "
            fill={domeColor}
            opacity={domeOpacity}
          />

          {/* Main flowing wave */}
          <path
            d="
              M0 55
              C200 78 380 78 570 57
              C760 36 920 35 1100 52
              C1260 70 1360 64 1440 45
              V100 H0 Z
            "
            fill={waveColor}
          />
        </g>
      </svg>
    </div>
  );
}
