"use client";

import { useEffect } from "react";
import { initializeClarity } from "@/lib/analytics/clarity";

export function ClarityProvider() {
  useEffect(() => {
    // Initialize Clarity only in the browser
    if (typeof window !== "undefined") {
      initializeClarity();
    }
  }, []);

  // This component doesn't render anything
  return null;
} 