import React from "react";
import { ContactForm } from "@/components/shared";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Logo } from "@/components/ui/logo";
import Image from "next/image";
import { Rocket, Bot, BarChart3, Clock, Key } from "lucide-react";

const ADVANTAGES = [
  {
    icon: <Rocket className="w-8 h-8 text-primary" />, // 🚀
    title: "שיווק מדויק וממוקד",
    desc: "המערכת שלנו מסננת עבורך רק את הקונים הרציניים והמתאימים, לפי הגדרות ויעדים של הפרויקט. פחות שיחות סרק, יותר עסקאות אמיתיות.",
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />, // 🤖
    title: "AI דואג למלא את הפרויקט – אוטומטית",
    desc: "לא עוד לידים 'קרים' וטלפונים לא נגמרים. האלגוריתם שלנו משדך בקלות כל דירה לקונה הנכון – ובזמן שיא.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />, // 📈
    title: "חיסכון משמעותי בעלויות שיווק",
    desc: "סוף להוצאות ענק על פרסום מיותר. תשלום רק על הצלחה – בלי בזבוזי תקציב, בלי קמפיינים מיותרים.",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />, // 🕒
    title: "תהליך שקוף ופשוט – שליטה מלאה בפרויקט",
    desc: "אתה רואה בכל רגע מי מתעניין, איפה עומד כל תהליך, ומקבל עדכונים ישירות בווטסאפ. הכל שקוף, פשוט ומדויק – בלי הפתעות בדרך.",
  },
  {
    icon: <Key className="w-8 h-8 text-primary" />, // 👐
    title: "בלי בלעדיות כובלת – שליטה נשארת אצלך",
    desc: "אתה שולט בקצב ובתהליך, בלי הסכמים מגבילים, בלי להיות תלוי במתווך אחד.",
  },
];

const TIMELINE = [
  {
    icon: "📞",
    title: "פונה אלינו – מתאר את הפרויקט והיעדים שלך.",
    desc: "משאירים פרטים בטופס, ואנחנו חוזרים אליך לשיחה ראשונית קצרה.",
  },
  {
    icon: "👨‍💼",
    title: "מקבל ליווי מקצועי מההתחלה",
    desc: "שיווק, מיתוג וייעוץ אישי בסטנדרט הגבוה בישראל – מותאם לפרויקט שלך.",
  },
  {
    icon: "🏢",
    title: "הנכסים נסרקים ב-3D ונכנסים למערכת Nadlanist AI (חינם!)",
    desc: "הצוות שלנו דואג לסריקה וצילום מקצועי, ללא עלות.",
  },
  {
    icon: "🤖",
    title: "המערכת משדכת כל דירה לקונים הרלוונטיים",
    desc: "ה-AI שלנו מוצא את הקונים המתאימים ומעדכן אותך בכל שלב.",
  },
  {
    icon: "👀",
    title: "קונים מקבלים מידע מלא ונפגשים איתך רק כשהם בשלים",
    desc: "הקונים רואים את הדירה מכל זווית, ומגיעים לפגישה רק כשהם באמת מעוניינים.",
  },
  {
    icon: "📝",
    title: "כל העסקה מתנהלת בליווי מקצועי עד לחתימה",
    desc: "אנחנו איתך עד הסוף – בקלות, במהירות, ובאפס כאב ראש.",
  },
];

/**
 * DevelopersPage - דף יזמים ראשוני
 * @returns {JSX.Element} דף יזמים ריק לפי תבנית עמודים קיימת
 */
export default function DevelopersPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-right" dir="rtl">
      {/* Hero Section */}
      <section className="relative w-full bg-primary-10 rounded-[48px] md:rounded-[64px] overflow-hidden py-20 min-h-[20rem] max-w-[1280px] mx-auto flex items-center justify-center" aria-label="Hero">
        <Image
          src="/Skyline images/1736202991557.jpeg"
          alt="Skyline view of Tel Aviv"
          fill
          className="object-cover object-center opacity-80"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-8 right-8 z-20">
          <Logo width={180} height={36} variant="white" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center text-white px-4 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-poppins drop-shadow-xl mb-4">
            יזם נדל&quot;ן? תתמקד בבנייה – אנחנו נדאג שכל הדירות יימכרו.
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl mb-6">
            נמאס מבזבוז זמן על שיווק לא ממוקד, מתווכים שלא מביאים תוצאות והוצאות ענק על לידים לא רלוונטיים?
            <br />
            נדלניסט AI עושה בשבילך את כל העבודה הקשה – ומביא אליך רק קונים רציניים, בלי כאבי ראש, בלי בזבוזי כסף ובלי הצפות בלידים סתמיים.
          </p>
          <div className="bg-white/90 text-dark rounded-2xl shadow-lg max-w-[420px] w-full mx-auto mt-6 p-6 backdrop-blur-md">
            <ContactForm
              title="רוצה להתחיל למכור חכם? השאר פרטים ונדגים איך זה עובד בפרויקט שלך!"
              source="developers_hero_form"
              buttonText="אני יזם ורוצה לשמוע עוד"
              compact={true}
            />
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-2">
          שיווק חכם, חיסכון אמיתי – תשאיר את הכאב מאחור ותתרכז במה שאתה אוהב: לפתח.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          {ADVANTAGES.map((adv, i) => (
            <FeatureCard key={adv.title} icon={adv.icon} title={adv.title} desc={adv.desc} delay={i * 0.1} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-xl mx-auto mt-2">
            <ContactForm
              title="רוצה לראות איך Nadlanist AI עובד בפרויקט שלך? השאר פרטים ונחזור אליך להדגמה אישית."
              source="developers_advantages_form"
              buttonText="אני רוצה הדגמה חכמה"
              className="shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="w-full bg-primary-10 py-16 border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-2">איך זה עובד? 6 שלבים פשוטים:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-8 mt-8 place-items-center">
            {TIMELINE.map((step) => (
              <div key={step.title} className="flex flex-col items-center w-full max-w-xs h-full">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl text-primary border-2 border-primary/30 mb-2 shadow-md">
                  {step.icon}
                </div>
                <div className="bg-white rounded-xl shadow-lg p-4 text-center w-full min-h-[140px] h-full flex flex-col items-center border border-primary/10">
                  <span className="text-lg font-bold text-primary mb-1">{step.title}</span>
                  <span className="text-base text-gray-700">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <div className="w-full max-w-xl mx-auto mt-2">
              <ContactForm
                title="רוצה לראות איך זה עובד בפרויקט שלך? השאר פרטים ונחזור אליך להדגמה אישית."
                source="developers_timeline_form"
                buttonText="אני רוצה הדגמה אישית"
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
          הצטרף עכשיו למהפכה – ותן לפרויקט שלך יתרון תחרותי אמיתי.
        </h2>
        <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl mx-auto">
          די עם שיווק שלא מביא תוצאות, עמלות ענק ולידים לא רלוונטיים. Nadlanist AI מחברת בין יזמים לקונים נכונים ביעילות, חיסכון ובשליטה מלאה שלך.
          רוצה לראות איך זה עובד בפרויקט שלך? השאר פרטים בטופס ונחזור אליך להדגמה אישית.
        </p>
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full max-w-xl mx-auto mt-2">
            <ContactForm
              title="טופס יזמים – Nadlanist AI"
              source="developers_final_form"
              buttonText="אני רוצה להתחיל למכור חכם"
              className="shadow-xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
} 