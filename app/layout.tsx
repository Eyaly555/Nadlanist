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
import { GoogleAnalytics } from "@/lib/analytics/google-analytics";
import { siteConfig } from "@/lib/site-config";
import { Script } from "next/script";

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://cursor.new"
  ),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "cursor.new",
    "cursor",
    "cursor ai",
    "project",
    "scaffolding",
    "templates",
    "boilerplate",
  ],
  authors: [
    {
      name: "cursor.new",
      url: "https://cursor.new",
    },
  ],
  creator: "cursor.new",
  publisher: "Cursor New",
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
  manifest: `${siteConfig.url}/manifest.json`,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "cursor.new - Intelligent Project Scaffolding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/twitter-image.png`],
    creator: "@cursor_new",
  },
  alternates: {
    canonical: "https://cursor.new",
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
        {/* Google Analytics (gtag.js) - always loaded */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
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