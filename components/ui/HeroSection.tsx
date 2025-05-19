"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ContactForm } from "@/components/shared";
import { Logo } from "@/components/ui/logo";

export function HeroSection() {
  return (
    <section className="relative w-full bg-primary-10 rounded-[48px] md:rounded-[64px] overflow-hidden py-20 min-h-[20rem] max-w-[1280px] mx-auto flex items-center justify-center" aria-label="Hero">
      {/* Skyline Background Image */}
      <Image
        src="/Skyline images/improved_image.jpg"
        alt="Skyline view of Tel Aviv"
        fill
        className="object-cover object-center opacity-80"
        priority
        quality={90}
        sizes="100vw"
      />
      {/* Brand Overlay for contrast and color */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/80 mix-blend-multiply" />
      {/* Dark overlay for text clarity */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Logo at the top for brand presence */}
      <div className="absolute top-8 right-8 z-20">
        <Logo width={180} height={36} variant="white" />
      </div>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-2xl mx-auto text-center text-white px-4 flex flex-col items-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-poppins drop-shadow-xl">
        מצאו את בית החלומות שלכם, בקלות ובלי כאבי ראש
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl">
        ברוכים הבאים לנדלניסט AI, פלטפורמת הנדל&quot;ן החכמה שמשנה את חוקי המשחק. אנו מבינים את התסכול הכרוך בחיפוש או מכירת נכס – העמלות הגבוהות, חוסר השקיפות והתהליכים המסורבלים.  לכן, בנינו עבורכם פתרון חדשני, פשוט ויעיל, המותאם אישית לצרכים שלכם.  אצלנו, הטכנולוגיה עובדת בשבילכם, עם בינה מלאכותית שמסייעת לכם בכל שלב, ישירות דרך WhatsApp.
        </p>
        <a
            href="https://wa.me/972542171198"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 mt-8 rounded-xl bg-transparent text-white font-semibold shadow-lg hover:bg-transparent border border-white hover:border-opacity-75 transition-colors duration-300 text-lg"
            aria-label="פתחו צ&apos;אט חכם ב-WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.471-.148-.67.15-.198.297-.767.967-.94 1.166-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 6.318h-.001a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374A9.86 9.86 0 012.1 11.893C2.1 6.73 6.729 2.1 11.893 2.1c2.637 0 5.112 1.027 6.988 2.901a9.825 9.825 0 012.902 6.991c-.003 5.163-4.633 9.792-9.732 9.792zm8.413-18.205A11.815 11.815 0 0011.893 0C5.326 0 0 5.326 0 11.893c0 2.096.547 4.142 1.588 5.945L.057 23.943a1.2 1.2 0 001.473 1.473l6.105-1.529A11.86 11.86 0 0011.893 23.8c6.567 0 11.893-5.326 11.893-11.893 0-3.177-1.237-6.166-3.532-8.412z" fill="currentColor"/>
            </svg>
            צ&apos;אט חכם
          </a>
        <div className="bg-white/90 text-dark rounded-2xl shadow-lg max-w-[420px] w-full mx-auto mt-6 p-6 backdrop-blur-md">
          <ContactForm
            title=""
            source="hero_inline_form"
            buttonText="אשמח לשמוע עוד"
            compact={true}
          />
        </div>
      </motion.div>
    </section>
  );
} 