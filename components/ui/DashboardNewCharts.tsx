// צור קובץ חדש: components/ui/DashboardNewCharts.tsx

import * as React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface TowerData {
  project_name_il: string;
  effective_city: string;
  height_m: number;
  floors: number;
  tower_status: string;
  full_address?: string;
  project_status?: string;
  num_towers?: number;
  project_description?: string;
  id?: number | string;
}

interface ChartProps {
  data: TowerData[];
}

const CITY_COLORS: Record<string, string> = {
    // הערים הקיימות שלך עם הווריאציות והצבעים המקוריים
    "תל אביב": "#00A6A2",
    "תל-אביב": "#00A6A2",
    "Tel Aviv": "#00A6A2",
    "tel aviv": "#00A6A2",
    "tel-aviv": "#00A6A2",
    "Tel Aviv-Yafo": "#00A6A2", // הוספתי גם את תל אביב-יפו
    "tel aviv-yafo": "#00A6A2",
    "tel-aviv-yafo": "#00A6A2",
  
    "רמת גן": "#2ECC71",
    "רמת-גן": "#2ECC71",
    "Ramat Gan": "#2ECC71",
    "ramat gan": "#2ECC71",
    "ramat-gan": "#2ECC71",
  
    "בת ים": "#FF6F61",
    "בת-ים": "#FF6F61",
    "Bat Yam": "#FF6F61",
    "bat yam": "#FF6F61",
    "bat-yam": "#FF6F61",
  
    "גבעתיים": "#6A0DAD",
    // "גבעתיים" - מילה אחת, אין צורך במקף
    "Givatayim": "#6A0DAD",
    "givatayim": "#6A0DAD",
  
    "ירושלים": "#FFD700",
    // "ירושלים" - מילה אחת
    "Jerusalem": "#FFD700",
    "jerusalem": "#FFD700",
  
    "חיפה": "#00BFFF",
    // "חיפה" - מילה אחת
    "Haifa": "#00BFFF",
    "haifa": "#00BFFF",
  
    "באר שבע": "#FF007F",
    "באר-שבע": "#FF007F",
    "Beer Sheva": "#FF007F",
    "beer sheva": "#FF007F",
    "beer-sheva": "#FF007F",
    "Beersheba": "#FF007F", // כתיב נוסף
    "beersheba": "#FF007F",
  
    // ערים חדשות וצבעים חדשים
    "ראשון לציון": "#FF8C00", // DarkOrange
    "ראשון-לציון": "#FF8C00",
    "Rishon LeZion": "#FF8C00",
    "rishon lezion": "#FF8C00",
    "rishon-lezion": "#FF8C00",
  
    "פתח תקווה": "#4682B4", // SteelBlue
    "פתח-תקווה": "#4682B4",
    "Petah Tikva": "#4682B4",
    "petah tikva": "#4682B4",
    "petah-tikva": "#4682B4",
  
    "אשדוד": "#E9967A", // DarkSalmon
    "Ashdod": "#E9967A",
    "ashdod": "#E9967A",
  
    "נתניה": "#32CD32", // LimeGreen
    "Netanya": "#32CD32",
    "netanya": "#32CD32",
  
    "בני ברק": "#DA70D6", // Orchid
    "בני-ברק": "#DA70D6",
    "Bnei Brak": "#DA70D6",
    "bnei brak": "#DA70D6",
    "bnei-brak": "#DA70D6",
  
    "חולון": "#D2691E", // Chocolate
    "Holon": "#D2691E",
    "holon": "#D2691E",
  
    "אשקלון": "#8A2BE2", // BlueViolet
    "Ashkelon": "#8A2BE2",
    "ashkelon": "#8A2BE2",
  
    "רחובות": "#A0522D", // Sienna
    "Rehovot": "#A0522D",
    "rehovot": "#A0522D",
  
    "הרצליה": "#FF4500", // OrangeRed
    "Herzliya": "#FF4500",
    "herzliya": "#FF4500",
  
    "כפר סבא": "#20B2AA", // LightSeaGreen
    "כפר-סבא": "#20B2AA",
    "Kfar Saba": "#20B2AA",
    "kfar saba": "#20B2AA",
    "kfar-saba": "#20B2AA",
  
    "מודיעין-מכבים-רעות": "#9370DB", // MediumPurple
    "מודיעין מכבים רעות": "#9370DB", // גם בלי המקף הפנימי הארוך
    "Modiin-Maccabim-Reut": "#9370DB",
    "modiin-maccabim-reut": "#9370DB",
    "Modiin": "#9370DB", // לעיתים מתייחסים רק כמודיעין
    "modiin": "#9370DB",
  
    "רעננה": "#C71585", // MediumVioletRed
    "Raanana": "#C71585",
    "raanana": "#C71585",
  
    "חדרה": "#6B8E23", // OliveDrab
    "Hadera": "#6B8E23",
    "hadera": "#6B8E23",
  
    "לוד": "#FFB6C1", // LightPink
    "Lod": "#FFB6C1",
    "lod": "#FFB6C1",
  
    "רמלה": "#87CEEB", // SkyBlue
    "Ramla": "#87CEEB",
    "ramla": "#87CEEB",
  
    "הוד השרון": "#FFA07A", // LightSalmon
    "הוד-השרון": "#FFA07A",
    "Hod HaSharon": "#FFA07A",
    "hod hasharon": "#FFA07A",
    "hod-hasharon": "#FFA07A",
  
    "קרית גת": "#7FFF00", // Chartreuse
    "קרית-גת": "#7FFF00",
    "Kiryat Gat": "#7FFF00",
    "kiryat gat": "#7FFF00",
    "kiryat-gat": "#7FFF00",
    
    "אילת": "#DC143C", // Crimson
    "Eilat": "#DC143C",
    "eilat": "#DC143C",
  
    "עפולה": "#00CED1", // DarkTurquoise
    "Afula": "#00CED1",
    "afula": "#00CED1",
  
    "נהריה": "#FF1493", // DeepPink
    "Nahariya": "#FF1493",
    "nahariya": "#FF1493",
  
    "טבריה": "#1E90FF", // DodgerBlue
    "Tiberias": "#1E90FF",
    "tiberias": "#1E90FF",
  
    // צבע ברירת מחדל
    "אחר": "#e0abc5",
    "Other": "#e0abc5",
    "other": "#e0abc5",
    "נצרת": "#B8860B", // DarkGoldenrod
    "Nazareth": "#B8860B",
    "nazareth": "#B8860B",

    "בית שמש": "#48D1CC", // MediumTurquoise
    "בית-שמש": "#48D1CC",
    "Beit Shemesh": "#48D1CC",
    "beit shemesh": "#48D1CC",
    "beit-shemesh": "#48D1CC",

    "כרמיאל": "#FF7F50", // Coral
    "Karmiel": "#FF7F50",
    "karmiel": "#FF7F50",

    "טירת כרמל": "#6495ED", // CornflowerBlue
    "טירת-כרמל": "#6495ED",
    "Tirat Carmel": "#6495ED",
    "tirat carmel": "#6495ED",
    "tirat-carmel": "#6495ED",

    "קרית אתא": "#F08080", // LightCoral
    "קרית-אתא": "#F08080",
    "Kiryat Ata": "#F08080",
    "kiryat ata": "#F08080",
    "kiryat-ata": "#F08080",

    "דימונה": "#BA55D3", // MediumOrchid
    "Dimona": "#BA55D3",
    "dimona": "#BA55D3",

    "צפת": "#98FB98", // PaleGreen
    "Safed": "#98FB98",
    "safed": "#98FB98",
    "Tzfat": "#98FB98", // כתיב נוסף
    "tzfat": "#98FB98",

    "אום אל-פחם": "#DDA0DD", // Plum
    "אום-אל-פחם": "#DDA0DD",
    "Umm al-Fahm": "#DDA0DD",
    "umm al-fahm": "#DDA0DD",
    "umm-al-fahm": "#DDA0DD",// תיקון: # אחד
  };

// 1. גרף פיזור - גובה מול קומות
export function HeightVsFloorsScatter({ data }: ChartProps) {
  const scatterData = React.useMemo(() => {
    return data.map((tower) => ({
      x: tower.floors,
      y: tower.height_m,
      z: 50,
      name: tower.project_name_il,
      city: tower.effective_city,
      color: CITY_COLORS[tower.effective_city] || CITY_COLORS["אחר"],
    }));
  }, [data]);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>יחס גובה לקומות</CardTitle>
        <CardDescription>
          השוואה בין מספר הקומות לגובה המגדל
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
              <XAxis
                dataKey="x"
                name="קומות"
                type="number"
                domain={[0, "dataMax + 5"]}
                label={{ value: "מספר קומות", position: "insideBottom", offset: -10 }}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                dataKey="y"
                name="גובה"
                type="number"
                domain={[0, "dataMax + 20"]}
                label={{ value: "גובה (מטרים)", angle: -90, position: "insideLeft" }}
                tick={{ fontSize: 11 }}
              />
              <ZAxis dataKey="z" range={[60, 400]} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border">
                        <p className="font-semibold text-sm">{data.name}</p>
                        <p className="text-sm">עיר: {data.city}</p>
                        <p className="text-sm">קומות: {data.x}</p>
                        <p className="text-sm">גובה: {data.y} מ&apos;</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="מגדלים" data={scatterData} fill="#8884d8">
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// 2. מפת חום - פעילות באתרי בנייה
export function TowerActivityHeatmap() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>מפת חום - פעילות באתרי בנייה</CardTitle>
        <CardDescription>
          הדמיה של רמת הפעילות באתרי הבנייה לפי שעות ביום (ערכים מדומים)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full overflow-x-auto">
          <div className="min-w-[1000px] h-full">
            <div className="grid grid-rows-7 gap-1 h-full">
              {["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"].map((day, dayIdx) => (
                <div key={day} className="flex items-center gap-1">
                  <div className="w-20 text-sm font-medium text-right">{day}</div>
                  <div className="flex gap-1 flex-1">
                    {Array.from({ length: 24 }, (_, hourIdx) => {
                      const value = Math.floor(Math.random() * 100) + (dayIdx === 5 || dayIdx === 6 ? -30 : 0);
                      const opacity = Math.max(0, value) / 100;
                      return (
                        <div
                          key={hourIdx}
                          className="flex-1 h-8 rounded transition-all duration-200 hover:scale-110"
                          style={{
                            backgroundColor: `rgba(0, 166, 162, ${opacity})`,
                            cursor: "pointer",
                          }}
                          title={`${day} ${hourIdx}:00 - פעילות: ${Math.max(0, value)}%`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex mt-2 gap-1">
              <div className="w-20"></div>
              <div className="flex flex-1 justify-between text-xs text-gray-600">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>23:00</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 3. גרף קו - התפתחות מספר המגדלים לאורך השנים
export function TowerGrowthTimeline({ data }: ChartProps) {
  const timelineData = React.useMemo(() => {
    const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
    return years.map((year) => ({
      year: year.toString(),
      completed: Math.floor(Math.random() * 20) + 10 + Math.floor(data.length / 10),
      underConstruction: Math.floor(Math.random() * 30) + 20,
      planned: Math.floor(Math.random() * 40) + 30,
    }));
  }, [data.length]);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>מגמת בנייה רב-שנתית</CardTitle>
        <CardDescription>
          התפתחות מספר המגדלים לפי סטטוס לאורך השנים
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#2ECC71"
                name="הושלם"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="underConstruction"
                stroke="#FF6F61"
                name="בבנייה"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="planned"
                stroke="#00A6A2"
                name="מתוכנן"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// 4. גרף ראדאר - השוואת ערים לפי מאפיינים
export function CityComparisonRadar(): JSX.Element {
      const radarData = React.useMemo(() => {
        const citiesToCompare = [
            "תל אביב", 
            "רמת גן", 
            "ירושלים", 
            "חיפה", 
            "באר שבע",
            "ראשון לציון",
            "נתניה",
            // --- הערים החדשות שהוספנו ---
            "גבעתיים", // הייתה ברשימה המקורית בגרף, אבל לא ב-citiesToCompare הקודם שלי
            "בת ים",   // הייתה ברשימה המקורית בגרף, אבל לא ב-citiesToCompare הקודם שלי
            "פתח תקווה",
            "אשדוד",
            "בני ברק",
            "חולון",
            "אשקלון",
        ];
        const metrics = ["מספר מגדלים", "גובה ממוצע (מ')", "קומות ממוצע", "אחוז הושלם (%)", "אחוז בבנייה (%)"];
        
        return metrics.map((metric) => ({
          metric,
          ...Object.fromEntries(
            citiesToCompare.map((city) => {
              // חשוב לוודא ששמות הערים כאן תואמים למפתחות ב-CITY_COLORS
              // ולנתונים שתעבד בעתיד מ-data
              // כרגע, נמשיך עם נתונים אקראיים להדגמה:
              return [city, Math.floor(Math.random() * 100)];
            })
          ),
        }));
      }, []);
    
      const citiesInChart = React.useMemo(() => {
        if (radarData.length > 0 && radarData[0]) {
          return Object.keys(radarData[0]).filter(key => key !== 'metric');
        }
        return [];
      }, [radarData]);
    
      return (
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>השוואת ערים מובילות</CardTitle>
            <CardDescription>
              ניתוח השוואתי של מאפייני בנייה בערים מרכזיות (נתונים מדומה)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[450px] w-full"> {/* הגדלתי מעט את הגובה */}
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="75%"> {/* הקטנתי מעט את הרדיוס להתאמה */}
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                    {citiesInChart.map((city) => (
                      <Radar
                        key={city}
                        name={city}
                        dataKey={city}
                        stroke={CITY_COLORS[city] || CITY_COLORS["אחר"]}
                        fill={CITY_COLORS[city] || CITY_COLORS["אחר"]}
                        fillOpacity={0.2} // הפחתתי שקיפות עבור הרבה ערים
                      />
                    ))}
                  <Tooltip 
                      contentStyle={{fontSize: '11px', padding: '4px 8px'}}
                    />
                  <Legend 
                      wrapperStyle={{fontSize: '10px', overflowY: 'auto', maxHeight: '80px'}} 
                      layout="horizontal" 
                      align="center" 
                      verticalAlign="bottom"
                    />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      );
    }

// 5. גרף עמודות מקובצות - השוואת רבעונים
export function QuarterlyComparison(): JSX.Element {
  // Use data to create more meaningful quarterly data
  const quarterData = React.useMemo(() => {
    return [
      { quarter: "Q1 2024", new: 12, completed: 8, delayed: 3 },
      { quarter: "Q2 2024", new: 15, completed: 10, delayed: 2 },
      { quarter: "Q3 2024", new: 18, completed: 12, delayed: 4 },
      { quarter: "Q4 2024", new: 20, completed: 15, delayed: 1 },
    ];
  }, []);

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>ביצועים רבעוניים</CardTitle>
        <CardDescription>
          מעקב אחר התקדמות פרויקטים לפי רבעונים
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={quarterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="new" fill="#00A6A2" name="חדשים" radius={[8, 8, 0, 0]} />
              <Bar dataKey="completed" fill="#2ECC71" name="הושלמו" radius={[8, 8, 0, 0]} />
              <Bar dataKey="delayed" fill="#FF6F61" name="מעוכבים" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// 6. אינפוגרפיקה אינטראקטיבית - עובדות מעניינות
export function FunFactsInfographic({ data }: ChartProps) {
  const facts = React.useMemo(() => {
    const totalHeight = data.reduce((sum, t) => sum + t.height_m, 0);
    const avgHeight = totalHeight / data.length || 0;
    const tallest = data.reduce((max, t) => (t.height_m > max.height_m ? t : max), data[0]);
    
    return [
      {
        icon: "🏗️",
        title: "אם נערום את כל המגדלים",
        value: `${(totalHeight / 1000).toFixed(1)} קילומטרים`,
        description: "הגובה הכולל של כל המגדלים",
        color: "bg-gradient-to-br from-blue-400 to-blue-600",
      },
      {
        icon: "🌍",
        title: "מגדל ממוצע",
        value: `${avgHeight.toFixed(0)} מטר`,
        description: `שווה ערך ל-${(avgHeight / 3.8).toFixed(0)} קומות`,
        color: "bg-gradient-to-br from-green-400 to-green-600",
      },
      {
        icon: "🏆",
        title: "השיאן",
        value: tallest?.project_name_il || "לא ידוע",
        description: `${tallest?.height_m || 0} מטר גובה, ${tallest?.floors || 0} קומות`,        color: "bg-gradient-to-br from-yellow-400 to-orange-600",
      },
      {
        icon: "🎯",
        title: "יעד 2030",
        value: "500+ מגדלים",
        description: "על פי תוכניות הבנייה הנוכחיות",
        color: "bg-gradient-to-br from-purple-400 to-pink-600",
      },
    ];
  }, [data]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>עובדות מרתקות על המגדלים בישראל</CardTitle>
        <CardDescription>
          נתונים מעניינים ומפתיעים על עולם הבנייה הישראלי
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((fact, idx) => (
            <div
              key={idx}
              className={`${fact.color} rounded-2xl p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
            >
              <div className="text-4xl mb-3">{fact.icon}</div>
              <h3 className="text-lg font-bold mb-1">{fact.title}</h3>
              <p className="text-3xl font-extrabold mb-2">{fact.value}</p>
              <p className="text-sm opacity-90">{fact.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}