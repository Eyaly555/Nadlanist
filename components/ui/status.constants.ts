// קבועי סטטוסים, תרגום, סדר עדיפויות, מיפוי מרקרים וגרדיאנטים

// English statuses from API (as keys)
export const API_STATUSES = {
  COMPLETED: "Completed",
  UNDER_CONSTRUCTION: "Under Construction",
  TOPPED_OUT: "Topped Out",
  PROPOSED: "Proposed",
  PLANNED: "Planned",
  UNKNOWN: "סטטוס לא מוגדר" // Fallback for undefined/unknown status
} as const;

// Type for API status strings
export type ApiStatus = typeof API_STATUSES[keyof typeof API_STATUSES];

// Mapping from API English status to Hebrew display name
export const API_STATUS_TO_HEBREW_MAP: Record<ApiStatus, string> = {
  [API_STATUSES.COMPLETED]: "הושלם",
  [API_STATUSES.UNDER_CONSTRUCTION]: "בבנייה",
  [API_STATUSES.TOPPED_OUT]: "מקסימום גובה",
  [API_STATUSES.PROPOSED]: "פרויקט עתידי",
  [API_STATUSES.PLANNED]: "בתכנון",
  [API_STATUSES.UNKNOWN]: "סטטוס לא מוגדר"
};

// Order of precedence for API statuses (most advanced first)
export const API_STATUS_ORDER: ApiStatus[] = [
  API_STATUSES.COMPLETED,
  API_STATUSES.TOPPED_OUT,
  API_STATUSES.UNDER_CONSTRUCTION,
  API_STATUSES.PLANNED,    // Assuming Planned is more advanced than Proposed
  API_STATUSES.PROPOSED,
  API_STATUSES.UNKNOWN
];

// Mapping from API English status to marker image file
export const API_STATUS_MARKER_MAP: Record<ApiStatus, string> = {
  [API_STATUSES.COMPLETED]: "/mark4.png",         // Emerald to Lime
  [API_STATUSES.TOPPED_OUT]: "/mark3.png",        // Purple to Blue
  [API_STATUSES.UNDER_CONSTRUCTION]: "/mark2.png",// Coral to Magenta
  [API_STATUSES.PLANNED]: "/marker_logo.png",   // Teal (shared)
  [API_STATUSES.PROPOSED]: "/marker_logo.png",  // Teal (shared)
  [API_STATUSES.UNKNOWN]: "/marker_logo.png"    // Default
};

// Mapping from API English status to Tailwind CSS gradient class for containers/tags
export const API_STATUS_GRADIENT_MAP: Record<ApiStatus, string> = {
  [API_STATUSES.COMPLETED]: "bg-gradient-to-b from-[#2ECC71] to-[#A6FF00]",       // Emerald to Lime (mark4)
  [API_STATUSES.TOPPED_OUT]: "bg-gradient-to-b from-[#6A0DAD] to-[#00BFFF]",      // Purple to Blue (mark3)
  [API_STATUSES.UNDER_CONSTRUCTION]: "bg-gradient-to-b from-[#FF6F61] to-[#FF007F]", // Coral to Magenta (mark2)
  [API_STATUSES.PLANNED]: "bg-[#00A6A2]",                                       // Teal (marker_logo)
  [API_STATUSES.PROPOSED]: "bg-[#00A6A2]",                                      // Teal (marker_logo)
  [API_STATUSES.UNKNOWN]: "bg-gray-200"                                          // Default gray
}; 