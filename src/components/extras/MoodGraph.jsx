
import { useMemo } from "react";
import { LuActivity, LuChartNoAxesCombined } from "react-icons/lu";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const CHART_WIDTH = 640;
const CHART_HEIGHT = 270;

const PADDING = {
  top: 20,
  right: 20,
  bottom: 45,
  left: 45,
};

const moodColor = "#dc2626";
const wellbeingColor = "#0f766e";

function toValidScore(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return Math.min(100, Math.max(0, number));
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value ?? "");
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function getX(index, total) {
  const plotWidth = CHART_WIDTH - PADDING.left - PADDING.right;

  if (total <= 1) {
    return PADDING.left + plotWidth / 2;
  }

  return PADDING.left + (index / (total - 1)) * plotWidth;
}

function getY(score) {
  const plotHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  return PADDING.top + ((100 - score) / 100) * plotHeight;
}

function buildPoints(entries, field) {
  return entries
    .map((entry, index) => {
      const score = toValidScore(entry[field]);

      if (score === null) {
        return null;
      }

      return {
        x: getX(index, entries.length),
        y: getY(score),
        score,
        date: entry.date,
        key: entry.id ?? `${entry.date}-${field}-${index}`,
      };
    })
    .filter(Boolean);
}

function buildPath(points) {
  if (points.length < 2) {
    return "";
  }

  return points
    .map((point, index) => {
      const command = index === 0 ? "M" : "L";
      return `${command} ${point.x} ${point.y}`;
    })
    .join(" ");
}

function MoodGraph({ entries = [], className = "" }) {
  const { theme } = useTheme();

  const sortedEntries = useMemo(() => {
    return [...entries]
      .filter((entry) => entry && entry.date)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [entries]);

  const moodPoints = buildPoints(sortedEntries, "mood");
  const wellbeingPoints = buildPoints(sortedEntries, "who5");

  const hasData = moodPoints.length > 0 || wellbeingPoints.length > 0;

  const labelStep = Math.max(
    1,
    Math.ceil((sortedEntries.length - 1) / 5)
  );

  if (!hasData) {
    return (
      <section
        className={`rounded-2xl border p-5 ${className}`}
        style={{
          backgroundColor: theme.card,
          borderColor: theme.border,
        }}
      >
        <div className="flex items-center gap-3">
          <LuChartNoAxesCombined size={22} style={{ color: moodColor }} />
          <h2 className="text-lg font-semibold" style={{ color: theme.text }}>
            Your mood history
          </h2>
        </div>

        <div className="py-10 text-center">
          <LuActivity
            size={32}
            className="mx-auto mb-3"
            style={{ color: theme.text, opacity: 0.4 }}
          />

          <p className="font-medium" style={{ color: theme.text }}>
            Your graph is waiting for its first check-in.
          </p>

          <p
            className="mx-auto mt-1 max-w-sm text-sm"
            style={{ color: theme.text, opacity: 0.6 }}
          >
            Complete your weekly wellbeing check-ins to begin building
            your personal mood history.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`rounded-2xl border p-5 ${className}`}
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: theme.text }}>
            Your mood history
          </h2>

          <p
            className="mt-1 text-sm"
            style={{ color: theme.text, opacity: 0.6 }}
          >
            Follow your personal mood and wellbeing over time.
          </p>
        </div>

        <LuChartNoAxesCombined
          size={22}
          style={{ color: moodColor }}
        />
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          role="img"
          aria-label="Graph showing personal mood and WHO-5 wellbeing scores over time"
          className="w-full min-w-[520px]"
        >
          {[0, 25, 50, 75, 100].map((value) => {
            const y = getY(value);

            return (
              <g key={value}>
                <line
                  x1={PADDING.left}
                  y1={y}
                  x2={CHART_WIDTH - PADDING.right}
                  y2={y}
                  stroke={theme.border}
                  strokeDasharray="4 5"
                />

                <text
                  x={PADDING.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill={theme.text}
                  opacity="0.6"
                >
                  {value}
                </text>
              </g>
            );
          })}

          <line
            x1={PADDING.left}
            y1={PADDING.top}
            x2={PADDING.left}
            y2={CHART_HEIGHT - PADDING.bottom}
            stroke={theme.border}
          />

          <line
            x1={PADDING.left}
            y1={CHART_HEIGHT - PADDING.bottom}
            x2={CHART_WIDTH - PADDING.right}
            y2={CHART_HEIGHT - PADDING.bottom}
            stroke={theme.border}
          />

          <path
            d={buildPath(wellbeingPoints)}
            fill="none"
            stroke={wellbeingColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={buildPath(moodPoints)}
            fill="none"
            stroke={moodColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {wellbeingPoints.map((point) => (
            <circle
              key={point.key}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={wellbeingColor}
              stroke={theme.card}
              strokeWidth="2"
            >
              <title>
                WHO-5: {point.score}/100 — {formatDate(point.date)}
              </title>
            </circle>
          ))}

          {moodPoints.map((point) => (
            <circle
              key={point.key}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={moodColor}
              stroke={theme.card}
              strokeWidth="2"
            >
              <title>
                Personal mood: {point.score}/100 — {formatDate(point.date)}
              </title>
            </circle>
          ))}

          {sortedEntries.map((entry, index) => {
            if (
              index % labelStep !== 0 &&
              index !== sortedEntries.length - 1
            ) {
              return null;
            }

            return (
              <text
                key={`${entry.date}-${index}`}
                x={getX(index, sortedEntries.length)}
                y={CHART_HEIGHT - 15}
                textAnchor="middle"
                fontSize="11"
                fill={theme.text}
                opacity="0.65"
              >
                {formatDate(entry.date)}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: moodColor }}
          />
          <span className="text-xs" style={{ color: theme.text }}>
            Personal mood
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: wellbeingColor }}
          />
          <span className="text-xs" style={{ color: theme.text }}>
            WHO-5 wellbeing
          </span>
        </div>
      </div>
    </section>
  );
}

export default MoodGraph;
