import React from "react";
import { ContactForm } from "@/components/shared";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Logo } from "@/components/ui/logo";
import Image from "next/image";
import { Camera, Lock, DollarSign, Clock, Briefcase, Target } from "lucide-react";

const ADVANTAGES = [
  {
    icon: <Target className="w-8 h-8 text-primary" />, // 🎯
    title: "קונים שבאמת מתאימים",
    desc: "ה-AI שלנו מזהה מי באמת מחפש נכס כמו שלכם – לא עוד בזבוז זמן על מתעניינים 'רק סקרנים'.",
  },
  {
    icon: <Camera className="w-8 h-8 text-primary" />, // 📸
    title: "הנכס מצטלם ונמכר טוב יותר",
    desc: "צוות הסריקה שלנו ידאג שהדירה שלכם תיראה הכי טוב בשוק, בסריקת 3D וצילומים מקצועיים – הכל על חשבוננו.",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-primary" />, // 💰
    title: "תשלום הוגן ושקוף – רק 0.5% עמלה",
    desc: "אין הפתעות, אין עמלות כפולות. מוכרים? משלמים חצי אחוז בלבד – רק אם נמכר. יותר כסף נשאר אצלכם.",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />, // ⏳
    title: "תהליך מהיר ויעיל",
    desc: "שיווק ממוקד וחדשני שמביא קונים מתאימים מהר, עם פחות ביקורים מיותרים ופחות המתנה.",
  },
  {
    icon: <Lock className="w-8 h-8 text-primary" />, // 🔒
    title: "שליטה ושקיפות – אתם במרכז",
    desc: "כל רגע בתהליך שקוף לכם, בלי בלעדיות מגבילה ובלי חוזים מעיקים. אתם מחליטים, אנחנו מבצעים.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />, // 🤝
    title: "ליווי מקצועי אמיתי",
    desc: "מנהל עסקה אישי מלווה אתכם, מטפל בכל משא ומתן ומוודא שתמכרו בראש שקט ובמקסימום ערך.",
  },
];

const TIMELINE = [
  {
    icon: "📝",
    title: "משאירים פרטים – אנחנו חוזרים אליכם מיד",
    desc: "בטופס כאן למטה (או בווטסאפ), ממלאים רק מה שצריך.",
  },
  {
    icon: "📸",
    title: "הצוות שלנו מגיע אליכם לסריקת 3D וצילום מקצועי",
    desc: "חינם, בלי התחייבות. הנכס שלכם מוצג כמו שצריך, כבר מההתחלה.",
  },
  {
    icon: "🤖",
    title: "ה-AI שלנו מאתר קונים רציניים בלבד",
    desc: "לא תבזבזו זמן על סיורים מיותרים – רק קונים מתאימים באמת מקבלים הצעה.",
  },
  {
    icon: "📅",
    title: "אנחנו מתאמים את כל הביקורים, עונים לכל שאלה",
    desc: "הכל מתנהל בשבילכם, אתם רק מקבלים עדכונים שוטפים.",
  },
  {
    icon: "🤝",
    title: "ליווי מקצועי בניהול משא ומתן עד לחתימה",
    desc: "מנהל עסקה אישי שלכם מוביל את העסקה, דואג לתנאים הכי טובים.",
  },
  {
    icon: "🎉",
    title: "מכרתם? אתם משלמים 0.5% בלבד – זהו, סיימתם!",
    desc: "רק אחרי שהעסקה נסגרה. פשוט, הוגן ושקוף.",
  },
];

/**
 * SellersPage - דף מוכרים ראשוני
 * @returns {JSX.Element} דף מוכרים ריק לפי תבנית עמודים קיימת
 */
export default function SellersPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-right" dir="rtl">
      {/* Hero Section */}
      <section className="relative w-full bg-primary-10 rounded-[48px] md:rounded-[64px] overflow-hidden py-20 min-h-[20rem] max-w-[1280px] mx-auto flex items-center justify-center" aria-label="Hero">
        <Image
          src="/Skyline images/IMG_7468.jpeg"
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
            מוכרים נכס? תנו ל-AI ולמומחים שלנו לדאוג שיימכר – מהר, חכם, וברווח מקסימלי!
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl mb-6">
            נמאס מהבטחות ריקות, עמלות גבוהות ומתעניינים לא רציניים? עם Nadlanist AI, תהליך המכירה הופך לחוויה חדשה:
            <br />
            <span className="block mt-2">AI מתקדם חושף את הנכס רק לקונים אמיתיים שמחפשים בדיוק מה שיש לכם.</span>
            <span className="block">סריקת 3D מקצועית מציגה את הבית שלכם באופן שמוכר – עוד לפני הביקור.</span>
            <span className="block">0.5% עמלה בלבד, ורק אחרי שהעסקה נסגרה.</span>
            <span className="block">שקיפות מלאה וליווי אישי מהשלב הראשון ועד לסגירה.</span>
          </p>
          <div className="bg-white/90 text-dark rounded-2xl shadow-lg max-w-[420px] w-full mx-auto mt-6 p-6 backdrop-blur-md">
            <ContactForm
              title="הכניסו את הפרטים כאן ונתחיל למצוא קונים אמיתיים כבר היום!"
              source="sellers_hero_form"
              buttonText="תחזרו אליי עם תוכנית מכירה חכמה"
              compact={true}
            />
            <p className="text-xs text-gray-700 mt-2 text-center">אנחנו שומרים על הפרטיות שלכם. לא נעביר את הפרטים לגורמים אחרים.</p>
          </div>
        </div>
      </section>

      {/* Highlights Row */}
      <div className="w-full bg-primary-100 py-3 border-b border-primary/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center text-primary font-bold text-lg">
          <span>0.5% עמלה בלבד</span>
          <span className="hidden md:inline">–</span>
          <span>AI מתקדם</span>
          <span className="hidden md:inline">–</span>
          <span>ליווי אישי עד הסגירה</span>
        </div>
      </div>

      {/* Advantages Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-2">מכירה בלי כאב ראש, בלי בזבוז זמן, ובלי לשלם מיותר!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          {ADVANTAGES.map((adv) => (
            <FeatureCard key={adv.title} icon={adv.icon} title={adv.title} desc={adv.desc} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-xl mx-auto mt-2">
            <ContactForm
              title="רוצים לדעת כמה שווה הנכס שלכם ואיך אפשר למכור אותו מהר?"
              source="sellers_advantages_form"
              buttonText="אני רוצה הערכת שווי ומכירה חכמה"
              className="shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="w-full bg-primary-10 py-16 border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-2">תהליך מכירה פשוט, מהיר – וללא כאבי ראש</h2>
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
                title="רוצים שנלווה אתכם כל הדרך למכירה מהירה ומוצלחת?"
                source="sellers_timeline_form"
                buttonText="אני רוצה ליווי אישי למכירה"
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
          יש דרך הרבה יותר טובה למכור – ומתחילים אותה פה.
        </h2>
        <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl mx-auto">
          אל תפספסו עוד קונים, אל תשלמו עמלות מיותרות ואל תישארו לבד מול שוק עייף. Nadlanist AI דואג לכם – עם טכנולוגיה שמוכרת, ליווי אנושי ותהליך סופר-חכם, מהיר ושקוף.
          השאירו פרטים בטופס כאן למטה ונתחיל להראות לכם איך באמת מוכרים נכס היום!
        </p>
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full max-w-xl mx-auto mt-2">
            <ContactForm
              title="השאירו פרטים – נחזור אליכם עם תוכנית מכירה חכמה!"
              source="sellers_final_form"
              buttonText="תחזרו אליי עם תוכנית מכירה חכמה"
              className="shadow-xl"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Image src="/General images/family-showcasing-their-home.jpg" alt="מוכרים שמחים" width={64} height={64} className="rounded-full border-2 border-primary/20" />
            <span className="text-primary font-bold text-lg">הצטרפו למהפכת המכירה החכמה</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: "מוכרים ",
  description: "מכרו את הנכס שלכם מהר ובשקיפות עם נדלניסט AI - ליווי מקצועי, סריקת 3D ועמלה מינימלית."
}; 