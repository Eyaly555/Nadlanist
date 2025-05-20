export const siteConfig = {
  name: "נדלניסט AI",
  description: "Intelligent Project Scaffolding",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://cursor.new",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/cursor_new",
    github: "https://github.com/cursor-new",
  },
  nav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Projects",
      href: "/project",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
}; 