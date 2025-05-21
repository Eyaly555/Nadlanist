"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  delay?: number;
}

export function FeatureCard({ icon, title, desc, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full" //  נוסיף h-full גם על ה-motion.div כדי שימלא את תא הגריד
    >
      <Card className="flex flex-col items-center text-center rounded-2xl shadow-md h-full p-6 gap-2 transition-all duration-100 ease-in-out hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 border border-transparent bg-white">
        {/* הסרנו justify-between מה-Card כדי שה-CardContent יקבע את חלוקת המקום */}
        {/* הסרנו min-h-[320px] כדי לתת ל-Grid ול-h-full לשלוט יותר, או שנשאיר אותו אם רוצים גובה מינימלי מובטח */}
        <div className="w-12 h-12 mb-3 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-2xl">
          {icon}
        </div>
        {/* נוודא שה-CardContent ממלא את השטח ודוחף את האלמנטים 
          למעלה ולמטה בהתאם לצורך.
        */}
        <CardContent className="flex flex-col flex-1 items-center justify-start w-full p-0">
          {/* אם רוצים שהטקסט יתפוס מקום קבוע, אפשר להוסיף לו גובה מינימלי 
            או מספר שורות קבוע (עם Tailwind זה יותר מורכב ישירות לטקסט).
            הגישה הפשוטה היא לוודא שהטקסט תמיד יתחיל מאותה נקודה.
          */}
          <h3 className="text-lg md:text-xl font-bold text-dark mb-1 text-center">{title}</h3>
          <p className="text-base text-dark/80 tracking-normal text-center">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}