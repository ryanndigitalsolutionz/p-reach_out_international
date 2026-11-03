
import { useTheme } from "../../contexts/ThemeContext.jsx";

export default function Table({
  columns = [],
  data = [],
  rowKey = "id",
  emptyMessage = "No records available.",
  onRowClick,
  className = "",
}) {
  const { theme } = useTheme();

  return (
    <div
      className={[
        "w-full overflow-x-auto rounded-xl border",
        className,
      ].filter(Boolean).join(" ")}
      style={{ borderColor: theme.border }}
    >
      <table className="w-full min-w-[600px] border-collapse text-left">
        <thead>
          <tr
            style={{
              backgroundColor: theme.bgSoft,
              color: theme.text,
            }}
          >
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="whitespace-nowrap px-5 py-4 text-xs font-bold uppercase tracking-wider"
                style={{
                  textAlign: column.align || "left",
                  width: column.width,
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={row[rowKey] ?? index}
                onClick={() => onRowClick?.(row)}
                className={onRowClick ? "cursor-pointer" : ""}
                style={{
                  borderTop: `1px solid ${theme.border}`,
                  color: theme.text,
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-5 py-4 text-sm"
                    style={{
                      color: theme.textMid,
                      textAlign: column.align || "left",
                    }}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={Math.max(columns.length, 1)}
                className="px-5 py-12 text-center text-sm"
                style={{ color: theme.textMid }}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
