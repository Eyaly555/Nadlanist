// צור קובץ חדש: app/charts-preview/page.tsx

"use client";

import React from "react";
import {
  HeightVsFloorsScatter,
  TowerActivityHeatmap,
  TowerGrowthTimeline,
  CityComparisonRadar,
  QuarterlyComparison,
  FunFactsInfographic,
} from "@/components/ui/DashboardNewCharts";

// נתוני דמו לתצוגה מקדימה
const DEMO_DATA = [
  {
    id: 1,
    project_name_il: "מגדל עזריאלי שרונה",
    effective_city: "תל אביב",
    height_m: 238,
    floors: 61,
    tower_status: "הושלם",
    full_address: "דרך השרון 121",
    project_status: "הושלם",
    num_towers: 1,
    project_description: "מגדל משרדים יוקרתי",
  },
  {
    id: 2,
    project_name_il: "מגדל משה אביב",
    effective_city: "רמת גן",
    height_m: 235,
    floors: 68,
    tower_status: "בבנייה",
    full_address: "ז'בוטינסקי 7",
    project_status: "בבנייה",
    num_towers: 1,
    project_description: "מגדל מגורים",
  },
  {
    id: 3,
    project_name_il: "פארק צמרת",
    effective_city: "תל אביב",
    height_m: 198,
    floors: 50,
    tower_status: "בתכנון",
    full_address: "יגאל אלון 96",
    project_status: "בתכנון",
    num_towers: 2,
    project_description: "פרויקט מגורים יוקרתי",
  },
  {
    id: 4,
    project_name_il: "מגדל הארבעה",
    effective_city: "תל אביב",
    height_m: 182,
    floors: 42,
    tower_status: "הושלם",
    full_address: "הארבעה 28",
    project_status: "הושלם",
    num_towers: 1,
    project_description: "מגדל משרדים",
  },
  {
    id: 5,
    project_name_il: "מגדל אלקטרה",
    effective_city: "תל אביב",
    height_m: 188,
    floors: 45,
    tower_status: "הושלם",
    full_address: "יגאל אלון 98",
    project_status: "הושלם",
    num_towers: 1,
    project_description: "מגדל משרדים",
  },
  {
    id: 6,
    project_name_il: "BSR סיטי",
    effective_city: "בת ים",
    height_m: 160,
    floors: 40,
    tower_status: "בבנייה",
    full_address: "יוספטל 2",
    project_status: "בבנייה",
    num_towers: 3,
    project_description: "מתחם מגורים",
  },
  {
    id: 7,
    project_name_il: "מגדל רוטשילד",
    effective_city: "תל אביב",
    height_m: 190,
    floors: 46,
    tower_status: "הושלם",
    full_address: "רוטשילד 22",
    project_status: "הושלם",
    num_towers: 1,
    project_description: "מגדל מגורים יוקרתי",
  },
  {
    id: 8,
    project_name_il: "מגדלי אלון",
    effective_city: "רמת גן",
    height_m: 175,
    floors: 44,
    tower_status: "בבנייה",
    full_address: "ביאליק 12",
    project_status: "בבנייה",
    num_towers: 2,
    project_description: "פרויקט מגורים",
  },
  {
    id: 9,
    project_name_il: "ONE TOWER",
    effective_city: "תל אביב",
    height_m: 340,
    floors: 83,
    tower_status: "בתכנון",
    full_address: "הרכבת 1",
    project_status: "בתכנון",
    num_towers: 1,
    project_description: "המגדל הגבוה בישראל",
  },
  {
    id: 10,
    project_name_il: "מגדלי גינדי",
    effective_city: "גבעתיים",
    height_m: 150,
    floors: 38,
    tower_status: "בבנייה",
    full_address: "כורזין 1",
    project_status: "בבנייה",
    num_towers: 2,
    project_description: "מתחם מגורים ומסחר",
  },
];

export default function ChartsPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-screen-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            תצוגה מקדימה - גרפים חדשים לדשבורד
          </h1>
          <p className="text-lg text-muted-foreground">
            6 רכיבים גרפיים אינטראקטיביים לעמוד הדשבורד
          </p>
        </div>

        {/* Chart 1: Fun Facts Infographic */}
        <div className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">1. אינפוגרפיקה - עובדות מרתקות</h2>
            <p className="text-gray-600">כרטיסיות אינטראקטיביות עם מידע מעניין</p>
          </div>
          <FunFactsInfographic data={DEMO_DATA} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Chart 2: Scatter Plot */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">2. גרף פיזור - יחס גובה לקומות</h2>
              <p className="text-gray-600">השוואה בין מספר הקומות לגובה המגדל</p>
            </div>
            <HeightVsFloorsScatter data={DEMO_DATA} />
          </div>

          {/* Chart 3: City Radar */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">3. גרף ראדאר - השוואת ערים</h2>
              <p className="text-gray-600">ניתוח השוואתי של מאפייני בנייה</p>
            </div>
            <CityComparisonRadar />
          </div>

          {/* Chart 4: Timeline */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">4. גרף קו - מגמת בנייה רב-שנתית</h2>
              <p className="text-gray-600">התפתחות מספר המגדלים לאורך השנים</p>
            </div>
            <TowerGrowthTimeline data={DEMO_DATA} />
          </div>

          {/* Chart 5: Quarterly Comparison */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800">5. גרף עמודות - ביצועים רבעוניים</h2>
              <p className="text-gray-600">מעקב אחר התקדמות פרויקטים</p>
            </div>
            <QuarterlyComparison />
          </div>
        </div>

        {/* Chart 6: Heatmap */}
        <div className="mb-12">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800">6. מפת חום - פעילות באתרי בנייה</h2>
            <p className="text-gray-600">הדמיה של רמת הפעילות לפי שעות ביום</p>
          </div>
          <TowerActivityHeatmap />
        </div>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">תכונות הגרפים</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-semibold mb-1">רספונסיביות מלאה</h3>
                <p className="text-gray-600 text-sm">מותאם למובייל, טאבלט ודסקטופ</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h3 className="font-semibold mb-1">אנימציות חלקות</h3>
                <p className="text-gray-600 text-sm">Hover effects ו-transitions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <h3 className="font-semibold mb-1">עיצוב עקבי</h3>
                <p className="text-gray-600 text-sm">פלטת צבעים תואמת למותג</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🖱️</span>
              <div>
                <h3 className="font-semibold mb-1">אינטראקטיביות</h3>
                <p className="text-gray-600 text-sm">Tooltips ו-legends דינמיים</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">♿</span>
              <div>
                <h3 className="font-semibold mb-1">נגישות</h3>
                <p className="text-gray-600 text-sm">תמיכה ב-RTL וגדלי פונט מותאמים</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold mb-1">ביצועים</h3>
                <p className="text-gray-600 text-sm">אופטימיזציה לטעינה מהירה</p>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="bg-primary/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">איך לשלב בדשבורד?</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>צור קובץ <code className="bg-white px-2 py-1 rounded">components/ui/DashboardNewCharts.tsx</code></li>
            <li>העתק את קוד הרכיבים מה-artifact הראשון</li>
            <li>הוסף את האימפורטים והרכיבים לקובץ <code className="bg-white px-2 py-1 rounded">dashboard-client.tsx</code></li>
            <li>התאם את הנתונים לפי הצורך (כרגע משתמשים בנתוני דמו)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// Metadata צריך להיות בקובץ נפרד או להשתמש ב-generateMetadata