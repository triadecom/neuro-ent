"use client";

import { motion } from "motion/react";
import svgPaths from "@/lib/svg-logo";

export function Header() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-[#353535] px-6 py-4"
    >
      <div className="max-w-[1128px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="shrink-0 w-[144px] h-[25px]">
          <svg className="block w-full h-full" fill="none" viewBox="0 0 144 25">
            <g clipPath="url(#clip0_logo)">
              <path d={svgPaths.p9df7d00} fill="#F5F5F5" />
              <path d={svgPaths.p3ebcf380} fill="#F5F5F5" />
              <path d={svgPaths.p6323f00} fill="#F5F5F5" />
              <path d={svgPaths.p3ea3fa00} fill="#F5F5F5" />
              <path d={svgPaths.p9d0a480} fill="#F5F5F5" />
              <path d={svgPaths.p38da500} fill="#F5F5F5" />
              <path d={svgPaths.p1a5cadf0} fill="#F5F5F5" />
              <path d={svgPaths.p10e0d500} fill="#F5F5F5" />
              <path d={svgPaths.p341cb00} fill="#F5F5F5" />
              <path d={svgPaths.p2fba90f0} fill="#F5F5F5" />
              <path d={svgPaths.p9a74680} fill="#F5F5F5" />
              <path clipRule="evenodd" d={svgPaths.p22d34d80} fill="#F5F5F5" fillRule="evenodd" />
              <path d={svgPaths.p3f48f000} fill="#FB623F" />
            </g>
            <defs>
              <clipPath id="clip0_logo">
                <rect fill="white" height="25" width="144" />
              </clipPath>
            </defs>
          </svg>
        </a>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-8 lg:gap-10">
          <a
            href="#about"
            className="font-medium text-[16px] text-[#f5f5f5] tracking-[-0.6px] leading-[22px] hover:text-[#fb623f] transition-colors"
          >
            О Нейроменторе
          </a>
          <span className="font-bold text-[20px] text-[rgba(245,245,245,0.4)] tracking-[-0.6px]">/</span>
          <a
            href="#pricing"
            className="font-medium text-[16px] text-[#f5f5f5] tracking-[-0.6px] leading-[22px] hover:text-[#fb623f] transition-colors"
          >
            Тарифы
          </a>
          <span className="font-bold text-[20px] text-[rgba(245,245,245,0.4)] tracking-[-0.6px]">/</span>
          <a
            href="#contact"
            className="font-medium text-[16px] text-[#f5f5f5] tracking-[-0.6px] leading-[22px] hover:text-[#fb623f] transition-colors"
          >
            Связаться
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
