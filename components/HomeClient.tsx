"use client";
import { HeroSection } from "@/components/ui/HeroSection";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/shared";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { PainSolutionCards } from "@/components/ui/PainSolutionCards";
import { Home as HomeIcon, MessageCircle, Target, Camera, UserCheck, Lock, Briefcase, DollarSign, Clock, Eye } from "lucide-react";
import Link from "next/link";

const painSolutions = [
  {
    pain: "עמלות תיווך גבוהות של 1%-2% (ולעיתים יותר) גם לקונים וגם למוכרים, שלרוב לא מצדיקות את התמורה.",
    solution: "מהפכה בעלויות! קונים לא משלמים עמלה כלל (0 ₪), ומוכרים משלמים עמלה סופר-נמוכה של 0.5% בלבד, ורק בהצלחה.  זה אומר יותר כסף שנשאר אצלכם בכיס."
  },
  {
    pain: "חיפושים מייגעים, מודעות לא רלוונטיות, תיאומים מסורבלים ונסיעות מיותרות.",
    solution: "מערכת AI חכמה שמבינה בדיוק מה אתם צריכים ומציגה לכם רק נכסים שתפורים עליכם (3-5 הצעות ממוקדות לקונים).  כל התהליך – מהחיפוש ועד התיאום – מתנהל בנוחות ובמהירות דרך הוואטסאפ שלכם."
  },
  {
    pain: "מודעות 'פיתיון', מידע חלקי או מטעה, וחוסר יכולת לבחון נכס כמו שצריך לפני שמבזבזים זמן על ביקור.",
    solution: "סריקות תלת-ממד (3D) מפורטות שמאפשרות לכם 'לטייל' בנכס מהספה, נתונים מלאים על מצב הנכס והבניין, והתחייבות למידע אמין ומדויק.  אצלנו אין אותיות קטנות."
  },
  {
    pain: "תחושת לחץ מסוכנים, חוזי בלעדיות שכובלים אתכם, ותהליך שלא באמת מותאם לצרכים האישיים שלכם.",
    solution: "תהליך דיגיטלי פתוח, ללא חוזי בלעדיות כופים.  הבינה המלאכותית שלנו לומדת אתכם  כדי להתאים את ההצעות והשירות בדיוק בשבילכם, ואתם מקבלים את ההחלטות בקצב שלכם."
  },
  {
    pain: "חוסר ודאות, חשש מטעויות יקרות, ותחושה שאין מישהו ניטרלי שבאמת דואג לאינטרס שלכם.",
    solution: "מנהל עסקה אישי, מומחה נדל׳ן ניטרלי, שמלווה אתכם (קונים ומוכרים) בכל שלב – מייעוץ ראשוני, דרך המשא ומתן ועד לחתימה.  הוא כאן כדי לענות על כל שאלה, להבטיח שהכל מתנהל בצורה חלקה ולהעניק לכם שקט נפשי."
  },
];

const buyersFeatures = [
  { icon: <MessageCircle className="w-6 h-6" />, title: "שיחת WhatsApp טבעית", desc: "פשוט כתבו לנו מה אתם מחפשים" },
  { icon: <Target className="w-6 h-6" />, title: "התאמה מיידית", desc: "3-5 נכסים שמתאימים בול" },
  { icon: <HomeIcon className="w-6 h-6" />, title: "סיור 3D מלא מהספה", desc: "בלי נסיעות מיותרות" },
  { icon: <Eye className="w-6 h-6" />, title: "שאלות בזמן-אמת", desc: 'מה שטח המרפסת? תקבלו תשובה מיד' },
  { icon: <DollarSign className="w-6 h-6" />, title: "שירות 100% חינם", desc: "ללא עמלות לקונים" },
  { icon: <Clock className="w-6 h-6" />, title: "חסכון בזמן", desc: "התהליך כולו ב-WhatsApp" },
];

const sellersFeatures = [
  { icon: <Camera className="w-6 h-6" />, title: "סריקת 3D חינם", desc: "סט תמונות פרימיום ללא עלות" },
  { icon: <UserCheck className="w-6 h-6" />, title: "קונים מסוננים ב-AI", desc: "רק רציניים ומתאימים" },
  { icon: <Lock className="w-6 h-6" />, title: "פרטיות מלאה", desc: "הנכס נחשף רק למתאימים" },
  { icon: <Briefcase className="w-6 h-6" />, title: "ליווי מנהל עסקה", desc: "ניטרלי עד חוזה" },
  { icon: <DollarSign className="w-6 h-6" />, title: "‎0.5% עמלה בלבד", desc: "תשלום רק בסגירה" },
  { icon: <Clock className="w-6 h-6" />, title: "שליטה מלאה", desc: "נהלו את התהליך מהנייד" },
];

const whyUsFeatures = [
  {
    icon: <Target className="w-6 h-6" />, 
    title: "AI שפוגע בול – לא מבזבזים לכם זמן", 
    desc: "הבינה המלאכותית שלנו לא רק מסננת דירות – היא באמת מבינה את הצרכים שלכם ודואגת שתראו אך ורק נכסים שמתאימים לכם. בלי להציף אתכם בפרטים מיותרים או לבזבז זמן על דירות לא רלוונטיות."
  },
  {
    icon: <Eye className="w-6 h-6" />, 
    title: "שקיפות מוחלטת – כל מה שצריך לדעת, מול העיניים", 
    desc: "סיורי 3D שמכניסים אתכם אל תוך הדירה מכל מקום, ומידע מלא, אמיתי וברור – בלי אותיות קטנות ובלי הפתעות. מה שרואים זה מה שמקבלים. ככה אמור להיראות תהליך רכישה."
  },
  {
    icon: <Clock className="w-6 h-6" />, 
    title: "חוסכים לכם זמן וכסף – הכל קורה בוואטסאפ", 
    desc: "לא צריך לצאת מהבית, להתקשר או לרדוף אחרי מתווכים. כל התהליך – מהחיפוש ועד סגירת העסקה – מתבצע בצ׳אט נוח ויעיל, בזמן שנוח לכם."
  },
  {
    icon: <Lock className="w-6 h-6" />, 
    title: "השליטה בידיים שלכם – בלי בלעדיות, בלי מחויבות", 
    desc: "שכחו מהסכמים מגבילים ולחצים מיותרים. אצלנו אתם בוחרים איך, מתי ועם מי להתקדם – חופש מוחלט לנהל את העסקה בדיוק כמו שנכון לכם."
  },
  {
    icon: <DollarSign className="w-6 h-6" />, 
    title: "עמלות הוגנות באמת – לא סיסמה, מציאות", 
    desc: "קונים? לא משלמים שקל.\nמוכרים? משלמים רק 0.5% – ורק כשיש עסקה מוצלחת. כל השאר נשאר אצלכם בכיס."
  },
  {
    icon: <Briefcase className="w-6 h-6" />, 
    title: "לא סתם רובוט – שילוב מנצח של AI ומומחה אמיתי", 
    desc: "מאחורי כל תהליך טכנולוגי עומד אצלנו מנהל עסקה מקצועי, ניטרלי ואכפתי, שמלווה אתכם אישית ודואג שתהיו בידיים הטובות ביותר – מהרגע הראשון ועד לחתימה."
  },
];

export default function HomeClient() {
  return (
    <>
      <div className="w-full mt-0">
        <HeroSection />
      </div>
      {/* Our Vision Section */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.05 }} 
        className="w-full bg-gradient-to-br from-primary via-secondary to-primary-foreground rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] py-20 min-h-[20rem] max-w-[1280px] mx-auto flex flex-col items-center justify-center text-center mt-16 text-dark" dir="rtl">
        <div className="relative container mx-auto max-w-4xl flex flex-col items-center justify-center text-center bg-white/70 rounded-3xl p-8 shadow-2xl shadow-primary/30 border-4 border-white/60 backdrop-blur-xl transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_8px_40px_8px_rgba(80,80,180,0.18)] before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:bg-primary/10 before:blur-[12px] before:z-[-1] after:content-[''] after:absolute after:inset-0 after:rounded-3xl after:ring-2 after:ring-primary/20 after:z-[-2]">
          <Link href="/vision" className="text-3xl font-bold mb-8 text-primary text-center tracking-tight hover:underline focus-visible:outline-primary/70" aria-label="לעמוד החזון שלנו">
            החזון שלנו
          </Link>
          <p className="text-lg mb-6">
            אנחנו לא עוד לוח מודעות או משרד תיווך – אנחנו מהפכת הנדל׳ן החכם של ישראל. החזון שלנו: שוק נדל׳ן שבו כל אחד מרגיש בטוח, עם מידע שקוף, התאמה מדויקת ותחושת שליטה. בעזרת בינה מלאכותית, שקיפות מלאה וליווי אנושי מקצועי, כל קונה, מוכר או יזם יוכל לקבל החלטות חכמות, בקלות ובביטחון.
          </p>
          <p className="text-base text-dark/70">
            מתווכים של פעם? אנחנו העתיד. <span className="font-bold">2025 - נדלניסט.AI</span>
          </p>
        </div>
      </motion.section>
      {/* Buyers Section */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="w-full bg-white rounded-t-[48px] md:rounded-t-[64px] py-20 min-h-[20rem] max-w-[1280px] mx-auto flex flex-col items-center justify-center text-center mt-16" dir="rtl">
        <div className="container mx-auto max-w-6xl flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-10 text-primary text-center tracking-tight">מחפשים לרכוש נכס? תנו ל-AI למצוא לכם בית</h2>
          <p className="text-lg text-dark mb-8">
            נמאס לכם ממודעות פיתיון ומתווכים שלא באמת מקשיבים? עם נדלניסט AI, התהליך פשוט ויעיל: ספרו לנו מה אתם מחפשים – השאירו פרטים בקליק או פשוט כתבו לנו בצ׳אט WhatsApp מה חשוב לכם. הצ׳אט החכם שלנו ישאל את השאלות הנכונות כדי להבין בדיוק את הצרכים והרצונות שלכם, ותוך זמן קצר תקבלו 2-5 נכסים שמתאימים בדיוק למה שחיפשתם, עם כל המידע הרלוונטי, כולל סריקות תלת-ממד. אהבתם נכס? תאמו ביקור בלחיצת כפתור. מנהל עסקה ניטרלי ילווה אתכם עד החוזה – והכל בחינם, ללא עמלות תיווך!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center mx-auto mb-10" dir="rtl">
            {buyersFeatures.map((item, idx) => (
              <FeatureCard key={idx} icon={item.icon} title={item.title} desc={item.desc} delay={idx * 0.08} />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mx-auto">
            <div className="w-full max-w-[420px] p-4 bg-white text-dark rounded-2xl shadow-lg mx-auto mt-6">
              <ContactForm
                title="מצאו את דירת החלומות שלכם, בקלות ובלי כאבי ראש"
                source="buyers_inline_form"
                buttonText="מצא לי דירה חכמה"
                compact={true}
              />
            </div>
          </div>
        </div>
      </motion.section>
      {/* Why Nadlanist AI Section */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="w-full bg-light rounded-t-[48px] md:rounded-t-[64px] py-20 min-h-[20rem] max-w-[1280px] mx-auto flex flex-col items-center justify-center text-center mt-16" dir="rtl">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-10 text-primary text-center tracking-tight">למה לבחור בנדלניסט AI?</h2>
          <p className="text-lg text-dark mb-8">
            מערכת הבינה המלאכותית המתקדמת שלנו מבינה בדיוק מה אתם מחפשים, בין אם אתם קונים או מוכרים, וחוסכת לכם זמן יקר על ידי התמקדות רק במה שרלוונטי. תהליך דיגיטלי יעיל, כולו מנוהל דרך WhatsApp, חוסך לכם נסיעות מיותרות וכסף על עמלות גבוהות. לקונים השירות חינמי לחלוטין, ולמוכרים עמלה מופחתת של 0.5% בלבד. אצלנו אין הפתעות או אותיות קטנות – כל המידע החשוב נגיש, כולל סריקות 3D, נתונים מלאים ומצב הבניין. כל התהליך מתנהל בצ׳אט WhatsApp טבעי ונוח, ללא בלעדיות כופה, ואתם נשארים בשליטה מלאה. מנהלי העסקאות שלנו הם מומחים ניטרליים שמלווים אתכם יד ביד, מייעוץ ראשוני ועד לסגירת העסקה, ותמיד דואגים לאינטרס שלכם.
          </p>
          <PainSolutionCards items={painSolutions} />
        </div>
      </motion.section>
      {/* Sellers Section */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="w-full bg-white rounded-t-[48px] md:rounded-t-[64px] py-20 min-h-[20rem] max-w-[1280px] mx-auto flex flex-col items-center justify-center text-center mt-16" dir="rtl">
        <div className="container mx-auto max-w-6xl flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-10 text-dark text-center tracking-tight">מוכרים נכס? חסכו אלפי שקלים ומכרו מהר יותר</h2>
          <p className="text-lg text-dark mb-8">
            הגיע הזמן למכור את הנכס שלכם בלי כאבי ראש, עמלות מופקעות או בלעדיות כובלת. השאירו פרטים ונחזור אליכם, נבצע סריקת 3D מקצועית (חינם!), נבנה תוכנית דירה אטרקטיבית, ונחשוף את הנכס רק לקונים מסוננים על ידי AI – כאלה שמחפשים בדיוק מה שיש לכם להציע. פרטיותכם חשובה לנו: הנכס נחשף רק למתאימים. מנהל עסקה ניטרלי ילווה אתכם עד החתימה, וישמור על האינטרסים שלכם. תשלום עמלה של 0.5% בלבד ורק בהצלחה.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center mx-auto mb-10" dir="rtl">
            {sellersFeatures.map((item, idx) => (
              <FeatureCard key={idx} icon={item.icon} title={item.title} desc={item.desc} delay={idx * 0.08} />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mx-auto">
            <div className="w-full max-w-[420px] p-4 bg-white text-dark rounded-2xl shadow-lg mx-auto mt-6">
              <ContactForm
                title="התחילו בתהליך מכירה חכם, בקלות וללא התחייבות"
                source="sellers_inline_form"
                buttonText="מכור ב-0.5%"
                compact={true}
              />
            </div>
          </div>
        </div>
      </motion.section>
      {/* Entrepreneurs Section */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.07 }} className="w-full bg-primary-10 rounded-t-[48px] md:rounded-t-[64px] py-20 min-h-[20rem] max-w-[1280px] mx-auto flex flex-col items-center justify-center text-center mt-16" dir="rtl">
        <div className="container mx-auto max-w-4xl flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-8 text-primary text-center tracking-tight">יזמים? תתמקדו בבנייה, אנחנו נדאג למכירות</h2>
          <p className="text-lg text-dark mb-6">
            נדלניסט AI מספקת ליזמים פתרון כולל לניהול ומכירת פרויקטים – משיווק חכם, דרך סינון קונים איכותיים ועד ליווי אישי עד החתימה. תנו לטכנולוגיה שלנו למלא את הפרויקט בקונים מתאימים, בזמן קצר ובשקיפות מלאה. אתם תתמקדו בבנייה – אנחנו נדאג לכל השאר.
          </p>
        </div>
        <div className="w-full max-w-[420px] mx-auto p-4 bg-white text-dark rounded-2xl shadow-lg mt-6">
          <ContactForm
            title="רוצים למכור פרויקט מהר ובשקיפות מלאה? השאירו פרטים ונחזור אליכם עם פתרון ליזמים!"
            source="entrepreneurs_inline_form"
            buttonText="דברו איתי על מכירות לפרויקטים"
            compact={true}
          />
        </div>
      </motion.section>
      {/* Why Us Section */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="w-full bg-primary-10 rounded-t-[48px] md:rounded-t-[64px] py-20 min-h-[20rem] max-w-[1280px] mx-auto flex flex-col items-center justify-center text-center mt-16" dir="rtl">
        <div className="container mx-auto max-w-6xl flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-10 text-dark text-center tracking-tight">היתרונות שעושים את ההבדל</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center mx-auto mb-10" dir="rtl">
            {whyUsFeatures.map((item, idx) => (
              <FeatureCard key={idx} icon={item.icon} title={item.title} desc={item.desc} delay={idx * 0.08} />
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 mx-auto">
          </div>
          <div className="w-full max-w-[420px] mx-auto p-4 bg-white text-dark rounded-2xl shadow-lg mt-6">
            <ContactForm
              title="רוצים לגלות איך אפשר לחסוך זמן, כסף ועצבים? השאירו פרטים ונחזור אליכם עם כל התשובות!"
              source="why_choose_inline_form"
              buttonText="אני רוצה ייעוץ חכם"
              compact={true}
            />
          </div>
        </div>
      </motion.section>
      {/* Newsletter Section */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.45 }} className="w-full bg-white rounded-t-[48px] md:rounded-t-[64px] py-20 min-h-[10rem] max-w-[1280px] mx-auto flex flex-col items-center justify-center text-center mt-16" dir="rtl">
        <div className="container mx-auto max-w-2xl flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold mb-4 text-primary">הישארו מעודכנים עם נדלניסט AI</h2>
          <p className="text-base text-dark/80 mb-6">רוצים לקבל עדכונים חמים על נכסים חדשים, טיפים מקצועיים והצעות בלעדיות? הירשמו לניוזלטר שלנו:</p>
          <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <input type="email" required placeholder="הכניסו כתובת אימייל" className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary" />
            <button type="submit" className="rounded-lg bg-primary text-white px-6 py-3 font-semibold shadow-md hover:bg-primary/90 transition-colors">הרשמה</button>
          </form>
        </div>
      </motion.section>
    </>
  );
} 