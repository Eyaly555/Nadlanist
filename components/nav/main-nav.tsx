"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position to shrink header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: "דף הבית", href: "/" },
    { name: "קונים", href: "/buyers" },
    { name: "מוכרים", href: "/sellers" },
    { name: "יזמים", href: "/developers" },
    { name: "החזון שלנו", href: "/vision" },
    { name: "צור קשר", href: "/contact" },
  ];

  const isActive = (path: string) => pathname === path;

  if (!scrolled) {
    return (
      <header className="w-full bg-white/80 border-b h-[80px] flex items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center focus-visible:outline-primary/70" aria-label="לדף הבית">
          <Logo width={200} height={40} className="transition-all duration-200" />
        </Link>
        <nav className="hidden md:flex items-center gap-x-6 text-right rtl flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap min-w-fit text-base font-medium transition-colors relative py-1 px-3 rounded focus-visible:outline-primary/70 text-right",
                isActive(item.href)
                  ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-full after:h-[2px] after:bg-primary"
                  : "hover:text-primary text-dark"
              )}
              dir="rtl"
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button
            variant="default"
            className="rounded-2xl px-6 py-2 shadow-md font-semibold focus-visible:outline-primary/70"
          >
            דברו איתנו
          </Button>
        </div>
      </header>
    );
  }

  // בגלילה: תפריט עליון מינימלי + כפתור צף
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 border-b h-[60px] flex items-center justify-between px-4 md:px-8 shadow-md">
        <Link href="/" className="flex items-center focus-visible:outline-primary/70" aria-label="לדף הבית">
          <Logo width={160} height={32} className="transition-all duration-200" />
        </Link>
        <nav className="hidden md:flex items-center gap-x-6 text-right rtl flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap min-w-fit text-base font-medium transition-colors relative py-1 px-3 rounded focus-visible:outline-primary/70 text-right",
                isActive(item.href)
                  ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-full after:h-[2px] after:bg-primary"
                  : "hover:text-primary text-dark"
              )}
              dir="rtl"
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>
      <div className="h-[60px]" />
      <Button
        asChild
        className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full px-6 py-3 text-lg font-bold"
        size="lg"
      >
        <Link href="/contact">
          דברו איתנו
        </Link>
      </Button>
    </>
  );
}
