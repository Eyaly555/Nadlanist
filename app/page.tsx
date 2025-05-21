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
  title: 'נדלניסט AI – תיווך נדל"ן חכם, בלי עמלה',
  description:
    'השירות החכם שמשדרג את תיווך הנדל"ן: קונים חוסכים עמלה, מוכרים נהנים מתשואה מרבית – הכל בממשק AI זורם וידידותי. התחילו חיפוש בקליק!',
  keywords:
    'נדלניסט, נדלניסט AI, נדלן בישראל, קניית דירה, מכירת דירה, תיווך, סוכן נדלן, יזמות נדלן, השקעות נדלן',
  openGraph: {
    title: 'נדלניסט AI – תיווך נדל"ן חכם, בלי עמלה',
    description: 'השירות החכם שמשדרג את תיווך הנדל"ן: קונים חוסכים עמלה, מוכרים נהנים מתשואה מרבית – הכל בממשק AI זורם וידידותי. התחילו חיפוש בקליק!',
    type: 'website',
    url: 'https://nadlanist.ai',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'נדלניסט AI',
      },
    ],
    siteName: 'נדלניסט AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'נדלניסט AI – תיווך נדל"ן חכם, בלי עמלה',
    description: 'השירות החכם שמשדרג את תיווך הנדל"ן: קונים חוסכים עמלה, מוכרים נהנים מתשואה מרבית – הכל בממשק AI זורם וידידותי. התחילו חיפוש בקליק!',
    images: ['/twitter-image.png'],
    creator: '@nadlanist_ai',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://nadlanist.ai',
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