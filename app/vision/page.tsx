import React from "react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ContactForm } from "@/components/shared";
import { Logo } from "@/components/ui/logo";
import Image from "next/image";

const VISION_VALUES = [
  {
    icon: "🔍",
    title: "שקיפות ללא פשרות",
    description:
      "כי אמון נבנה על מידע גלוי. אצלנו הכל פתוח וברור – נתונים מלאים, סריקות 3D, תנאים הוגנים, ובלי אותיות קטנות. אתם תמיד יודעים איפה אתם עומדים.",
    bg: "bg-blue-50",
  },
  {
    icon: "💡",
    title: "חדשנות פורצת דרך",
    description:
      "אנחנו לא מחכים לעתיד, אנחנו יוצרים אותו. משלבים בינה מלאכותית מתקדמת עם חשיבה יצירתמית כדי להעניק לכם חוויית נדלן שלא הכרתם – חכמה, מהירה ומדויקת.",
    bg: "bg-green-50",
  },
  {
    icon: "✔️",
    title: "פשטות חכמה",
    description:
      "כי למה לסבך כשאפשר פשוט? הפכנו תהליכים מורכבים לקלים ונגישים, הכל דרך הוואטסאפ, בכמה קליקים. פחות כאבי ראש, יותר תוצאות.",
    bg: "bg-cyan-50",
  },
  {
    icon: "🎯",
    title: "התאמה אישית אמיתית",
    description:
      "אנחנו מבינים שכל אחד הוא עולם ומלואו. המערכת שלנו לומדת את הצרכים הייחודיים שלכם – בין אם אתם קונים, מוכרים או יזמים – ומספקת פתרונות שתפורים בדיוק למידותיכם.",
    bg: "bg-orange-50",
  },
  {
    icon: "💬",
    title: "ליווי אנושי ומקצועי",
    description:
      "מאחורי כל צ'אט וכל עסקה עומדים אנשים אמיתיים שאכפת להם. צוות המומחים שלנו כאן כדי לתמוך, לייעץ ולהבטיח שהאינטרסים שלכם נשמרים, עם יחס אישי וחם.",
    bg: "bg-teal-50",
  },
  {
    icon: "💰",
    title: "חיסכון אמיתי",
    description:
      "אנחנו מאמינים בערך הוגן. קונים נהנים משירות מלא בחינם, ומוכרים משלמים עמלה מינימלית של 0.5% בלבד – חיסכון של עשרות אלפי שקלים.",
    bg: "bg-yellow-50",
  },
];

export const metadata = {
  title: "החזון שלנו",
  description: "החזון של נדלניסט AI - להפוך את שוק הנדל\"ן לשקוף, חכם ונגיש לכל אחד."
};

export default function VisionPage() {
  return (
    <main className="flex flex-col gap-16 pb-16 bg-white text-right" dir="rtl">
      {/* Hero Section */}
      <section className="relative w-full bg-primary-10 rounded-[48px] md:rounded-[64px] overflow-hidden py-20 min-h-[20rem] max-w-[1280px] mx-auto flex items-center justify-center" aria-label="Hero">
        <Image
          src="/Skyline images/IMG_4807.jpeg"
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-poppins drop-shadow-xl">
            יוצרים את עתיד הנדלן בישראל. חכם, פשוט ושקוף.
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl">
            נמאס לכם מהקושי, העמלות וחוסר הוודאות בשוק הנדלן? גם לנו. נדלניסט AI כאן כדי להוביל מהפכה אמיתית. אנו משנים את האופן בו אתם קונים, מוכרים וחווים נדלן, באמצעות טכנולוגיית AI מתקדמת, תהליכים פשוטים ישירות מהוואטסאפ, ושקיפות מלאה. המטרה שלנו: שוק נדלן שבו כל אחד מרגיש בטוח, עם שליטה מלאה ואמון בכל שלב.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <ContactForm
              title="השאירו פרטים ונחזור אליכם"
              buttonText="שלח פרטים"
              source="vision_lead_form"
              compact={true}
              className="w-full max-w-[420px] p-4 bg-white text-dark rounded-2xl shadow-lg mx-auto mt-6"
            />
          </div>
        </div>
      </section>

    
      
      {/* Section 2: Pain & Solution */}
      <section className="relative max-w-4xl mx-auto px-4 flex flex-col gap-8 overflow-hidden rounded-3xl" style={{ minHeight: 420 }}>
        {/* Background Image and Overlay */}
        <Image
          src="/Skyline images/IMG_4807.jpeg"
          alt="Skyline view of Tel Aviv"
          fill
          className="object-cover object-center opacity-50 z-0"
          priority={false}
          quality={80}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        {/* Content */}
        <div className="relative z-20 flex flex-col gap-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center text-white drop-shadow-lg">הגיע הזמן לשנות: למה שוק הנדלן הישראלי חייב להתקדם?</h2>
          <p className="text-lg md:text-xl text-white font-bold text-center drop-shadow-lg">
            כולנו מכירים את זה: עמלות תיווך גבוהות לשני הצדדים (של 1%-2% ואף יותר) שלא תמיד מוצדקות, מודעות &apos;פיתיון&apos; שמבזבזות זמן, בלעדיות כופה וחוסר שקיפות בתהליך, תחושה שהמתווך לא תמיד בצד שלכם, וחיפושים אינסופיים בלוחות מודעות עמוסים במידע חלקי ולא רלוונטי. התוצאה? תסכול, בזבוז זמן וכסף, ותחושה של חוסר אונים.
          </p>
          <h3 className="text-2xl font-semibold text-secondary text-center mt-4 text-white drop-shadow-lg">אז איך אנחנו משנים את כללי המשחק?</h3>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <FeatureCard
              icon="🤖"
              title="טכנולוגיית AI שעובדת בשבילכם, לא ההפך"
              desc="העוזר האישי החכם שלנו מבין אתכם באמת. הוא לומד את הצרכים שלכם, שואל את השאלות הנכונות (דרך צ'אט WhatsApp טבעי!) ומציג לכם רק מה שרלוונטי – 3-5 נכסים שמתאימים בול לקונים, וחיבור לקונים רציניים ומסוננים למוכרים. לא עוד גלילה אינסופית."
            />
            <FeatureCard
              icon="✨"
              title="פשטות ונוחות מקסימלית"
              desc="כל תהליך קניית או מכירת הדירה מתנהל בקלות דרך הוואטסאפ. סיורי 3D מלאים מהספה, מידע מלא על הנכס, תיאום פגישות ושאלות בזמן אמת – הכל במקום אחד, בלי בירוקרטיה מיותרת."
            />
            <FeatureCard
              icon="🔍"
              title="שקיפות מוחלטת ואמינות"
              desc="סריקות 3D מפורטות, נתונים מלאים על הנכס והבניין, ובלי הפתעות נסתרות. אצלנו, מה שאתם רואים זה מה שאתם מקבלים. לקונים – 100% חינם וללא התחייבות. למוכרים – 0.5% עמלה בלבד, ורק בהצלחה. בלי בלעדיות כופה."
            />
            <FeatureCard
              icon="🤝"
              title="ליווי אנושי, אישי ומקצועי (אך ניטרלי)"
              desc="מאחורי הטכנולוגיה עומד צוות מומחים. מנהל עסקה אישי מלווה אתכם (קונים ומוכרים) בצורה ניטרלית והוגנת, דואג לאינטרסים שלכם ועוזר לכם לקבל את ההחלטות הנכונות עד לחתימה."
            />
          </div>
        </div>
      </section>

      {/* טופס ליד אחרי Pain & Solution */}
      <ContactForm
        title="השאירו פרטים ונחזור אליכם"
        buttonText="שלח פרטים"
        source="vision_lead_form"
        compact={true}
        className="w-full max-w-[420px] p-4 bg-white text-dark rounded-2xl shadow-lg mx-auto mt-6"
      />

      {/* Section 3: Values */}
      <section className="max-w-5xl mx-auto px-4 flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">הערכים שמובילים את המהפכה שלנו</h2>
        <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto">
          החזון שלנו להפוך את שוק הנדלן לידידותי, יעיל ושקוף יותר נשען על ערכי ליבה ברורים. אלו לא רק מילים עבורנו, אלא העקרונות שמנחים כל פעולה שלנו ומבדלים אותנו מהשוק הישן.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {VISION_VALUES.map((value) => (
            <div
              key={value.title}
              className={`rounded-2xl p-6 shadow-md flex flex-col items-center text-center ${value.bg}`}
            >
              <span className="text-4xl mb-2" aria-hidden>{value.icon}</span>
              <h3 className="text-xl font-bold text-primary mb-1">{value.title}</h3>
              <p className="text-gray-700 text-base">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* טופס ליד אחרי Values */}
      <ContactForm
        title="השאירו פרטים ונחזור אליכם"
        buttonText="שלח פרטים"
        source="vision_lead_form"
        compact={true}
        className="w-full max-w-[420px] p-4 bg-white text-dark rounded-2xl shadow-lg mx-auto mt-6"
      />

      {/* Section 4: Our Story */}
      <section className="max-w-4xl mx-auto px-4 flex flex-col gap-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center">הסיפור שלנו: מהצורך לשנות – למהפכה בנדלן</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center mt-4">
          <div className="flex-1 flex flex-col gap-4 text-lg text-gray-700">
            <p>
              כל רעיון גדול נולד מצורך אמיתי. הרעיון לנדלניסט AI נולד מתוך התסכול האישי שלנו ושל רבים אחרים מהשוק הקיים – שוק עמוס בחוסר ודאות, מידע מבלבל, עמלות גבוהות ותהליכים מיושנים. ראינו איך החלום למצוא בית או למכור נכס הופך למסע מפרך, והבנו שחייבת להיות דרך טובה יותר.
            </p>
            <p>
              החלטנו לאתגר את המוסכמות. במקום עוד לוח מודעות או סוכנות תיווך מסורתית, בנינו פלטפורמה טכנולוגית חכמה ששמה אתכם – הקונים והמוכרים – במרכז. מערכת שמקשיבה באמת, מבינה את הצרכים שלכם לעומק באמצעות AI, ומחברת אתכם להזדמנויות הנכונות, והכל בפשטות דרך הוואטסאפ.
            </p>
            <p>
              הדרך לא הייתה קצרה. למדנו, חקרנו, פיתחנו ובדקנו. שילבנו טכנולוגיה מתקדמת עם הבנה עמוקה של עולם הנדל&quot;ן וליווי אנושי אמיתי. האמנו שאפשר ליצור תהליך שקוף, הוגן, יעיל ובעיקר – כזה שמחזיר לכם את השליטה ואת השקט הנפשי.
            </p>
            <p>
              היום, נדלניסט AI היא יותר מפלטפורמה – היא תנועה. תנועה של אנשים שמאמינים שאפשר וצריך לעשות נדל&quot;ני אחרת. אנחנו כאן כדי להוביל את המהפכה הזו, להמשיך לחדש, להשתפר, ולהבטיח שכל חלום נדל&quot;ני שלכם יהפוך למציאות – בקלות, בביטחון ובחיסכון משמעותי. המסע שלנו רק התחיל, ואנחנו מזמינים אתכם להצטרף אלינו.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/Skyline images/IMG_4807.jpeg"
              alt="איור התפתחות וצמיחה של צוות"
              width={320}
              height={220}
              className="mx-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* טופס ליד אחרי Our Story */}
      <ContactForm
        title="השאירו פרטים ונחזור אליכם"
        buttonText="שלח פרטים"
        source="vision_lead_form"
        compact={true}
        className="w-full max-w-[420px] p-4 bg-white text-dark rounded-2xl shadow-lg mx-auto mt-6"
      />

      {/* Section 5: Final CTA */}
      <section className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-6 mt-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary text-center">
          מוכנים להצטרף למהפכה ולהפוך את חווית הנדל&quot;ן שלכם לפשוטה ומשתלמת?
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <ContactForm
            title="השאירו פרטים ונחזור אליכם"
            buttonText="שלח פרטים"
            source="vision_lead_form"
            compact={true}
            className="w-full max-w-[420px] p-4 bg-white text-dark rounded-2xl shadow-lg mx-auto mt-6"
          />
        </div>
        <a
          href="https://wa.me/972555555555"
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