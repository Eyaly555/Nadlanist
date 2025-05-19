import { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/shared";
import HomeClient from "@/components/HomeClient";

// Force static generation
export const dynamic = "force-static";
export const revalidate = false;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
};

export const metadata: Metadata = {
  title: "נדלניסט AI - נדלן חכם, שקוף וללא עמלות מיותרות",
  description:
    "נדלניסט AI הופכת קנייה ומכירה של נכסים לשיחה אחת בWhatsApp: אלגוריתם AI חכם + ליווי אנושי מקצועי, 0 ₪ עמלות לקונים ורק 0.5% למוכרים.",
  keywords:
    "נדלניסט, נדלניסט AI, נדלן בישראל, קניית דירה, מכירת דירה, תיווך, סוכן נדלן, יזמות נדלן, השקעות נדלן",
  openGraph: {
    title: "נדלניסט AI - נדלן חכם, שקוף וללא עמלות מיותרות",
    description: "נדלניסט AI הופכת קנייה ומכירה של נכסים לשיחה אחת בWhatsApp. 0 ₪ עמלות לקונים, 0.5% למוכרים.",
    type: "website",
    url: "https://nadlanist.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "נדלניסט AI",
      },
    ],
    siteName: "נדלניסט AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "נדלניסט AI - נדלן חכם, שקוף וללא עמלות מיותרות",
    description: "נדלניסט AI הופכת קנייה ומכירה של נכסים לשיחה אחת בWhatsApp. 0 ₪ עמלות לקונים, 0.5% למוכרים.",
    images: ["/twitter-image.png"],
    creator: "@nadlanist_ai",
  },
  alternates: {
    canonical: "https://nadlanist.ai",
  },
};

const jsonLdData = { // שיניתי את שם המשתנה כדי למנוע בלבול עם הקומפוננטה JsonLd
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "נדלניסט AI",
  description: "פלטפורמת נדלן חכמה המחברת בין קונים, מוכרים ויזמים",
  url: "https://nadlanist.ai",
  logo: "https://nadlanist.ai/logo.png",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IL",
    addressLocality: "תל אביב"
  },
  priceRange: "$$",
  telephone: "+972542171198",
  openingHours: "Mo,Tu,We,Th,Su 09:00-18:00",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLdData} /> {/* השתמש בשם המשתנה החדש */}
      <HomeClient />
    </>
  );
}