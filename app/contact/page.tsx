import { ContactForm } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "צור קשר | נדלניסט AI",
  description: "השאירו פרטים וצוות נדלניסט AI יחזור אליכם בהקדם",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-6 md:p-12">
      <section className="w-full max-w-4xl mx-auto">
        <ContactForm />
      </section>
    </main>
  );
}
