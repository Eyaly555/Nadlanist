import * as React from "react";
import { ChartContainer } from "./chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TowerData {
  height_m: number;
}

const HEIGHT_BINS = [
  { min: 0, max: 100, label: "0-100" },
  { min: 101, max: 150, label: "101-150" },
  { min: 151, max: 200, label: "151-200" },
  { min: 201, max: 250, label: "201-250" },
  { min: 251, max: 9999, label: "250+" },
];

export function ChartHeightHistogram({ data }: { data: TowerData[] }) {
  const bins = React.useMemo(() =>
    HEIGHT_BINS.map(bin => ({
      ...bin,
      count: data.filter(t => t.height_m >= bin.min && t.height_m <= bin.max).length,
    })),
    [data]
  );
  const barColors = ["#00A6A2", "#2ECC71", "#FF6F61", "#6A0DAD", "#FFD700"];

  return (
    <ChartContainer config={{}}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={bins} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <XAxis dataKey="label" tick={{ fontSize: 13 }} />
          <YAxis allowDecimals={false} />
          <Tooltip
            content={({ active, payload }) =>
              active && payload && payload[0] ? (
                <div className="bg-white p-2 rounded shadow text-xs">
                  {`${payload[0].payload.count} מגדלים בגובה ${payload[0].payload.label} מ'`}
                </div>
              ) : null
            }
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {bins.map((entry, idx) => (
              <Cell key={entry.label} fill={barColors[idx % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
} 