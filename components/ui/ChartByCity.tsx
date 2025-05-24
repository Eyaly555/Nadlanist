import * as React from "react";
import { ChartContainer } from "./chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TowerData {
  city: string;
}

interface ChartByCityProps {
  data: TowerData[];
  uniqueCities: string[];
  selectedCity: string;
  onCityClick: (city: string) => void;
}

export function ChartByCity({ data, uniqueCities, selectedCity, onCityClick }: ChartByCityProps) {
  const cityCounts = React.useMemo(() =>
    uniqueCities.map(city => ({
      city,
      count: data.filter(t => t.city === city).length,
    })),
    [data, uniqueCities]
  );

  const barColors = [
    "#00A6A2", "#2ECC71", "#FF6F61", "#6A0DAD", "#00BFFF", "#A6FF00", "#FF007F", "#FFD700", "#FF8C00", "#8A2BE2"
  ];

  return (
    <ChartContainer config={{}}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={cityCounts} margin={{ left: 24, right: 24, top: 8, bottom: 8 }}>
          <XAxis dataKey="city" tick={{ fontSize: 11 }} tickFormatter={city => city.length > 10 ? city.slice(0, 10) + '…' : city} />
          <YAxis type="number" allowDecimals={false} />
          <Tooltip
            content={({ active, payload }) =>
              active && payload && payload[0] ? (
                <div className="bg-white p-2 rounded shadow text-xs">
                  {`בעיר ${payload[0].payload.city} יש ${payload[0].payload.count} מגדלים.`}
                </div>
              ) : null
            }
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {cityCounts.map((entry, idx) => (
              <Cell
                key={entry.city}
                fill={selectedCity === entry.city ? "#00A6A2" : barColors[idx % barColors.length]}
                cursor="pointer"
                onClick={() => onCityClick(selectedCity === entry.city ? "" : entry.city)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
} 