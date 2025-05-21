import React from "react";
import Image from "next/image";
import Script from "next/script";

/**
 * ThankYouPage - עמוד תודה
 * @returns {JSX.Element} עמוד תודה ריק לפי תבנית עמודים קיימת
 */
export default function ThankYouPage() {
  return (
    <>
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          gtag('event', 'conversion', {'send_to': 'AW-17084618003/rzb3CM2Kp8kaEJOqytI_'});
        `}
      </Script>
      <main className="flex flex-col min-h-screen bg-white text-right items-center justify-center" dir="rtl">
        <section className="relative w-full flex flex-col items-center justify-center gap-8 py-16 px-4 bg-primary-10 overflow-hidden border-b border-primary/10">
          <div className="flex flex-col items-center text-center z-10 w-full max-w-2xl mx-auto font-sans">
            <Image
              src="/images/LinkedinCover.png"
              alt="תודה"
              width={400}
              height={400}
              className="mb-4"
            />

            <h1 className="text-4xl md:text-5xl text-primary mb-4 leading-tight font-sans">
              תודה!
            </h1>

            <p className="text-lg md:text-2xl text-gray-700 mb-6 max-w-xl mx-auto font-sans">
              הפרטים שלך התקבלו בהצלחה!<br />
              תוך שניות תקבלו הודעת וואטסאפ מהסוכן החכם של נדלניסט<br />
              אל תהססו לשאול אותו כל מה שתרצו – הוא כאן בשבילכם, ויודע לדבר ממש כמו בן אדם
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
