import { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות - נדלניסט AI",
  description: "מדיניות פרטיות מעודכנת של נדלניסט AI - כיצד אנו מגנים על פרטיותך ומידעך.",
  alternates: {
    canonical: "https://www.nadlanist.ai/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12 text-right" dir="rtl">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">מדיניות פרטיות - נדלניסט AI</h1>
      <p className="text-sm text-gray-500 mb-8">עדכון אחרון: 21 במאי 2025</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">1. מבוא</h2>
        <p>
          ברוכים הבאים לנדלניסט AI (&quot;אנו&quot;, &quot;אנחנו&quot; או &quot;השירות&quot;). אנו מחויבים להגן על פרטיותך ולספק חוויית שימוש שקופה, בטוחה ואמינה. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, משתפים ומגנים על המידע שלך בעת שימוש באתר האינטרנט שלנו, בצ&apos;אט ה-WhatsApp שלנו ובשירותים נלווים (יחד, &quot;השירותים&quot;).<br />
          המשימה שלנו היא ליצור שוק נדל&quot;ן חכם, שקוף וממוקד משתמש, בו תוכל לקנות, למכור או לשווק נכסים בתחושת ביטחון ושליטה מלאה.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">2. אילו סוגי מידע אנו אוספים?</h2>
        <ul className="list-disc pr-6 space-y-2">
          <li>
            <span className="font-bold">מידע שמסרת ישירות:</span>
            <ul className="list-disc pr-6 mt-1 space-y-1 text-base">
              <li><span className="font-semibold">קונים:</span> העדפות חיפוש (למשל, תקציב, מיקום, סוג נכס), פרטי יצירת קשר וכל מידע נוסף שתבחר לשתף עם הסוכן החכם או נציגינו.</li>
              <li><span className="font-semibold">מוכרים:</span> פרטי הנכס (תיאור, תמונות, מפרטים), פרטי יצירת קשר ומידע נוסף שסיפקת.</li>
              <li><span className="font-semibold">יזמים:</span> מידע על פרויקטים, צרכים עסקיים ופרטי יצירת קשר לצורך שיווק ומכירה.</li>
            </ul>
          </li>
          <li>
            <span className="font-bold">מידע על נכסים (מוכרים):</span>
            <ul className="list-disc pr-6 mt-1 space-y-1 text-base">
              <li>סריקות תלת-ממד של הנכס, כולל פרטים ויזואליים ותכנוניים.</li>
              <li>תמונות, תיאורים ומפרטים ליצירת עמוד נכס (&quot;ליסטינג&quot;) במערכת.</li>
            </ul>
          </li>
          <li>
            <span className="font-bold">מידע שנאסף אוטומטית:</span>
            <ul className="list-disc pr-6 mt-1 space-y-1 text-base">
              <li>נתונים טכניים כמו כתובת IP, סוג דפדפן, מערכת הפעלה, זמני גישה ודפים שנצפו, באמצעות קבצי Cookie וטכנולוגיות מעקב דומות (ראה סעיף 7).</li>
            </ul>
          </li>
          <li>
            <span className="font-bold">תקשורת:</span>
            <ul className="list-disc pr-6 mt-1 space-y-1 text-base">
              <li>תיעוד התכתבויות דרך WhatsApp, דוא&quot;ל או ערוצים אחרים, כדי לשפר את השירות ולספק מענה מותאם.</li>
            </ul>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">3. כיצד אנו משתמשים במידע שלך?</h2>
        <ul className="list-disc pr-6 space-y-2">
          <li><span className="font-bold">מתן שירותים:</span>
            <ul className="list-disc pr-6 mt-1 space-y-1 text-base">
              <li><span className="font-semibold">לקונים:</span> התאמת נכסים מדויקת בהתבסס על העדפותיך.</li>
              <li><span className="font-semibold">למוכרים:</span> יצירת ליסטינג מקצועי, חיבור לקונים מתאימים וניהול תהליך המכירה.</li>
              <li><span className="font-semibold">ליזמים:</span> שיווק פרויקטים וחיבור לקונים רלוונטיים.</li>
            </ul>
          </li>
          <li><span className="font-bold">התאמה אישית:</span> שיפור חוויית המשתמש והצעת תוכן מותאם לצרכיך.</li>
          <li><span className="font-bold">תקשורת:</span> מענה לפניות, עדכונים על נכסים או קונים פוטנציאליים, ותיאום סיורים ומשא ומתן.</li>
          <li><span className="font-bold">שיווק:</span> שליחת הצעות ועדכונים (באישורך, עם אפשרות לביטול בכל עת).</li>
          <li><span className="font-bold">שיפור טכנולוגי:</span> פיתוח ושיפור האלגוריתמים והבינה המלאכותית שלנו.</li>
          <li><span className="font-bold">ציות לחוק:</span> עמידה בדרישות משפטיות ורגולטוריות.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">4. עם מי אנו משתפים את המידע?</h2>
        <ul className="list-disc pr-6 space-y-2">
          <li><span className="font-bold">בין קונים ומוכרים:</span>
            <ul className="list-disc pr-6 mt-1 space-y-1 text-base">
              <li>פרטי נכס (סריקות תלת-ממד, תמונות, תיאורים) מוצגים לקונים מתאימים לאחר סינון.</li>
              <li>פרטי יצירת קשר בסיסיים משותפים לצורך תיאום, באישור הצדדים.</li>
            </ul>
          </li>
          <li><span className="font-bold">מנהלי עסקאות:</span> שיתוף מידע עם &quot;מנהל עסקה&quot; או &quot;שותף הצלחה&quot; לניהול תהליך חלק ומקצועי.</li>
          <li><span className="font-bold">ספקי שירותים:</span> שיתוף עם ספקים חיצוניים (כגון אחסון ענן או כלי ניתוח) המחויבים לשמור על סודיות.</li>
          <li><span className="font-bold">רשויות משפטיות:</span> חשיפת מידע בהתאם לחוק, צו בית משפט או להגנה על זכויותינו ובטיחותך.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">5. אבטחת מידע</h2>
        <p>
          אנו מיישמים אמצעי אבטחה טכניים וארגוניים מתקדמים להגנה על המידע שלך מפני גישה בלתי מורשית, שימוש לרעה או חשיפה. עם זאת, אף מערכת אינה חסינה לחלוטין, ואנו פועלים ללא הרף לשיפור האבטחה.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">6. זכויותיך בנוגע למידע האישי</h2>
        <ul className="list-disc pr-6 space-y-2">
          <li><span className="font-bold">גישה:</span> לעיין במידע האישי שאנו מחזיקים.</li>
          <li><span className="font-bold">תיקון:</span> לבקש תיקון של מידע לא מדויק.</li>
          <li><span className="font-bold">מחיקה:</span> לבקש מחיקת מידע, בכפוף למגבלות משפטיות.</li>
          <li><span className="font-bold">הגבלת עיבוד:</span> לבקש הגבלה על שימוש במידע בנסיבות מסוימות.</li>
          <li><span className="font-bold">התנגדות:</span> להתנגד לעיבוד המידע, כולל למטרות שיווק.</li>
        </ul>
        <p className="mt-2">למימוש זכויותיך, פנה אלינו דרך פרטי הקשר בסעיף 11.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">7. קבצי Cookie וטכנולוגיות מעקב</h2>
        <p>
          אנו משתמשים בקבצי Cookie וטכנולוגיות דומות (כגון Google Analytics) לשיפור חוויית המשתמש, ניתוח שימוש והתאמת תוכן. תוכל לנהל העדפות Cookie בהגדרות הדפדפן, אך השבתת Cookie מסוימים עשויה לפגוע בפונקציונליות האתר.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">8. שמירת מידע</h2>
        <p>
          אנו שומרים מידע אישי למשך הזמן הנחוץ למטרות המפורטות במדיניות זו, או כנדרש בחוק. לאחר מכן, המידע נמחק או הופך לאנונימי בצורה מאובטחת.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">9. פרטיות ילדים</h2>
        <p>
          השירותים שלנו מיועדים למשתמשים מעל גיל 18. אנו לא אוספים ביודעין מידע מילדים מתחת לגיל 18. אם נגלה שנאסף מידע כזה, נמחק אותו לאלתר.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">10. שינויים במדיניות</h2>
        <p>
          אנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר עם תאריך עדכון מעודכן. אנו ממליצים לעיין במדיניות זו באופן תקופתי.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-2">11. יצירת קשר</h2>
        <ul className="list-disc pr-6 space-y-2">
          <li><span className="font-bold">דוא&quot;ל:</span> <a href="mailto:office@nadlanist.ai" className="text-primary underline">office@nadlanist.ai</a></li>
          <li><span className="font-bold">טלפון:</span> <a href="tel:0529574200" className="text-primary underline">052-9574200</a></li>
          <li><span className="font-bold">צ&apos;אט WhatsApp:</span> <a href="https://wa.link/nadlanist" target="_blank" rel="noopener noreferrer" className="text-primary underline">wa.link/nadlanist</a></li>
        </ul>
        <div className="mt-6 text-xs text-gray-400">
          נדלניסט AI – מהפכה בשוק הנדל&quot;ן<br />
          מס׳ רישיון תיווך: 3211134
        </div>
      </section>
    </main>
  );
}
