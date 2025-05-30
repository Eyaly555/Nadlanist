"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ContactButton } from "@/components/shared";
import { Menu } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export function MainNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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
    { name: "דשבורד", href: "/dashboard" },
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
        {/* Logo right (RTL) */}
        <div className="flex items-center order-1 rtl:order-1">
          <Link href="/" className="flex items-center focus-visible:outline-primary/70" aria-label="לדף הבית">
            <Logo width={200} height={40} className="transition-all duration-100" isInsideLink={true} />
          </Link>
        </div>
        {/* Desktop nav center */}
        <nav className="hidden md:flex items-center gap-x-6 text-right rtl flex-1 justify-center order-2 rtl:order-2">
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
        {/* Contact button left (RTL) */}
        <div className="hidden md:block order-3 rtl:order-3">
          <ContactButton
            buttonText="דברו איתנו"
            variant="primary"
            className="rounded-2xl px-6 py-2 shadow-md font-semibold focus-visible:outline-primary/70"
          />
        </div>
        {/* Hamburger menu for mobile (left side) */}
        <div className="md:hidden order-4 rtl:order-4">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="פתח תפריט">
                <Menu className="w-12 h-12 text-black" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-6 gap-6 flex flex-col items-end rtl">
              <nav className="flex flex-col gap-4 w-full">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={cn(
                      "text-lg font-medium py-2 px-2 rounded text-right w-full block",
                      isActive(item.href)
                        ? "text-primary font-bold bg-primary/10"
                        : "hover:text-primary text-dark"
                    )}
                    dir="rtl"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <ContactButton
                buttonText="דברו איתנו"
                variant="primary"
                className="rounded-2xl px-6 py-2 shadow-md font-semibold w-full"
              />
            </DrawerContent>
          </Drawer>
        </div>
      </header>
    );
  }

  // בגלילה: תפריט עליון מינימלי + כפתור צף
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 border-b h-[60px] flex items-center justify-between px-4 md:px-8 shadow-md">
        {/* Logo right (RTL) */}
        <div className="flex items-center order-1 rtl:order-1">
          <Link href="/" className="flex items-center focus-visible:outline-primary/70" aria-label="לדף הבית">
            <Logo width={160} height={32} className="transition-all duration-100" isInsideLink={true} />
          </Link>
        </div>
        {/* Desktop nav center */}
        <nav className="hidden md:flex items-center gap-x-6 text-right rtl flex-1 justify-center order-2 rtl:order-2">
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
        {/* Contact button left (RTL) */}
        <div className="hidden md:block order-3 rtl:order-3">
          <ContactButton
            buttonText="דברו איתנו"
            variant="primary"
            className="rounded-2xl px-6 py-2 shadow-md font-semibold focus-visible:outline-primary/70"
          />
        </div>
        {/* Hamburger menu for mobile (left side) */}
        <div className="md:hidden order-4 rtl:order-4">
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="פתח תפריט">
                <Menu className="w-7 h-7 text-black" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-6 gap-6 flex flex-col items-end rtl">
              <nav className="flex flex-col gap-4 w-full">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={cn(
                      "text-lg font-medium py-2 px-2 rounded text-right w-full block",
                      isActive(item.href)
                        ? "text-primary font-bold bg-primary/10"
                        : "hover:text-primary text-dark"
                    )}
                    dir="rtl"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <ContactButton
                buttonText="דברו איתנו"
                variant="primary"
                className="rounded-2xl px-6 py-2 shadow-md font-semibold w-full"
              />
            </DrawerContent>
          </Drawer>
        </div>
      </header>
      <div className="h-[60px]" />
      <ContactButton
        buttonText="דברו איתנו"
        variant="primary"
        className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full px-6 py-3 text-lg font-bold"
      />
    </>
  );
}
