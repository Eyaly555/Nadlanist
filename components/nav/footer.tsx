"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // ניווט קצר – זהה ל־Header
  const navItems = [
    { name: "דף הבית", href: "/" },
    { name: "קונים", href: "/buyers" },
    { name: "מוכרים", href: "/sellers" },
    { name: "החזון שלנו", href: "/vision" },
    { name: "צור קשר", href: "/contact" },
  ];

  /* reveal-on-scroll */
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer dir="rtl" lang="he" ref={footerRef}>
      {/* FOOTER ראשי */}
      <div
        className={`bg-dark text-white transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:py-16">
          {/* === שלושת הטורים === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* 1️⃣ לוגו + תיאור */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/mark-teal.svg"
                  alt="נדלניסט AI לוגו"
                  width={40}
                  height={40}
                />
                <h2 className="text-xl font-bold">נדלניסט AI</h2>
              </div>

              <p className="text-base leading-relaxed">מהפכה בעולם הנדל״ן</p>
              <p className="text-sm">מס׳ רישיון תיווך 3211134</p>

              {/* אייקוני רשתות */}
              <div className="flex gap-3 mt-2">
                <a
                  href="https://api.whatsapp.com/send?phone=972542171198"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp של נדלניסט AI"
                >
                  <FaWhatsapp className="h-6 w-6 text-[#008080]" />
                </a>
                <a
                  href="https://www.instagram.com/nadlanist_ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram של נדלניסט AI"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a
                  href="https://www.facebook.com/share/12HrSkJL7K4/?mibextid=qi2Omg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook של נדלניסט AI"
                >
                  <FaFacebook className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* 2️⃣ ניווט + כפתור WhatsApp */}
            <div className="flex flex-col items-center text-center gap-4">
              <h3 className="text-xl font-bold">ניווט מהיר</h3>

              <ul className="flex flex-col md:flex-row flex-wrap justify-center gap-x-6 gap-y-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#00a0a0] hover:underline decoration-white/30"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <a
                href={`https://api.whatsapp.com/send?phone=972542171198&text=${encodeURIComponent(
                  "הסוכן החכם שלנו יישלח לכם הודעה תוך שניות"
                )}`}
                className="mt-4 w-full md:w-auto rounded-xl bg-[#008080] px-6 py-3 text-white shadow-[0_2px_2px_rgba(0,0,0,0.2)] transition-all hover:bg-[#006666]"
                aria-label="פתח צ'אט WhatsApp"
              >
                צ׳אט WhatsApp
              </a>
            </div>

            {/* 3️⃣ פרטי קשר */}
            <div className="flex flex-col items-center text-center gap-4">
              <h3 className="text-xl font-bold">פרטי יצירת קשר</h3>

              <div className="flex flex-col gap-2 text-sm">
                <div>
                  <span className="font-bold">שעות פתיחה: </span>
                  הסוכן החכם שלנו זמין 24/7
                </div>
                <div>
                  <span className="font-bold">אימייל: </span>
                  <a
                    href="mailto:office@nadlanist.ai"
                    className="underline hover:text-[#00a0a0]"
                  >
                    office@nadlanist.ai
                  </a>
                </div>
                <div>
                  <span className="font-bold">ווטסאפ לנציג אנושי: </span>
                  <a
                    href="https://wa.me/972543893236"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#00a0a0]"
                  >
                    054-389-3236
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* === END grid === */}
        </div>
      </div>

      {/* סאב-פוטר */}
      <div className="bg-[#1B1F23] py-4 text-center text-white">
        <div className="mx-auto max-w-[1280px] px-4">
          <p className="text-sm leading-6">
            © 2025 Nadlanist AI | כל הזכויות שמורות
          </p>
          <Link
            href="/terms"
            className="mt-1 inline-block text-sm text-white/60 transition-colors hover:text-white"
          >
            תנאים והגבלות
          </Link>
        </div>
      </div>
    </footer>
  );
}
