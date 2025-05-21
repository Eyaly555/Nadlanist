import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/nav/main-nav";
import { Footer } from "@/components/nav/footer";
import { QueryProvider } from "@/lib/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

// Use Inter as fallback
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F7F9" },
    { media: "(prefers-color-scheme: dark)", color: "#1B1F23" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nadlanist.ai"),
  title: {
    default: "נדלניסט AI",
    template: "%s | נדלניסט AI",
  },
  description: "נדלניסט AI הופכת קנייה ומכירה של נכסים לשיחה אחת בWhatsApp: אלגוריתם AI חכם + ליווי אנושי מקצועי, 0 ₪ עמלות לקונים ורק 0.5% למוכרים.",
  keywords: [
    "נדלניסט",
    "נדלניסט AI",
    "נדלן בישראל",
    "קניית דירה",
    "מכירת דירה",
    "תיווך",
    "סוכן נדלן",
    "יזמות נדלן",
    "השקעות נדלן",
  ],
  authors: [
    {
      name: "נדלניסט AI",
      url: "https://nadlanist.ai",
    },
  ],
  creator: "נדלניסט AI",
  publisher: "נדלניסט AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/mark-black.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  manifest: `/manifest.json`,
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://nadlanist.ai",
    title: "נדלניסט AI",
    description: "נדלניסט AI הופכת קנייה ומכירה של נכסים לשיחה אחת בWhatsApp. 0 ₪ עמלות לקונים, 0.5% למוכרים.",
    siteName: "נדלניסט AI",
    images: [
      {
        url: "/mark-teal.svg",
        width: 1200,
        height: 630,
        alt: "נדלניסט AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "נדלניסט AI - נדלן חכם, שקוף וללא עמלות מיותרות",
    description: "נדלניסט AI הופכת קנייה ומכירה של נכסים לשיחה אחת בWhatsApp. 0 ₪ עמלות לקונים, 0.5% למוכרים.",
    images: ["/mark-teal.svg"],
    creator: "@nadlanist_ai",
  },
  alternates: {
    canonical: "https://www.nadlanist.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Always load Google Analytics with the hardcoded measurement ID
  const GA_MEASUREMENT_ID = "G-YRF852BZP5";

  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/mark-black.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon-72x72.png" sizes="72x72" />
        <link rel="apple-touch-icon" href="/apple-icon-192x192.png" sizes="192x192" />
        <meta name="theme-color" content="#00A6A2" />
        <meta name="msapplication-TileColor" content="#00A6A2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description || ""} />
        <meta name="keywords" content={
          Array.isArray(metadata.keywords)
            ? metadata.keywords.join(", ")
            : (typeof metadata.keywords === "string" ? metadata.keywords : "")
        } />
        <meta
          name="author"
          content={
            Array.isArray(metadata.authors)
              ? metadata.authors.map(author => typeof author === "string" ? author : author.name).join(", ")
              : (typeof metadata.authors === "string" ? metadata.authors : "")
          }
        />
        <meta name="creator" content={metadata.creator || ""} />
        <meta name="publisher" content={metadata.publisher || ""} />
        <meta name="robots" content={
          typeof metadata.robots === "object" && metadata.robots !== null && "index" in metadata.robots
            ? (metadata.robots.index ? "index" : "noindex")
            : "noindex"
        } />
        <meta name="googlebot" content={
          typeof metadata.robots === "object" && metadata.robots !== null && "googleBot" in metadata.robots
            ? "index, follow"
            : "noindex, nofollow"
        } />
        <meta name="google-site-verification" content="google-site-verification=google-site-verification" />
        <meta name="msvalidate.01" content="MS_VALIDATION_CODE" />
        <meta name="yandex-verification" content="YANDEX_VERIFICATION_CODE" />
        <meta name="alexaVerifyID" content="Alexa_Verify_ID" />
        <meta name="msapplication-TileImage" content="/apple-icon-144x144.png" />
        <meta name="msapplication-TileImage" content="/apple-icon-152x152.png" />
        <meta name="msapplication-TileImage" content="/apple-icon-180x180.png" />
        {/* Google Analytics & Google Ads (gtag.js) - always loaded */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', 'AW-17084618003');
          `}
        </Script>
        <Script
          id="hotjar-init"
          strategy="afterInteractive"
        >
          {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6409846,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      </head>
      <body className={`${poppins.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="relative min-h-screen flex flex-col">
              <MainNav />
              <main className="container mx-auto px-4 pb-8 pt-6">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="bottom-right" />
            <Analytics />
            <SpeedInsights />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 