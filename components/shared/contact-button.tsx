"use client";

import { useState } from "react";
import { ContactForm } from "./contact-form";
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger
} from "@/components/ui/dialog";

interface ContactButtonProps {
  buttonText?: string;
  formTitle?: string;
  className?: string;
  source?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export function ContactButton({
  buttonText = "צור קשר",
  formTitle = "השאירו פרטים ונחזור אליכם",
  className = "",
  source = "button",
  variant = "primary"
}: ContactButtonProps) {
  const [open, setOpen] = useState(false);

  // Map variant to appropriate button styles
  const buttonStyles = {
    primary: "bg-[#008080] hover:bg-[#006666] text-white",
    secondary: "bg-[#588395] hover:bg-[#476a78] text-white",
    outline: "bg-transparent border border-[#008080] text-[#008080] hover:bg-[#00808010]",
    ghost: "bg-transparent text-[#008080] hover:bg-[#00808010]"
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button 
          className={`py-2 px-6 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#008080] focus:ring-opacity-50 ${buttonStyles[variant]} ${className}`}
        >
          {buttonText}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-none bg-white backdrop-blur-sm p-0 rounded-xl">
        <div className="p-4 md:p-5">
          <ContactForm 
            title={formTitle}
            source={source}
            buttonText="שלח פרטים"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 