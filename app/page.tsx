import { Metadata, Viewport } from "next";
import HomeClient from "@/components/HomeClient";
import Script from 'next/script';

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
    canonical: 'https://www.nadlanist.ai',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="ld-real-estate-agent"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Nadlanist AI",
            "url": "https://www.nadlanist.ai/",
            "logo": "https://www.nadlanist.ai/logo-teal.svg",
            "telephone": "+972542171198",
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+972543893236",
                "contactType": "customer service",
                "description": "נציג אנושי בווטסאפ"
              }
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "נצח ישראל 3",
              "addressLocality": "תל אביב"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Sunday","Monday","Tuesday","Wednesday",
                  "Thursday","Friday","Saturday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              }
            ]
          })
        }}
      />
      <Script
        id="ld-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "נדלניסט AI - תיווך חכם בתל אביב",
            "alternateName": "Nadlanist AI",
            "description": "סוכנות נדל\"ן חכמה בתל אביב - 0% עמלה לקונים, 0.5% למוכרים. תיווך מבוסס AI עם סריקות 3D וליווי מקצועי.",
            "url": "https://www.nadlanist.ai/",
            "logo": "https://www.nadlanist.ai/logo-teal.svg",
            "image": "https://www.nadlanist.ai/mark-teal.svg",
            "telephone": "+972542171198",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "נצח ישראל 3",
              "addressLocality": "תל אביב",
              "addressRegion": "מחוז תל אביב",
              "postalCode": "",
              "addressCountry": "IL"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 32.0853,
              "longitude": 34.7818
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "תל אביב-יפו"
              },
              {
                "@type": "State",
                "name": "גוש דן"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "שירותי תיווך",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "תיווך לקונים",
                    "description": "שירות תיווך חינמי לקונים - 0% עמלה"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "תיווך למוכרים",
                    "description": "תיווך למוכרים עם עמלה של 0.5% בלבד"
                  }
                }
              ]
            }
          })
        }}
      />
      <HomeClient />
    </>
  );
}