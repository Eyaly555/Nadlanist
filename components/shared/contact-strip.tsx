"use client";

import { ContactForm } from "./contact-form";

interface ContactStripProps {
  title?: string;
  backgroundColor?: string;
}

export function ContactStrip({ 
  title = "השאירו פרטים ונחזור אליכם", 
  backgroundColor = "bg-[#588395]" 
}: ContactStripProps) {
  return (
    <section className={`${backgroundColor} py-10 w-full`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-sm">
          <ContactForm 
            title={title} 
            className="max-w-2xl mx-auto"
            buttonText="שלח פרטים"
          />
        </div>
      </div>
    </section>
  );
} 