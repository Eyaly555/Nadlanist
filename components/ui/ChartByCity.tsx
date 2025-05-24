"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";

interface TowerData {
  city: string;
}

interface ChartByCityProps {
  data: TowerData[];
  uniqueCities: string[];
  selectedCity: string;
  onCityClick: (city: string) => void;
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

const barColors = [
  "#00A6A2", "#2ECC71", "#FF6F61", "#6A0DAD", "#00BFFF", "#A6FF00", "#FF007F", "#FFD700", "#FF8C00", "#8A2BE2"
];

export function ChartByCity({ data, uniqueCities, selectedCity, onCityClick }: ChartByCityProps) {
  const width = useWindowWidth();
  const cityCounts = React.useMemo(() =>
    uniqueCities.map((city, idx) => ({
      city,
      count: data.filter(t => t.city === city).length,
      color: barColors[idx % barColors.length],
    })),
    [data, uniqueCities]
  );
  const chartConfig = React.useMemo(() =>
    Object.fromEntries(
      cityCounts.map((c) => [c.city, { label: c.city, color: c.color }])
    ),
    [cityCounts]
  );
  const tickFontSize = width < 640 ? 8 : 11;
  const tickMaxLen = width < 640 ? 6 : 10;
  const tickAngle = width < 640 ? -40 : 0;
  const totalTowers = cityCounts.reduce((sum, c) => sum + c.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>התפלגות מגדלים לפי עיר</CardTitle>
        <CardDescription>הערים עם מספר המגדלים הגבוה ביותר</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full h-[220px] sm:h-[320px] md:h-[400px]">
          <ChartContainer config={chartConfig}>
            <BarChart data={cityCounts} margin={{ left: 12, right: 12, top: 8, bottom: 24 }} width={undefined} height={undefined}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="city"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                angle={tickAngle}
                textAnchor={tickAngle ? "end" : "middle"}
                tick={{ fontSize: tickFontSize, fontFamily: 'inherit' }}
                tickFormatter={city => city.length > tickMaxLen ? city.slice(0, tickMaxLen) + '…' : city}
              />
              <YAxis tick={{ fontSize: tickFontSize, fontFamily: 'inherit' }} allowDecimals={false} axisLine={false} tickLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="city" labelKey="city" formatter={(_value, _name, _item, _idx, payloadArr) => {
                const city = payloadArr?.[0]?.payload?.city;
                const count = payloadArr?.[0]?.payload?.count;
                return city && count !== undefined ? `בעיר ${city} יש ${count} מגדלים.` : null;
              }} />} />
              <Bar dataKey="count" radius={8}>
                {cityCounts.map((entry) => (
                  <Cell
                    key={entry.city}
                    fill={selectedCity === entry.city ? "#00A6A2" : entry.color}
                    cursor="pointer"
                    onClick={() => onCityClick(selectedCity === entry.city ? "" : entry.city)}
                    aria-label={`בחר עיר ${entry.city}`}
                    role="button"
                    tabIndex={0}
                    onKeyPress={e => {
                      if (e.key === 'Enter' || e.key === ' ') onCityClick(selectedCity === entry.city ? "" : entry.city);
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {`סה"כ מגדלים: ${totalTowers}`} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">הנתונים מוצגים לפי ערים עם מספר המגדלים הגבוה ביותר</div>
      </CardFooter>
    </Card>
  );
} 