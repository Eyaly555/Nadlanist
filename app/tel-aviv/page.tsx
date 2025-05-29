import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Home, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/shared";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "נדל״ן בתל אביב | מתווך בתל אביב - נדלניסט AI",
  description: "תיווך נדל״ן בתל אביב ללא עמלה לקונים! סקירת שכונות, מחירים עדכניים ומידע על פרויקטים חדשים. מתווך מקצועי עם טכנולוגיית AI.",
  keywords: [
    "נדלן תל אביב",
    "דירות למכירה בתל אביב",
    "מתווך בתל אביב",
    "תיווך בתל אביב",
    "שכונות תל אביב",
    "נדלן צפון תל אביב",
    "דירות בתל אביב"
  ],
  alternates: {
    canonical: 'https://www.nadlanist.ai/tel-aviv',
  },
};

const neighborhoods = [
  {
    name: "צפון תל אביב",
    slug: "north-tel-aviv",
    description: "אזור מבוקש עם דירות מרווחות, פארקים ובתי ספר מעולים",
    avgPrice: "4.5-7 מיליון ₪",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    name: "מרכז תל אביב",
    slug: "center-tel-aviv",
    description: "לב העיר התוסס - קרוב לכל מה שחשוב",
    avgPrice: "3-5 מיליון ₪",
    icon: <Home className="w-6 h-6" />
  },
  {
    name: "יפו העתיקה",
    slug: "old-jaffa",
    description: "שילוב של היסטוריה, תרבות ונוף ים מדהים",
    avgPrice: "3.5-6 מיליון ₪",
    icon: <MapPin className="w-6 h-6" />
  },
  {
    name: "פלורנטין",
    slug: "florentin",
    description: "השכונה הצעירה והאמנותית של תל אביב",
    avgPrice: "2.5-4 מיליון ₪",
    icon: <Users className="w-6 h-6" />
  },
  {
    name: "נווה צדק",
    slug: "neve-tzedek",
    description: "השכונה הראשונה מחוץ ליפו - קסם של פעם",
    avgPrice: "4-8 מיליון ₪",
    icon: <Home className="w-6 h-6" />
  },
  {
    name: "הטיילת",
    slug: "beach-area",
    description: "דירות עם נוף לים ואווירת נופש כל השנה",
    avgPrice: "5-12 מיליון ₪",
    icon: <MapPin className="w-6 h-6" />
  }
];

export default function TelAvivPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white" dir="rtl">
      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumbs 
          items={[
            { label: "בית", href: "/" },
            { label: "נדל״ן בתל אביב" }
          ]} 
        />
      </div>

      {/* Hero Section */}
      <section className="bg-primary-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            נדל״ן בתל אביב - תיווך חכם עם נדלניסט AI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            מחפשים דירה בתל אביב? נדלניסט AI מציעה שירות תיווך מהפכני - 
            <span className="font-bold"> 0% עמלה לקונים</span> ורק 0.5% למוכרים. 
            גלו את כל השכונות, המחירים העדכניים והפרויקטים החדשים בעיר שלא ישנה לעולם.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">0%</div>
              <div className="text-sm text-gray-600">עמלה לקונים</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-gray-600">זמינות בWhatsApp</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">3D</div>
              <div className="text-sm text-gray-600">סריקות לכל נכס</div>
            </div>
            <div className="bg-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">AI</div>
              <div className="text-sm text-gray-600">התאמה חכמה</div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          שכונות תל אביב - מצאו את הבית המושלם
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {neighborhoods.map((neighborhood) => (
            <Card key={neighborhood.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {neighborhood.icon}
                  <span>{neighborhood.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">{neighborhood.description}</p>
                <p className="text-sm font-semibold text-primary">
                  טווח מחירים: {neighborhood.avgPrice}
                </p>
                <Link 
                  href={`/tel-aviv/${neighborhood.slug}`}
                  className="inline-block mt-4 text-primary hover:underline"
                >
                  למידע נוסף על {neighborhood.name} ←
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Form */}
        <div className="bg-primary-10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-4 text-center">
            מחפשים דירה בתל אביב? נמצא לכם בדיוק מה שצריך
          </h3>
          <div className="max-w-xl mx-auto">
            <ContactForm
              title="ספרו לנו מה אתם מחפשים ונחזור אליכם עם הצעות מותאמות"
              source="tel_aviv_page"
              buttonText="מצאו לי דירה בתל אביב"
              compact={true}
            />
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-2xl font-bold text-primary mb-6">
            למה לבחור בנדלניסט AI לקניית דירה בתל אביב?
          </h2>
          
          <p>
            תל אביב היא העיר הכי מבוקשת בישראל, ומציאת דירה בה יכולה להיות אתגר. 
            עם נדלניסט AI, התהליך הופך לפשוט ונוח יותר מתמיד. הטכנולוגיה החכמה שלנו 
            סורקת את כל ההיצע בעיר ומתאימה לכם רק את הנכסים שעונים בדיוק על הדרישות שלכם.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">היתרונות שלנו:</h3>
          <ul>
            <li><strong>חיסכון משמעותי:</strong> 0% עמלת תיווך לקונים - חסכו עשרות אלפי שקלים</li>
            <li><strong>טכנולוגיה מתקדמת:</strong> סריקות 3D מאפשרות לכם לסייר בנכסים מהבית</li>
            <li><strong>זמינות מלאה:</strong> צ׳אט WhatsApp 24/7 עם מענה מהיר לכל שאלה</li>
            <li><strong>ליווי מקצועי:</strong> מנהל עסקה אישי מלווה אתכם עד החתימה</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-3">מגמות בשוק הנדל״ן בתל אביב 2025</h3>
          <p>
            שוק הנדל״ן בתל אביב ממשיך להיות דינמי ומבוקש. הביקוש הגבוה לדירות בעיר, 
            במיוחד באזורים כמו צפון תל אביב והטיילת, ממשיך להוביל את המחירים. 
            פרויקטים חדשים של התחדשות עירונית מציעים הזדמנויות מעניינות, 
            בעוד ששכונות כמו פלורנטין וקרית שלום הופכות למוקדי משיכה לזוגות צעירים.
          </p>
        </div>
      </section>
    </main>
  );
} 