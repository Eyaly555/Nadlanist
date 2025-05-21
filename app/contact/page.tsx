import { ContactForm } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'צרו קשר – נדלניסט AI מזמינים אתכם',
  description: 'השאירו פרטים או פתחו צ\'אט ב-AI – נדלניסט AI כאן כדי להפוך תיווך נדל"ן לחוויה חכמה וקלה. נדבר?',
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-6 md:p-12">
      <h1 className="text-4xl md:text-5xl text-primary mb-4 leading-tight font-sans text-center">
        צרו קשר – נדלניסט AI מזמינים אתכם
      </h1>
      <section className="w-full max-w-4xl mx-auto">
        <ContactForm />
      </section>
    </main>
  );
}
