import { type Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import Script from "next/script";
import DashboardClientComponent from "./dashboard-client";

export const metadata: Metadata = {
  title: 'הדשבורד החכם של נדלניסט AI',
  description: 'הדשבורד החדשני והמקיף בישראל למעקב חכם אחר פרויקטי נדל"ן בבנייה ובביצוע.',
  keywords: 'דשבורד נדלניסט, פרויקטים בבנייה, נדל"ן בישראל, מעקב נדל"ן, מגדלים בישראל',
  openGraph: {
    title: 'הדשבורד החכם של נדלניסט AI',
    description: 'הדשבורד החדשני והמקיף בישראל למעקב חכם אחר פרויקטי נדל"ן בבנייה ובביצוע.',
    type: 'website',
    url: 'https://nadlanist.ai/dashboard',
    images: [
      {
        url: '/marker_logo.png',
        width: 1200,
        height: 630,
        alt: 'הדשבורד החכם של נדלניסט AI',
      },
    ],
    siteName: 'נדלניסט AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'הדשבורד החכם של נדלניסט AI',
    description: 'הדשבורד החדשני והמקיף בישראל למעקב חכם אחר פרויקטי נדל"ן בבנייה ובביצוע.',
    images: ['/twitter-image.png'],
    creator: '@nadlanist_ai',
  },
  alternates: {
    canonical: 'https://www.nadlanist.ai/dashboard',
  },
};

export default function DashboardPage() {
  // Structured data for Breadcrumbs
  const breadcrumbs = [
    { label: "בית", href: "/" },
    { label: "דשבורד" }
  ];

  // Structured data for ItemList (placeholder, replace with real projects if available)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "רשימת פרויקטים בדשבורד נדלניסט AI",
    "itemListElement": [
      // ניתן להחליף ברשימה דינמית של פרויקטים
      {
        "@type": "ListItem",
        "position": 1,
        "name": "מגדל עזריאלי שרונה",
        "url": "https://www.nadlanist.ai/projects/azrieli-sarona"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "מגדלי אלון",
        "url": "https://www.nadlanist.ai/projects/alon-towers"
      }
    ]
  };

  return (
    <>
      <Script
        id="dashboard-itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="w-full max-w-7xl mx-auto px-4 pt-4 text-black">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      {/* קישורים פנימיים */}
      <nav aria-label="Secondary navigation" className="mb-4 text-black">
        <ul className="flex gap-4 text-sm">
          <li><a href="/buyers" className="hover:underline">לקונים</a></li>
          <li><a href="/sellers" className="hover:underline">למוכרים</a></li>
          <li><a href="/tel-aviv" className="hover:underline">שכונות תל אביב</a></li>
        </ul>
      </nav>
      <DashboardClientComponent />
    </>
  );
}