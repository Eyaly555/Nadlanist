import { type Metadata } from "next";
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
  return <DashboardClientComponent />;
}