"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function GlowingDot() {
  return (
    <div className="w-2 h-2 flex items-center justify-center relative">
      <motion.div
        className="absolute inset-0 rounded-full bg-[#FB623F]"
        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-[#FB623F] relative z-10"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 0px rgba(251,98,63,0)",
            "0 0 10px rgba(251,98,63,0.8)",
            "0 0 0px rgba(251,98,63,0)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function SectionBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-[rgba(13,13,13,0.8)] inline-flex gap-[8px] items-center px-[12px] py-[8px] rounded-[76px] relative",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(251,98,63,0.25)] border-solid inset-0 pointer-events-none rounded-[76px]"
      />
      <div className="shrink-0 size-[8px]">
        <svg className="block size-full" fill="none" viewBox="0 0 8 8">
          <circle cx="4" cy="4" fill="#FB623F" r="4" />
        </svg>
      </div>
      <span className="font-normal text-[#fb623f] text-[16px] tracking-[-0.6px] leading-[18px]">
        {children}
      </span>
    </div>
  );
}
