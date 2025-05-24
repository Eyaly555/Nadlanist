import * as React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { API_STATUS_TO_HEBREW_MAP, ApiStatus } from "./status.constants";

interface TowerData {
  tower_status: string;
}

interface ChartByStatusProps {
  data: TowerData[];
  selectedStatus: string;
  onStatusClick: (status: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  "הושלם": "#A3D8F4",
  "בבנייה": "#00A6A2",
  "בהכנה": "#FFD700",
  "השלמת שלד": "#6A0DAD",
  "מאושר": "#2ECC71",
  "בתכנון": "#00BFFF",
  "מוצע": "#A6FF00",
  "סטטוס לא מוגדר": "#CCCCCC",
  "אחר": "#B0B0B0",
};

const MIN_GROUP_PERCENT = 0.07; // 7%

function useWindowWidth() {
  const [width, setWidth] = React.useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

export function ChartByStatus({
  data,
  selectedStatus,
  onStatusClick,
}: ChartByStatusProps) {
  const width = useWindowWidth();
  const total = data.length;

  const statusCountsRaw = React.useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach((t) => {
      counts[t.tower_status] = (counts[t.tower_status] || 0) + 1;
    });
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  }, [data]);

  const [mainStatuses, otherStatuses] = React.useMemo(() => {
    const main: typeof statusCountsRaw = [],
      other: typeof statusCountsRaw = [];
    for (const s of statusCountsRaw) {
      if (s.count / total > MIN_GROUP_PERCENT) main.push(s);
      else other.push(s);
    }
    return [main, other];
  }, [statusCountsRaw, total]);

  const statusCounts = React.useMemo(
    () =>
      [
        ...mainStatuses,
        {
          status: "אחר",
          count: otherStatuses.reduce((sum, s) => sum + s.count, 0),
        },
      ].filter((s) => s.count > 0),
    [mainStatuses, otherStatuses]
  );

  const chartData = statusCounts.map((s) => {
    const hebrew = API_STATUS_TO_HEBREW_MAP[s.status as ApiStatus] || s.status;
    return {
      name: hebrew,
      value: s.count,
      fill:
        selectedStatus === s.status
          ? "#00A6A2"
          : STATUS_COLORS[hebrew] || "#CCCCCC",
      originalStatus: s.status,
    };
  });

  const pieInnerRadius = width < 640 ? 40 : width < 1024 ? 60 : 80;
  const pieOuterRadius = width < 640 ? 70 : width < 1024 ? 100 : 130;
  const tickMaxLen = width < 640 ? 6 : 10;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>התפלגות סטטוס מגדלים</CardTitle>
        <CardDescription>סה&quot;כ מגדלים: {total}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={{}} className="mx-auto aspect-square max-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ left: 12, right: 12, top: 8, bottom: 24 }}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={pieInnerRadius}
                outerRadius={pieOuterRadius}
                paddingAngle={2}
                isAnimationActive={false}
                labelLine={false}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {total.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {"סה\"כ מגדלים"}
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
                {chartData.map((entry) => (
                  <Cell
                    key={entry.originalStatus}
                    fill={entry.fill}
                    cursor="pointer"
                    onClick={() =>
                      onStatusClick(
                        selectedStatus === entry.originalStatus
                          ? ""
                          : entry.originalStatus
                      )
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="w-full mt-2">
          <ul className="legend flex flex-wrap gap-3 sm:gap-7 justify-center mt-3 sm:mt-6">
            {chartData.map((s) => (
              <li
                key={s.originalStatus}
                className="flex flex-col items-center min-w-[44px] sm:min-w-[60px]"
              >
                <span
                  className="inline-block w-[14px] h-[14px] sm:w-[20px] sm:h-[20px] rounded-full"
                  style={{
                    background: s.fill,
                    boxShadow: "0 0 0 2px #FFF",
                  }}
                />
                <span
                  className="font-bold text-[12px] sm:text-[15px] text-[#222D3A] mt-1"
                  title={s.name}
                >
                  {s.name.length > tickMaxLen
                    ? s.name.slice(0, tickMaxLen) + "…"
                    : s.name}
                </span>
                <span className="text-[11px] sm:text-[13px] text-[#666] font-semibold mt-0.5">
                  <span className="font-semibold">{s.value}</span>{" "}
                  <span className="font-normal">מגדלים</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
}
