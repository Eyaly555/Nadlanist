import { ProjectConfigContainer } from "@/components/project-config/project-config-container";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "פרויקט חדש - נדלניסט AI",
  description: "צור פרויקט חדש עם נדלניסט AI",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
};

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <ProjectConfigContainer />
      </div>
    </main>
  );
}
