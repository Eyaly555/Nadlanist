import React from "react";
import { ContactForm } from "@/components/shared";
import { FeatureCard } from "@/components/ui/FeatureCard";
import Image from "next/image";

const ADVANTAGES = [
  {
    icon: "🎯",
    title: "AI מדויק שעובד בשבילכם",
    desc: "ה-AI שלנו לומד אתכם ברגע, ומציג רק נכסים שמדברים אליכם – לא לעוד מישהו. פחות גלילה, יותר תוצאות בול.",
  },
  {
    icon: "⏱️",
    title: "הזמן שלכם שווה זהב",
    desc: "כל השיחה, כל ההתאמות והסיורים – בצ'אט אחד בוואטסאפ. אין פגישות מיותרות, אין לחצים. הכל בזמן שלכם.",
  },
  {
    icon: "🔍",
    title: "שקיפות – סוף סוף!",
    desc: "מה שרואים זה מה שמקבלים: סיורי 3D אמיתיים, כל הנתונים – בלי אותיות קטנות, בלי הפתעות.",
  },
  {
    icon: "💰",
    title: "0 ש'ח עמלה – ברצינות.",
    desc: "החיפוש, הליווי, הטכנולוגיה – הכל חינם לקונים. אצלנו לא תשלמו שקל על השירות.",
  },
  {
    icon: "🤝",
    title: "ליווי אמיתי, לא בוט.",
    desc: "צוות אמיתי ילווה אתכם, יענה לכל שאלה, וידאג שתרגישו בטוחים בדרך לבית החדש.",
  },
  {
    icon: "📱",
    title: "הכל מהנייד – בלי אפליקציה",
    desc: "לא צריך להוריד כלום, לא להירשם ולא לזכור סיסמאות. כל התהליך – מהשיחה הראשונה ועד למציאת הבית – מתבצע ישירות בוואטסאפ, מתי שנוח לכם.",
  },
];

const TIMELINE = [
  {
    icon: "📝",
    title: "הגידו לנו מה אתם מחפשים",
    desc: "שלחו הודעה בוואטסאפ או מלאו שאלון קצר. לא מסבכים אתכם – אתם מדברים, אנחנו מקשיבים.",
  },
  {
    icon: "🤖",
    title: "ה-AI שלנו מזהה בול מה מתאים",
    desc: "לא צריך לחכות ימים – תקבלו רשימת נכסים שמתאימים בדיוק לכם, בלי להציף.",
  },
  {
    icon: "��",
    title: "סיורים וירטואליים אמיתיים",
    desc: "נכנסים לכל נכס בסיור 3D ישירות מהספה. בודקים, מתרשמים, מתאהבים – מרחוק.",
  },
  {
    icon: "💬",
    title: "כל שאלה? תשובה בצ'אט",
    desc: "לא נישארים בלי מענה – עונים מיד, שולחים תמונות, סרטונים, כל מה שצריך.",
  },
  {
    icon: "🔑",
    title: "מצאתם נכס שמדבר אליכם?",
    desc: "קובעים ביקור אמיתי, פוגשים נציג מקצועי של נדלניסט, ודואגים לכם – אובייקטיבית וללא לחץ.",
  },
  {
    icon: "🎉",
    title: "החלטתם? סוגרים דירה – בקלות",
    desc: "מנהל עסקה מטפל בכל הבירוקרטיה עד לחתימה – והכל, שוב, חינם לגמרי עבורכם.",
  },
];

/**
 * BuyersPage - דף קונים ראשוני
 * @returns {JSX.Element} דף קונים ריק לפי תבנית עמודים קיימת
 */
export default function BuyersPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-right items-center justify-center" dir="rtl">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center gap-8 py-16 px-4 bg-primary-10 overflow-hidden border-b border-primary/10">
        <div className="flex flex-col items-center text-center z-10 w-full max-w-2xl mx-auto font-sans">
          <h1 className="text-4xl md:text-5xl text-primary mb-4 leading-tight font-sans">
            הדירה הבאה שלך – חכם, אישי וללא עמלה
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-6 max-w-xl mx-auto font-sans">
            נמאס ממרוץ הדירות? אצלנו תמצאו את הבית הבא שלכם, בקלות שלא הכרתם: <b className="text-primary">נדלניסט AI</b> הופכת את החיפוש לסופר-חכם, מהיר ונטול עמלות. בלי מתווכים שלוחצים, בלי לוחות מבלבלים, ובלי לבזבז ימים על דירות שלא מתאימות. כאן, השאלות שואלים אתכם, לא להפך – ובתוך דקות, תמצאו את מה שתמיד רציתם – דרך וואטסאפ.
            <br />
            <span>החיפוש – עלינו. הבחירה – בידיים שלכם.</span>
          </p>
          {/* WhatsApp Button - Large, Centered, Clickable, Icon Only */}
          <a
            href={`https://api.whatsapp.com/send?phone=972542171198&text=${encodeURIComponent('הסוכן החכם שלנו יישלח לכם הודעה תוך שניות')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full bg-green-500 shadow-lg hover:bg-green-600 transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
            style={{ width: 80, height: 80 }}
            aria-label="צ'אט וואטסאפ עם נדלניסט"
          >
            <svg width="48" height="48" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="36" cy="36" r="36" fill="#25D366"/>
              <path d="M36 16C25.523 16 17 24.523 17 35c0 4.418 1.438 8.504 3.889 11.889L18 56l9.389-2.889C30.496 54.562 33.188 55 36 55c10.477 0 19-8.523 19-19S46.477 16 36 16zm0 35c-2.547 0-5.031-.496-7.34-1.473l-.523-.211-5.582 1.719 1.719-5.582-.211-.523C19.496 40.031 19 37.547 19 35c0-9.374 7.626-17 17-17s17 7.626 17 17-7.626 17-17 17zm8.477-12.242c-.117-.195-.43-.312-.902-.547-.473-.234-2.797-1.379-3.23-1.535-.434-.156-.75-.234-1.066.234-.312.469-1.223 1.535-1.5 1.848-.273.312-.547.352-1.02.117-.469-.234-1.984-.73-3.78-2.324-1.398-1.25-2.344-2.797-2.617-3.266-.273-.469-.029-.723.205-.957.211-.211.469-.547.703-.82.234-.273.312-.469.469-.781.156-.312.078-.586-.039-.82-.117-.234-1.066-2.578-1.461-3.543-.383-.922-.773-.797-1.066-.812-.273-.016-.586-.02-.898-.02-.312 0-.82.117-1.25.586-.43.469-1.641 1.602-1.641 3.906 0 2.305 1.68 4.531 1.914 4.844.234.312 3.305 5.047 8.008 6.875 1.121.391 1.996.625 2.68.801 1.125.281 2.148.242 2.953.148.902-.102 2.797-1.141 3.195-2.242.398-1.102.398-2.047.281-2.242z" fill="#fff"/>
            </svg>
          </a>
          {/* Main CTA Button */}
          {/* Contact Form - Directly under the buttons */}
          <div className="w-full max-w-xl mx-auto mt-2">
            <ContactForm
              title="השאירו פרטים – נמצא לכם את הבית המושלם!"
              source="buyers_full_form"
              buttonText="מצאו לי את הבית המושלם – בחינם!"
              className="shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Tips Row */}
      <div className="w-full bg-primary-100 py-3 border-b border-primary/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center text-primary font-bold text-lg">
          <span>שירות חינם</span>
          <span className="hidden md:inline">–</span>
          <span>ליווי אמיתי</span>
          <span className="hidden md:inline">–</span>
          <span>חיסכון בזמן</span>
        </div>
      </div>

      {/* Advantages Section */}
      <section className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-2">נמאס לחפש? בואו תראו איך מוצאים – באמת!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
          {ADVANTAGES.map((adv, i) => (
            <FeatureCard key={adv.title} icon={adv.icon} title={adv.title} desc={adv.desc} delay={i * 0.1} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-xl mx-auto mt-2">
            <ContactForm
              title="השאירו פרטים – נציג יחזור אליכם עם חיפוש חכם!"
              source="buyers_advantages_form"
              buttonText="אני רוצה לנסות חיפוש חכם!"
              className="shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="w-full bg-primary-10 py-16 border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-2">פשוט. מהיר. ברור – איך זה עובד?</h2>
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
                title="השאירו פרטים – נתחיל את הדרך לבית החדש!"
                source="buyers_timeline_form"
                buttonText="מתחילים את הדרך לבית החדש – בקליק!"
                className="shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
          די לחיפושים, תתחילו לחיות! הבית הבא שלכם מחכה פה.
        </h2>
        <p className="text-lg md:text-xl text-gray-700 text-center max-w-2xl mx-auto">
          מספיק לשבור את הראש על חיפושים אין־סופיים. <b className="text-primary">נדלניסט AI</b> מביא לכם שירות חכם, שקוף וחינמי – שמפנה לכם זמן לדברים שבאמת חשובים. הצטרפו לעשרות קונים שכבר מצאו בית מושלם (וחסכו עמלות וכאבי לב). זה הזמן להתחיל חיפוש חדשני – ולגלות כמה זה קל כשיש לכם את האנשים והכלים הנכונים לצידכם.
        </p>
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full max-w-xl mx-auto mt-2">
            <ContactForm
              title="השאירו פרטים – דירת החלומות בדרך אליכם!"
              source="buyers_final_form"
              buttonText="התחילו עכשיו – דירת החלומות במרחק צ'אט!"
              className="shadow-xl"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Image src="/General images/two-happy-excited-fan-friends-euphoria-mood-after-winning-bet-with-smartphone-hand.jpg" alt="קונים שמחים מחזיקים מפתח" width={64} height={64} className="rounded-full border-2 border-primary/20" loading="lazy" />
            <span className="text-primary font-bold text-lg">הצטרפו למהפכת הקנייה החכמה</span>
          </div>
        </div>
        <a
          href={`https://api.whatsapp.com/send?phone=972542171198&text=${encodeURIComponent('הסוכן החכם שלנו יישלח לכם הודעה תוך שניות')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline text-lg mt-2"
        >
          או דברו איתנו ישירות בוואטסאפ
        </a>
      </section>
    </main>
  );
}

export const metadata = {
  title: "הדירה הבאה שלך – חכם, אישי וללא עמלה",
  description: "גלו 3–5 התאמות נכסים מדויקות בזמן אמת עם AI – ללא עמלת תיווך. ההזדמנות הדיגיטלית לקניית דירה שטובה בדיוק לכם.",
  alternates: {
    canonical: 'https://www.nadlanist.ai/buyers',
  },
}; 