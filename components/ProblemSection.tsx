"use client";

import { motion } from "motion/react";
import Image from "next/image";
import svgPaths from "@/lib/svg-logo";

const cards = [
  {
    image: "/assets/6150f6ca5b99ded6a4df4f41e2f8b08adddf1e75.png",
    imageW: 179, imageH: 149,
    badge: "80% за 7 дней",
    badgeIcon: true,
    title: "Эффект\nдырявого ведра",
    desc: "80% информации с тренингов забывается через неделю. Вы оплачиваете знания, которые утекают быстрее, чем применяются.",
  },
  {
    image: "/assets/951d4b42315a4cd0eb48c7b387965722e1b740cc.png",
    imageW: 193, imageH: 167,
    badge: "~20 ч на 1 курс",
    badgeIcon: false,
    title: "Долгий онбординг новых сотрудников",
    desc: "Сеньоры тратят 20+ часов на ответы на одни и те же вопросы. Создание одного курса — 2-3 недели. За это время материалы уже устарели.",
  },
  {
    image: "/assets/1788929df944f12cf9b24b33dc38280f4aca880e.png",
    imageW: 157, imageH: 154,
    badge: "~12% читают",
    badgeIcon: false,
    title: "Wiki, которую никто не открывает",
    desc: "Базы знаний в Notion/Confluence устаревают быстрее, чем их успевают дописывать",
  },
];

function ProblemCard({ card, index }: { card: (typeof cards)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex-1 min-w-[280px] rounded-[20px] border border-[rgba(255,255,255,0.1)] overflow-hidden relative group"
      style={{
        backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 347 428" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%25" width="100%25" fill="url(%23grad)" opacity="0.5"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(26.637 95.935 -10.585 42.8 185.44 -0.000024688)"><stop stop-color="rgba(251,98,63,0)" offset="0"/><stop stop-color="rgba(255,68,0,0.1)" offset="1"/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(0,0,0) 0%, rgb(0,0,0) 100%)`,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-8 p-6 h-full"
      >
        <div className="h-[154px] relative flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
          >
            <Image
              src={card.image}
              alt=""
              width={card.imageW}
              height={card.imageH}
              sizes="(max-width: 1024px) 50vw, 200px"
              className="object-cover pointer-events-none"
            />
          </motion.div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-start">
            <div className="inline-flex items-center gap-1.5 bg-[rgba(13,13,13,0.8)] border border-[rgba(251,98,63,0.5)] rounded-lg px-2 py-1">
              {card.badgeIcon && (
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 8 11" fill="none">
                    <path d={svgPaths.p1961bc00} fill="#FB623F" />
                  </svg>
                </div>
              )}
              <span className="font-medium text-[14px] text-[#fb623f] tracking-[-0.6px] leading-[18px]">
                {card.badge}
              </span>
            </div>
          </div>

          <div className="font-bold text-[20px] text-white tracking-[-0.6px] leading-[22px] whitespace-pre-line">
            {card.title}
          </div>

          <p className="font-normal text-[16px] text-[#ccc] tracking-[-0.48px] leading-[21.76px]">
            {card.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProblemSection() {
  return (
    <section className="relative py-24" id="about">
      <div className="max-w-[1128px] mx-auto px-6">
        <div className="flex flex-col items-center gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[rgba(13,13,13,0.8)] border border-[rgba(251,98,63,0.25)] rounded-full px-3 py-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#fb623f]">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[#fb623f]"
              />
            </div>
            <span className="font-normal text-[16px] text-[#fb623f] tracking-[-0.6px] leading-[18px]">
              Проблема
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center gap-6 max-w-[744px] text-center"
          >
            <h2 className="font-bold text-[38px] leading-[41.8px] tracking-[-1.14px] text-[#f5f5f5]">
              Куда уходит бюджет на обучение сотрудников?
            </h2>
            <p className="font-medium text-[20px] leading-[22px] tracking-[-0.6px] text-[#ccc]">
              Три причины, почему ваши вложения в обучение не окупаются
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          {cards.map((card, i) => (
            <ProblemCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
