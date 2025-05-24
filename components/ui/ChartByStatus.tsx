import * as React from "react";
import { ChartContainer } from "./chart";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
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

export function ChartByStatus({ data, selectedStatus, onStatusClick }: ChartByStatusProps) {
  const total = data.length;
  const statusCountsRaw = React.useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach(t => {
      counts[t.tower_status] = (counts[t.tower_status] || 0) + 1;
    });
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  }, [data]);

  const [mainStatuses, otherStatuses] = React.useMemo(() => {
    const main: typeof statusCountsRaw = [], other: typeof statusCountsRaw = [];
    for (const s of statusCountsRaw) {
      if (s.count / total > MIN_GROUP_PERCENT) main.push(s);
      else other.push(s);
    }
    return [main, other];
  }, [statusCountsRaw, total]);

  const statusCounts = React.useMemo(() => [
    ...mainStatuses,
    {
      status: "אחר",
      count: otherStatuses.reduce((sum, s) => sum + s.count, 0),
    },
  ].filter(s => s.count > 0), [mainStatuses, otherStatuses]);

  return (
    <ChartContainer config={{}}>
      <div className="relative flex flex-col items-center">
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={statusCounts}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              isAnimationActive={false}
              labelLine={false}
            >
              {statusCounts.map((entry) => {
                const hebrew = API_STATUS_TO_HEBREW_MAP[entry.status as ApiStatus] || entry.status;
                return (
                  <Cell
                    key={entry.status}
                    fill={selectedStatus === entry.status ? "#00A6A2" : STATUS_COLORS[hebrew] || "#CCCCCC"}
                    cursor="pointer"
                    onClick={() => onStatusClick(selectedStatus === entry.status ? "" : entry.status)}
                  />
                );
              })}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8, color: '#222D3A', fontWeight: 600, fontSize: 15 }}
              itemStyle={{ color: '#222D3A', fontWeight: 700 }}
              formatter={(_, name, props: unknown) => {
                const entry = (props as { payload: { status: string; count: number } }).payload;
                const percent = total ? Math.round((entry.count / total) * 100) : 0;
                const hebrew = API_STATUS_TO_HEBREW_MAP[entry.status as ApiStatus] || entry.status;
                return [`${entry.count} מגדלים (${percent}%)`, hebrew];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* מרכז הגרף */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222D3A' }}>{total}</div>
          <div style={{ fontSize: 14, color: '#222D3A' }}>{`סה"כ מגדלים`}</div>
        </div>
        {/* אגדה */}
        <ul
          className="legend flex flex-wrap gap-7 justify-center mt-6"
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {statusCounts.map(s => {
            const hebrew = API_STATUS_TO_HEBREW_MAP[s.status as ApiStatus] || s.status;
            return (
              <li key={s.status} className="flex flex-col items-center min-w-[60px]">
                <span
                  className="color"
                  style={{
                    display: 'inline-block',
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: STATUS_COLORS[hebrew] || '#888',
                    boxShadow: '0 0 0 2px #FFF',
                  }}
                />
                <span
                  className="status"
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: '#222D3A',
                    marginTop: 4,
                  }}
                >
                  {hebrew}
                </span>
                <span
                  className="count"
                  style={{
                    fontSize: 13,
                    color: '#666',
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{s.count}</span> <span style={{ fontWeight: 400 }}>מגדלים</span>
                </span>
              </li>
            );
          })}
        </ul>
        <style>{`
          ul.legend {
            display: flex;
            flex-wrap: wrap;
            gap: 28px;
            justify-content: center;
            margin-top: 32px;
          }
          ul.legend li {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 60px;
          }
          ul.legend .color {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-shadow: 0 0 0 2px #fff;
          }
          ul.legend .status {
            font-weight: 700;
            font-size: 15px;
            color: #222D3A;
            margin-top: 4px;
          }
          ul.legend .count {
            font-size: 13px;
            color: #666;
            font-weight: 600;
            margin-top: 2px;
          }
          @media (max-width: 600px) {
            ul.legend {
              gap: 14px;
              margin-top: 12px;
            }
            ul.legend .color { width: 14px; height: 14px; }
            ul.legend li { min-width: 44px; }
            ul.legend .status { font-size: 12px; }
            ul.legend .count { font-size: 11px; }
          }
        `}</style>
      </div>
    </ChartContainer>
  );
} 