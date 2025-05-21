import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  variant?: 'black' | 'white';
  /**
   * If true, disables internal <Link> wrapping to avoid nested <a> tags.
   */
  isInsideLink?: boolean;
}

export function Logo({
  className,
  width,
  height,
  href = '/',
  variant = 'black',
  isInsideLink = false,
}: LogoProps) {
  const logoSrc = variant === 'white' ? '/logo-white.svg' : '/logo-black.png';
  const logoSize = { width: width || 180, height: height || 36 };
  const altText = 'לוגו נדלניסט AI';

  const logoComponent = (
    <Image
      src={logoSrc}
      alt={altText}
      width={logoSize.width}
      height={logoSize.height}
      className={cn('object-contain', className)}
      priority
    />
  );

  if (href && !isInsideLink) {
    return (
      <Link href={href} className="focus:outline-none" aria-label="לדף הבית">
        {logoComponent}
      </Link>
    );
  }

  return logoComponent;
} 