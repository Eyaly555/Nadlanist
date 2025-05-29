import withPWA from 'next-pwa';
import { createSecureHeaders } from 'next-secure-headers';

const isDevelopment = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const scriptSrcDirectives = [
      "'self'",
      "'unsafe-inline'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://maps.googleapis.com",
      "https://static.hotjar.com",
      "https://script.hotjar.com",
      "https://googleads.g.doubleclick.net",
      "https://www.clarity.ms",
      "https://*.clarity.ms",
      "https://connect.facebook.net",
      "https://www.facebook.com",
    ];
    if (isDevelopment) {
      scriptSrcDirectives.push("'unsafe-eval'");
    }
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      },
      {
        source: '/:path*',
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: scriptSrcDirectives,
              styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
              imgSrc: [
                "'self'", 
                "data:", 
                "https://maps.googleapis.com", 
                "https://maps.gstatic.com", 
                "https://*.google.com", 
                "https://*.googleusercontent.com",
                "https://www.clarity.ms",
                "https://*.clarity.ms",
                "https://www.google.co.il",
                "https://googleads.g.doubleclick.net",
                "https://www.facebook.com",
                "https://connect.facebook.net",
                "https://*.facebook.com",
              ],
              connectSrc: [
                "'self'",
                "https://maps.googleapis.com",
                "https://maps.gstatic.com",
                "https://*.googleapis.com",
                "https://*.gstatic.com",
                "https://umnrabdyhvegsvomyfkv.supabase.co",
                "https://eyaly555.app.n8n.cloud",
                "https://www.google-analytics.com",
                "https://www.google.com",
                "https://static.hotjar.com",
                "https://script.hotjar.com",
                "https://googleads.g.doubleclick.net",
                "https://www.clarity.ms",
                "https://*.clarity.ms",
                "wss://ws.hotjar.com",
                "https://content.hotjar.io",
                "https://*.hotjar.io",
                "https://connect.facebook.net",
                "https://www.facebook.com",
                "https://*.facebook.com",
              ],
              fontSrc: ["'self'", "https://fonts.gstatic.com"],
              objectSrc: ["'none'"],
              baseUri: ["'self'"],
              formAction: ["'self'"],
              frameAncestors: ["'none'"],
              frameSrc: [
                "'self'",
                "https://www.googletagmanager.com",
                "https://td.doubleclick.net",
                "https://vars.hotjar.com",
                "https://www.google.com",
                "https://www.clarity.ms",
                "https://*.clarity.ms",
              ],
            },
          },
          referrerPolicy: 'strict-origin-when-cross-origin',
          xContentTypeOptions: 'nosniff',
          xFrameOptions: 'SAMEORIGIN',
        }),
      },
    ];
  },
  reactStrictMode: true,
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // אפשר להוסיף פה configuration נוסף לפי הצורך
})(nextConfig);
