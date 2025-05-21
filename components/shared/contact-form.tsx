"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

interface ContactFormProps {
  title?: string;
  className?: string;
  source?: string; // To track which page/section the form is submitted from
  buttonText?: string;
  compact?: boolean; // For smaller inline versions of the form
}

// פונקציית נרמול: מחזירה מספר טלפון ישראלי בפורמט 05XXXXXXXXX (או ריק אם לא תקין)
const normalizePhone = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, "");

  // מסיר קידומת בינלאומית אם קיימת
  if (cleaned.startsWith("9720")) {
    cleaned = "0" + cleaned.slice(4);
  } else if (cleaned.startsWith("972")) {
    cleaned = "0" + cleaned.slice(3);
  }
  // מסיר אפסים מיותרים בהתחלה
  while (cleaned.startsWith("00")) {
    cleaned = cleaned.slice(1);
  }

  // במידה והוזן רק 9 ספרות (ללא אפס בהתחלה, לדוג' 529574200)
  if (cleaned.length === 9 && cleaned[0] !== "0") {
    cleaned = "0" + cleaned;
  }

  // החזרה של המספר הנקי
  return cleaned;
};

// ולידציה על המספר המנורמל
const isValidIsraeliPhone = (phone: string): boolean => {
  const normalized = normalizePhone(phone);
  // חובה להתחיל ב־05 או 02/03/04/08/09 (טלפון קווי), סה"כ 10 ספרות
  return /^0(5\d{8}|[2-489]\d{7})$/.test(normalized);
};

export function ContactForm({
  title = "השאירו פרטים ונחזור אליכם",
  className = "",
  source = "general",
  buttonText = "התחילו עכשיו",
  compact = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    terms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null); // שגיאה ספציפית לטלפון
  const [success, setSuccess] = useState(false);

  // Track UTM parameters and referrer
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramsToCapture = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "ad_id",
      "device",
      "matchtype",
      "network",
      "gclid",
    ];

    const utmData: Record<string, string> = {};

    paramsToCapture.forEach((paramKey) => {
      utmData[paramKey] = urlParams.get(paramKey) || "";
    });

    utmData["referrer"] = document.referrer || "";
    utmData["page_url"] = window.location.href;

    // We'll use these values when submitting the form
    (window as WindowWithUtmData).utmData = utmData;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "phone") {
      // מאפשר רק ספרות
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      if (phoneError) setPhoneError(null);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setPhoneError(null);

    const normalizedPhone = normalizePhone(formData.phone);

    if (!isValidIsraeliPhone(formData.phone)) {
      setPhoneError(
        "מספר הטלפון אינו תקין. אנא הזן מספר ישראלי חוקי (למשל 0501234567)."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const formSubmitData = new FormData();

      formSubmitData.append("fullname", formData.fullname);
      formSubmitData.append("phone", normalizedPhone);
      formSubmitData.append("terms", formData.terms ? "yes" : "no");
      formSubmitData.append("source", source);

      const utmData = (window as WindowWithUtmData).utmData || {};
      Object.entries(utmData).forEach(([key, value]) => {
        formSubmitData.append(key, value as string);
      });

      const response = await fetch(
        "https://eyaly555.app.n8n.cloud/webhook/35e9493f-3efe-4270-a494-c6ae2e65a604",
        {
          method: "POST",
          body: formSubmitData,
        }
      );

      if (response.ok) {
        if (compact) {
          setSuccess(true);
          setFormData({
            fullname: "",
            phone: "",
            terms: false,
          });
          // Trigger Google Ads conversion event for compact forms
          if (typeof window !== "undefined" && (window as WindowWithUtmData).gtag) {
            (window as WindowWithUtmData).gtag!(
              'event',
              'conversion',
              { send_to: 'AW-17084618003/rzb3CM2Kp8kaEJOqytI_' }
            );
          }
        } else {
          window.location.href = "https://www.nadlanist.ai/thank-you/";
        }
      } else {
        setError("אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.");
      }
    } catch {
      setError("אירעה שגיאה. אנא בדוק את חיבור האינטרנט שלך ונסה שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success && compact) {
    return (
      <div
        className={`w-full max-w-[1280px] mx-auto px-4 md:px-8 ${className}`}
        dir="rtl"
      >
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <h3 className="text-green-700 text-lg font-medium">
            הפרטים נשלחו בהצלחה!
          </h3>
          <p className="text-green-600 mt-2">
            תוך שניות תקבלו הודעת וואטסאפ מהסוכן החכם של נדלניסט
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full max-w-[420px] mx-auto px-4 md:px-8 ${className} flex flex-col items-center justify-center`}
      dir="rtl"
      style={{
        minHeight: compact ? undefined : 420,
      }}
      aria-modal="true"
      role="dialog"
    >
      {!compact && (
        <Image
          src="/Skyline images/improved_image.jpg"
          alt="Skyline background"
          fill
          className="absolute inset-0 w-full h-full object-cover rounded-xl z-0 opacity-60"
          style={{ pointerEvents: "none" }}
          priority
        />
      )}
      <div
        className={`absolute inset-0 rounded-xl z-10 bg-white/95 shadow-lg border border-gray-200`}
      />
      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        {title && !compact && (
          <h2
            className="text-2xl font-bold text-center mb-6 text-gray-900"
            style={{ wordBreak: "break-word" }}
          >
            {title}
          </h2>
        )}
        <div
          className={`bg-transparent border-0 shadow-none p-0 w-full`}
        >
          <form
            onSubmit={handleSubmit}
            autoComplete="on"
            className="space-y-4 w-full flex flex-col items-center justify-center"
          >
            {[
              "utm_source",
              "utm_medium",
              "utm_campaign",
              "utm_term",
              "utm_content",
              "ad_id",
              "device",
              "matchtype",
              "network",
              "gclid",
              "referrer",
            ].map((field) => (
              <input key={field} type="hidden" id={field} name={field} />
            ))}
            <div className="flex flex-row-reverse gap-4 w-full">
              <div className="flex-1">
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm font-medium text-gray-800 text-center"
                >
                  מספר טלפון
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  id="phone"
                  name="phone"
                  placeholder="מספר טלפון"
                  dir="ltr"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="popup-input w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent placeholder-gray-400 box-border text-base text-center"
                  style={{ margin: '0 auto', display: 'block', textAlign: 'center' }}
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1 text-center">{phoneError}</p>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="fullname"
                  className="block mb-1 text-sm font-medium text-gray-800 text-center"
                >
                  שם מלא
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="שם מלא"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  className="popup-input w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-[#008080] focus:border-transparent placeholder-gray-400 box-border text-base text-center"
                  style={{ maxWidth: 180, margin: '0 auto', display: 'block', textAlign: 'center' }}
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-2 mb-2 gap-2 w-full">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                checked={formData.terms}
                onChange={handleChange}
                className="h-4 w-4 text-[#008080] focus:ring-[#008080] rounded ml-2 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-xs text-gray-700 text-center"
              >
                אני מסכים ל
                <Link
                  href="https://nadlanist.ai/terms"
                  className="text-[#008080] hover:underline mx-1"
                  target="_blank"
                >
                  תנאי השימוש
                </Link>
                ולקבל הודעות ווטסאפ מנדלניסט AI
              </label>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center w-full">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="popup-button w-full py-3 px-4 mt-2 bg-[#008080] text-white rounded-lg font-bold text-lg transition-colors hover:bg-[#006666] focus:outline-none focus:ring-2 focus:ring-[#008080] focus:ring-opacity-50 disabled:opacity-70 shadow-md"
              style={{ maxWidth: 320, margin: "0 auto", display: "block" }}
            >
              {isSubmitting ? "שולח..." : buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Add the UTM data to the Window interface
interface WindowWithUtmData extends Window {
  utmData?: Record<string, string>;
  gtag?: (...args: unknown[]) => void;
}
