/* שינויי צבע בלבד – ללא שינוי מבני או טיפוגרפי */
"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

interface PainSolutionItem {
  pain: string;
  solution: string;
}

interface PainSolutionCardsProps {
  items: PainSolutionItem[];
}

export function PainSolutionCards({ items }: PainSolutionCardsProps) {
  return (
    <div className="flex flex-col gap-8 md:gap-12 w-full">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: "circOut" }}
          className="relative flex flex-col md:flex-row items-stretch w-full"
        >
          {/* Pain Card */}
          <div
            className="flex-1 bg-[#588395] text-white rounded-[32px] rounded-tr-[32px] rounded-tl-none md:rounded-tl-[32px] md:rounded-tr-none shadow-md p-6 md:p-8 flex flex-col items-center md:items-end justify-between min-h-[180px] md:min-h-[160px] border-0"
            style={{ boxShadow: "0 4px 16px 0 rgba(88,131,149,0.15)" }}
          >
            <X size={48} className="text-[#DBEDED] mb-2" aria-label="כאב" />
            <div className="w-full text-center md:text-right">
              <div className="font-semibold text-white/80 text-lg mb-1">
                הכאב
              </div>
              <div className="font-bold text-xl mb-1">{item.pain}</div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex items-center justify-center mx-0 md:mx-2 my-2 md:my-0">
            {/* Desktop: Arrow/Wave, Mobile: Line+Dot */}
            <div className="hidden md:flex items-center h-full">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 40C24 8 40 40 40 8"
                  stroke="#00A6A2"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon
                  points="40,8 44,16 36,16"
                  fill="#00A6A2"
                />
              </svg>
            </div>
            <div className="md:hidden flex flex-col items-center justify-center h-full">
              <div className="w-1 h-6 bg-[#00A6A2] rounded-full" />
              <div className="w-3 h-3 bg-[#00A6A2] rounded-full my-1" />
              <div className="w-1 h-6 bg-[#00A6A2] rounded-full" />
            </div>
          </div>

          {/* Solution Card */}
          <div
            tabIndex={0}
            className="flex-1 bg-[#DBEDED] text-[#121B28] rounded-[32px] rounded-tl-[32px] rounded-tr-none md:rounded-tr-[32px] md:rounded-tl-none shadow-md p-6 md:p-8 flex flex-col items-center md:items-start justify-between min-h-[180px] md:min-h-[160px] border-2 border-[#00A6A2] transition-all duration-200 focus:border-4 focus:shadow-lg hover:border-4 hover:shadow-lg outline-none"
            style={{ boxShadow: "0 4px 16px 0 rgba(0,166,162,0.15)" }}
          >
            <Check size={48} className="text-[#00A6A2] mb-2" aria-label="פתרון" />
            <div className="w-full text-center md:text-left">
              <div className="font-semibold text-[#588395] text-lg mb-1">
                הפתרון
              </div>
              <div className="font-bold text-xl mb-1">{item.solution}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
