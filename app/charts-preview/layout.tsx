// צור קובץ חדש: app/charts-preview/layout.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "תצוגה מקדימה - גרפים חדשים",
  description: "תצוגה מקדימה של 6 רכיבים גרפיים חדשים לדשבורד נדלניסט",
};

export default function ChartsPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}