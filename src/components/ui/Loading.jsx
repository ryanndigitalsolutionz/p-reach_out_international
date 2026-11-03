
const spinnerSizes = {
  sm: { diameter: 32, dot: 4, radius: 12 },
  md: { diameter: 48, dot: 6, radius: 19 },
  lg: { diameter: 64, dot: 8, radius: 26 },
};

const dotOpacities = [
  1,
  0.9,
  0.8,
  0.7,
  0.55,
  0.4,
  0.3,
  0.2,
];

function Loading({
  size = "md",
  label = "Loading",
  showLabel = false,
  fullScreen = false,
  className = "",
  style = {},
}) {
  const dimensions = spinnerSizes[size] || spinnerSizes.md;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={[
        "flex flex-col items-center justify-center gap-4",
        fullScreen ? "min-h-screen w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    >
      {/* Animated Dots Ring */}
      <div
        className="relative shrink-0 animate-[spin_1.1s_linear_infinite] motion-reduce:animate-none"
        aria-hidden="true"
        style={{
          width: dimensions.diameter,
          height: dimensions.diameter,
        }}
      >
        {dotOpacities.map((opacity, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              width: dimensions.dot,
              height: dimensions.dot,
              backgroundColor:
                index % 2 === 0 ? "#C8193C" : "#171717",
              opacity,
              transform: `rotate(${index * 45}deg) translateY(-${dimensions.radius}px)`,
              transformOrigin: "0 0",
            }}
          />
        ))}
      </div>

      {showLabel && (
        <span className="text-sm font-semibold">
          {label}
        </span>
      )}

      <span className="sr-only">{label}</span>
    </div>
  );
}

export default Loading;
