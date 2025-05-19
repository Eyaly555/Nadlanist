import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  className?: string;
  imageOverlay?: boolean;
  children?: React.ReactNode;
}

export function HeroBanner({
  title,
  subtitle,
  className,
  imageOverlay = true,
  children,
}: HeroBannerProps) {
  return (
    <div className={cn("relative w-full h-[300px] md:h-[450px]", className)}>
      {/* Background Image */}
      <Image
        src="/Linkedin Cover.png"
        alt="באנר נדלניסט AI – קונים? מוכרים? נדלניסט"
        fill
        priority
        className="object-cover"
      />
      
      {/* Optional overlay for better text readability */}
      {imageOverlay && (
        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
      )}
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white z-10">
        {title && (
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
        )}
        
        {subtitle && (
          <p className="text-lg md:text-xl mb-8 max-w-2xl">{subtitle}</p>
        )}
        
        {children}
      </div>
    </div>
  );
} 