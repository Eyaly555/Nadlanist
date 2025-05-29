"use client";

import Clarity from "@microsoft/clarity";

export const initializeClarity = () => {
  // Initialize Microsoft Clarity with the provided project ID
  const projectId = "rr2bddswty";
  
  try {
    Clarity.init(projectId);
    console.log("Microsoft Clarity initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Microsoft Clarity:", error);
  }
}; 