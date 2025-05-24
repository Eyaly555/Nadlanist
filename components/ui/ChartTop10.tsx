import * as React from "react";
import { ChartContainer } from "./chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TowerData {
  project_name: string;
  height_m: number;
  floors: number;
}

interface ChartTop10Props {
  data: TowerData[];
  mode: "height" | "floors";
}

export function ChartTop10({ data, mode }: ChartTop10Props) {
  const top10 = React.useMemo(() => {
    const valueKey = mode === "height" ? "height_m" : "floors";
    const sorted = [...data]
      .filter(t => t.project_name && t[valueKey] !== undefined && t[valueKey] !== null)
      .sort((a, b) => b[valueKey] - a[valueKey])
      .slice(0, 10);
    return sorted.map((t, idx) => ({
      name: t.project_name,
      value: t[valueKey],
      idx,
    })); // reverse for horizontal bar chart (top at top)
  }, [data, mode]);

  const barColors = ["#00A6A2", "#2ECC71", "#FF6F61", "#6A0DAD", "#FFD700"];

  return (
    <ChartContainer config={{}}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={top10} margin={{ left: 24, right: 24, top: 8, bottom: 8 }}>
          <XAxis dataKey="name" tick={{ fontSize: 11 }} tickFormatter={name => name.length > 10 ? name.slice(0, 10) + '…' : name} />
          <YAxis type="number" tick={{ fontSize: 13 }} />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;
              const val = payload[0].value;
              if (typeof val !== "number") return null;
              return (
                <div className="bg-white p-2 rounded shadow text-xs">
                  {mode === "height"
                    ? `${val.toLocaleString()} מטר`
                    : `${val.toLocaleString()} קומות`}
                </div>
              );
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {top10.map((entry, idx) => (
              <Cell
                key={entry.name}
                fill={idx === top10.length - 1 ? "#00A6A2" : barColors[idx % barColors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
} 