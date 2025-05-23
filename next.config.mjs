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
              imgSrc: ["'self'", "data:", "https://maps.googleapis.com", "https://maps.gstatic.com", "https://*.google.com", "https://*.googleusercontent.com"],
              connectSrc: ["'self'", "https://maps.googleapis.com", "https://maps.gstatic.com", "https://*.googleapis.com", "https://*.gstatic.com", "https://umnrabdyhvegsvomyfkv.supabase.co"],
              fontSrc: ["'self'", "https://fonts.gstatic.com"],
              objectSrc: ["'none'"],
              baseUri: ["'self'"],
              formAction: ["'self'"],
              frameAncestors: ["'none'"],
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
