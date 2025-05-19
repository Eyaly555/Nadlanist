"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Navigation items - matching the header
  const navItems = [
    { name: "דף הבית", href: "/" },
    { name: "קונים", href: "/buyers" },
    { name: "מוכרים", href: "/sellers" },
    { name: "יזמים", href: "/entrepreneurs" },
    { name: "החזון שלנו", href: "/vision" },
    { name: "צור קשר", href: "/contact" },
  ];

  useEffect(() => {
    const currentFooter = footerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (currentFooter) {
      observer.observe(currentFooter);
    }

    return () => {
      if (currentFooter) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <footer dir="rtl" lang="he" ref={footerRef}>
      {/* Main Footer */}
      <div 
        className={`bg-dark text-white transition-all duration-250 ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-5"
        }`}
      >
        <div className="container mx-auto max-w-[1280px] py-12 md:py-[48px] px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            {/* Info Column - 40% width on desktop */}
            <div className="w-full md:w-2/5 flex flex-col items-center md:items-start">
              <div className="flex items-center">
                <Image
                  src="/mark-teal.svg"
                  alt="נדלניסט AI לוגו"
                  width={40}
                  height={40}
                  className="ml-2"
                />
                <h2 className="text-xl font-bold">נדלניסט AI</h2>
              </div>
              <p className="mt-2 text-center md:text-right text-base leading-relaxed">
מהפכה בעולם הנדל&quot;ן              </p>
              <p className="text-sm mt-1 text-center md:text-right">
                מס׳ רישיון תיווך 3211134
              </p>
              
              {/* Social icons */}
              <div className="flex mt-4 gap-3">
                <a 
                  href="https://wa.me/972542171198" 
                  aria-label="WhatsApp של נדלניסט AI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="h-6 w-6 text-[#008080]" />
                </a>
                <a 
                  href="https://www.instagram.com/nadlanist_ai/" 
                  aria-label="Instagram של נדלניסט AI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="h-6 w-6 text-white" />
                </a>
                <a 
                  href="https://www.facebook.com/share/12HrSkJL7K4/?mibextid=qi2Omg" 
                  aria-label="Facebook של נדלניסט AI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="h-6 w-6 text-white" />
                </a>
              </div>
            </div>
            
            {/* Links & CTA Column - 60% width on desktop */}
            <div className="w-full md:w-3/5 flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold mb-4">ניווט מהיר</h3>
              <ul className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-6 text-center md:text-right">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href}
                      className="text-white hover:text-[#008080] hover:underline decoration-white/30"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* WhatsApp CTA Button */}
              <a 
                href="https://wa.me/972542171198" 
                className="mt-6 bg-[#008080] text-white py-3 px-6 rounded-xl shadow-[0_2px_2px_rgba(0,0,0,0.2)] w-full md:w-auto text-center transition-all duration-300 hover:bg-[#006666]"
                aria-label="פתח צ'אט WhatsApp"
              >
                צ׳אט WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sub-footer */}
      <div className="bg-[#1B1F23] text-white py-4">
        <div className="container mx-auto max-w-[1280px] px-4 text-center">
          <p className="text-sm tracking-[0.2px] leading-6">
            © 2025 Nadlanist AI | כל הזכויות שמורות
          </p>
          <Link 
            href="/terms" 
            className="text-white/50 text-sm hover:text-white transition-colors duration-200 mt-1 inline-block"
          >
            תנאים והגבלות
          </Link>
        </div>
      </div>
    </footer>
  );
}
