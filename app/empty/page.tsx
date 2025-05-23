import { NadlanistMap } from "@/components/ui/NadlanistMap"; // הוספת ייבוא זה

/**
 * עמוד עם כותרת עליונה, תחתונה, ומפת פרויקטים
 * @returns {JSX.Element} עמוד עם מפה (Header + Map + Footer)
 */
export default function EmptyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      <main className="flex-1 flex flex-col items-center p-4"> {/* עדכון: הוספת flex-col ו-padding לדוגמה */}
        <h1 className="text-2xl font-bold mb-4">מפת פרויקטים</h1> {/* הוספת הכותרת */}
        <NadlanistMap /> {/* הוספת רכיב המפה */}
      </main>
    </div>
  );
}