import * as React from "react";
import { ChartContainer } from "./chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TowerData {
  Project_name_il: string;
  height_m: number;
  floors: number;
}

interface ChartTop10Props {
  data: TowerData[];
  mode: "height" | "floors";
}

function useWindowWidth() {
  const [width, setWidth] = React.useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  React.useEffect(() => {
    function handleResize() { setWidth(window.innerWidth); }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

export function ChartTop10({ data, mode }: ChartTop10Props) {
  const width = useWindowWidth();
  const top10 = React.useMemo(() => {
    const valueKey = mode === "height" ? "height_m" : "floors";
    const sorted = [...data]
      .filter(t => t.Project_name_il && t[valueKey] !== undefined && t[valueKey] !== null)
      .sort((a, b) => b[valueKey] - a[valueKey])
      .slice(0, 10);
    return sorted.map((t, idx) => ({
      name: t.Project_name_il,
      value: t[valueKey],
      idx,
    }));
  }, [data, mode]);
  const barColors = ["#00A6A2", "#2ECC71", "#FF6F61", "#6A0DAD", "#FFD700"];
  const tickFontSize = width < 640 ? 8 : 11;
  const tickMaxLen = width < 640 ? 6 : 10;
  const tickAngle = width < 640 ? -40 : 0;
  return (
    <ChartContainer config={{}}>
      <div className="w-full h-[220px] sm:h-[320px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top10} margin={{ left: 12, right: 12, top: 8, bottom: 24 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: tickFontSize, fontFamily: 'inherit' }}
              angle={tickAngle}
              textAnchor="end"
              tickFormatter={name => name.length > tickMaxLen ? name.slice(0, tickMaxLen) + '…' : name}
            />
            <YAxis type="number" tick={{ fontSize: tickFontSize, fontFamily: 'inherit' }} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const val = payload[0].value;
                if (typeof val !== "number") return null;
                return (
                  <div className="bg-white p-2 rounded shadow text-xs sm:text-sm">
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
      </div>
    </ChartContainer>
  );
} 