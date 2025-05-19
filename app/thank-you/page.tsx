import React from "react";
import Image from "next/image";

/**
 * ThankYouPage - עמוד תודה
 * @returns {JSX.Element} עמוד תודה ריק לפי תבנית עמודים קיימת
 */
export default function ThankYouPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white text-right items-center justify-center" dir="rtl">
      <section className="relative w-full flex flex-col items-center justify-center gap-8 py-16 px-4 bg-primary-10 overflow-hidden border-b border-primary/10">
        <div className="flex flex-col items-center text-center z-10 w-full max-w-2xl mx-auto font-sans">
          <Image src="/General images/thank-you.png" alt="תודה" width={120} height={120} className="mb-4" />
          <h1 className="text-4xl md:text-5xl text-primary mb-4 leading-tight font-sans">
            תודה!
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-6 max-w-xl mx-auto font-sans">
            פנייתכם התקבלה בהצלחה. נציג שלנו יחזור אליכם בהקדם האפשרי.<br />
            תודה שבחרתם ב-נדלניסט AI!
          </p>
        </div>
      </section>
    </main>
  );
} 