// Extend Window interface globally for Facebook Pixel
interface Window {
  fbq?: (...args: unknown[]) => void;
} 