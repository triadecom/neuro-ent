"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useInView } from "motion/react";
import { FileAudio, Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GlowingDot } from "@/components/ui/section-badge";

// Pre-computed to avoid hydration mismatch (Math.random would differ server vs client)
const WAVEFORM_HEIGHTS = Array.from({ length: 20 }, (_, i) => 4 + (Math.sin(i * 1.3) + 1) * 8);

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      "bg-[#0D0D0D]/80 border border-white/10 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-center cursor-default hover:bg-white/5 transition-colors",
      className
    )}
  >
    <span className="text-white text-sm md:text-base font-medium">{children}</span>
  </div>
);

const SectionHeading = ({
  title, subtitle, tag, align = "left",
}: {
  title: React.ReactNode; subtitle: string; tag: string; align?: "left" | "right";
}) => {
  const isRight = align === "right";
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:gap-6 w-full",
        isRight ? "items-start text-left md:items-end md:text-right" : "items-start text-left"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 text-[#FB623F]",
          isRight ? "flex-row md:flex-row-reverse" : "flex-row"
        )}
      >
        <GlowingDot />
        <span className="text-sm font-normal">{tag}</span>
      </div>
      <h2 className="text-[28px] md:text-[38px] leading-[1.1] font-bold text-[#F5F5F5] tracking-tight whitespace-pre-line">
        {title}
      </h2>
      <p className="text-[15px] md:text-[16px] leading-[1.4] text-white/80 font-normal whitespace-pre-line max-w-[480px]">
        {subtitle}
      </p>
    </div>
  );
};

const InteractiveLessonCard = ({ className }: { className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      className={cn("z-30", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ perspective: 1000 }}
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-full h-full relative group flex items-center justify-center rounded-t-xl overflow-hidden shadow-2xl border border-white/10 bg-[#1A1A1A]">
          <div className="absolute inset-0 bg-[#FB623F]/5 blur-xl -z-10 transition-opacity opacity-0 group-hover:opacity-100 duration-500" />
          <div className="w-full h-full relative">
            <Image
              src="/assets/b2b1907c14d8b634181964ed1fae233e3d7bb87a.png"
              alt="Interactive Lesson Interface"
              fill
              className="object-cover object-top scale-[1.01]"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CourseGenerationVisual = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[520px] aspect-[520/340] bg-black rounded-[26px] overflow-hidden border border-white/5 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
      <InteractiveLessonCard className="absolute top-8 left-6 right-6 md:top-12 md:left-12 md:right-12 bottom-0" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-40" />
    </div>
  );
};

const AnalyticsVisual = () => {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setSelected(1), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[520px] aspect-[520/340] bg-black rounded-[26px] overflow-hidden border border-white/5 flex items-center justify-center shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-black to-[#FB623F]/5" />
      <div className="w-[90%] md:w-[85%] bg-[#151515] border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl relative z-10">
        <h3 className="text-white text-sm md:text-lg font-medium mb-4 leading-snug">
          Что делать, если клиент просит скидку больше 15%?
        </h3>
        <div className="space-y-2">
          {[
            { id: 0, label: "A", text: "Дать скидку для удержания" },
            { id: 1, label: "B", text: "Предложить расширенный пакет" },
            { id: 2, label: "C", text: "Отказать и объяснить ценность" },
          ].map((option) => (
            <motion.button
              key={option.id}
              className={cn(
                "w-full text-left p-2 md:p-3 rounded-lg flex items-center gap-3 transition-all duration-300 border",
                selected === option.id
                  ? "bg-[#1B3A2D] border-[#2D6A4F]"
                  : "bg-white/5 border-transparent hover:bg-white/10"
              )}
              onClick={() => setSelected(option.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={cn(
                  "w-5 h-5 md:w-6 md:h-6 shrink-0 rounded flex items-center justify-center text-[10px] md:text-xs font-bold transition-colors",
                  selected === option.id
                    ? "bg-[#10B981] text-black"
                    : "bg-white/10 text-white/50"
                )}
              >
                {option.label}
              </div>
              <span
                className={cn(
                  "text-xs md:text-sm font-medium line-clamp-1",
                  selected === option.id ? "text-[#10B981]" : "text-white/60"
                )}
              >
                {option.text}
              </span>
            </motion.button>
          ))}
        </div>
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#FB623F]"
            initial={{ width: "100%" }}
            whileInView={{ width: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 10, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

function GamificationTiltCard({ src, alt, className, initialY, delay = 0 }: {
  src: string; alt: string; className?: string; initialY: number; delay?: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  return (
    <motion.div
      className={cn("rounded-[14px] overflow-hidden shadow-2xl", className)}
      initial={{ y: initialY, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: "easeOut", delay }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-full h-full">
        <Image src={src} alt={alt} fill className="object-contain" sizes="280px" />
      </div>
    </motion.div>
  );
}

const GamificationVisual = () => (
  <div className="relative w-full max-w-[520px] aspect-[520/340] bg-black rounded-[26px] overflow-hidden border border-white/5 shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-t from-[#FB623F]/10 to-black" />
    <GamificationTiltCard
      src="/assets/podcast.png"
      alt="Podcast player"
      className="absolute left-[9.6%] top-[12%] w-[38%] h-[96%] z-10"
      initialY={120}
    />
    <GamificationTiltCard
      src="/assets/game.png"
      alt="Game interface"
      className="absolute right-[9.6%] bottom-[12%] w-[38%] h-[96%] z-10"
      initialY={-120}
      delay={0.1}
    />
    <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-14 bg-gradient-to-b from-black to-transparent z-30 pointer-events-none" />
  </div>
);

function AudioVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "0px 0px -50px 0px" });

  return (
    <div ref={containerRef} className="relative w-full max-w-[520px] aspect-[520/340] bg-black rounded-[26px] overflow-hidden border border-white/5 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#111] to-[#FB623F]/10" />
      <motion.div className="absolute top-6 md:top-10 left-8 right-8 md:left-12 md:right-12 bottom-20 bg-[#161616] rounded-xl border border-white/5 p-4 opacity-50 scale-95" />
      <motion.div
        className="absolute top-10 md:top-16 left-6 md:left-12 w-[80%] md:w-[75%] bg-[#1C1C1C] rounded-xl border border-white/10 p-4 md:p-5 shadow-2xl"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FB623F]/20 flex items-center justify-center text-[#FB623F]">
            <FileAudio size={18} />
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-medium text-white truncate">weekly-sales-sync.mp3</div>
            <div className="text-xs text-white/50">14.5 MB • Uploaded just now</div>
          </div>
        </div>
        <div className="h-6 md:h-8 flex items-center gap-[2px] opacity-80 mb-3 overflow-hidden">
          {WAVEFORM_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#FB623F] rounded-full flex-shrink-0"
              animate={isInView ? { height: [8, h, 8] } : { height: 8 }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-[#FB623F]">
          <span>Processing...</span>
          <span>84%</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-6 md:top-48 left-6 md:left-28 right-6 md:right-8 bg-[#0F0F0F] rounded-xl border border-[#FB623F]/50 p-3 md:p-4 shadow-2xl flex items-start gap-3 z-20"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div className="w-5 h-5 rounded-full bg-[#FB623F] flex items-center justify-center flex-shrink-0 mt-0.5">
          <Check size={12} className="text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-xs md:text-sm font-bold text-white mb-1">Готово! Курс «Регламент продаж Q1»</div>
          <div className="text-[10px] md:text-xs text-white/60 leading-tight">
            4 модуля, 12 вопросов, ~15 мин прохождения. Отправить команде?
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function NeuroMentorFeatures() {
  return (
    <section className="w-full bg-[#0A0A0A] text-white overflow-hidden py-16 md:py-24 flex flex-col items-center">
      <div className="max-w-[744px] text-center mb-16 md:mb-24 px-4">
        <div className="inline-flex items-center gap-2 bg-[#0D0D0D]/80 border border-[#FB623F]/25 rounded-full px-3 py-2 mb-6">
          <GlowingDot />
          <span className="text-[#FB623F] text-sm md:text-base">Функционал</span>
        </div>
        <h2 className="text-[32px] md:text-[48px] font-bold mb-6 leading-tight text-[#F5F5F5]">
          Что умеет Нейроментор?
        </h2>
        <p className="text-base md:text-xl text-[#CCCCCC] font-normal leading-relaxed">
          Всё что нужно, чтобы команда реально усваивала
          <br className="hidden md:block" />
          информацию с максимально удобной подачей
        </p>
      </div>

      <div className="w-full max-w-[1080px] px-4 flex flex-col gap-16 md:gap-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="flex flex-col gap-6 md:gap-8">
            <SectionHeading
              title={<>Курс или онбординг<br />из чего угодно за 5 минут</>}
              subtitle="Документ, ссылка, PDF, аудиозапись — или просто голосовое сообщение. Загрузите источник, и Нейроментор сам разобьёт материал на модули, сгенерирует вопросы и соберёт интерактивный курс. Без методологов и дизайнеров."
              tag="Обучение команды"
            />
            <div className="flex flex-wrap gap-2 md:gap-4">
              <Badge>Документы</Badge>
              <Badge>Аудио</Badge>
              <Badge>Ссылки</Badge>
              <Badge>Диалог</Badge>
            </div>
          </div>
          <div className="flex justify-center md:justify-end w-full">
            <CourseGenerationVisual />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1 flex justify-center md:justify-start w-full">
            <AnalyticsVisual />
          </div>
          <div className="order-1 md:order-2 flex flex-col gap-6 md:gap-8 items-start md:items-end md:text-right">
            <SectionHeading
              align="right"
              title={<>Аналитика понимания,<br />а не галочек</>}
              subtitle="Забудьте «прошёл / не прошёл». Нейроментор оценивает реальную глубину понимания: где сотрудник угадал, где сомневался, где точно не понял. Вы видите тепловую карту знаний по всей команде."
              tag="Обучение команды"
            />
            <div className="flex flex-wrap gap-2 md:gap-4 justify-start md:justify-end w-full">
              <Badge>Тестирование</Badge>
              <Badge>Аналитика</Badge>
              <Badge>Контроль обучения</Badge>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="flex flex-col gap-6 md:gap-8">
            <SectionHeading
              title={<>Обучение, которое<br />не хочется скипнуть</>}
              subtitle="Квизы с таймером, сценарные симуляции, интерактивные кейсы — формат, к которому привыкло поколение, выросшее на Duolingo. Геймификация поднимает вовлечённость с 23% до 94%."
              tag="Вовлечение и геймификация"
            />
            <div className="flex flex-wrap gap-2 md:gap-4">
              <Badge>Квизы</Badge>
              <Badge>Аудио подкасты</Badge>
              <Badge>Мини игры</Badge>
            </div>
          </div>
          <div className="flex justify-center md:justify-end w-full">
            <GamificationVisual />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1 flex justify-center md:justify-start w-full">
            <AudioVisual />
          </div>
          <div className="order-1 md:order-2 flex flex-col gap-6 md:gap-8 items-start md:items-end md:text-right">
            <SectionHeading
              align="right"
              title={<>Курсы из ваших аудио<br />за 5 минут</>}
              subtitle="Загрузите аудио или подключите Zoom/Google Meet. Нейроментор транскрибирует, вычленит ключевые знания, уберёт «ну», «э-э» и воду — и соберёт курс из чистого смысла."
              tag="Обучение команды"
            />
            <div className="flex flex-wrap gap-2 md:gap-4 justify-start md:justify-end w-full">
              <Badge>Транскрибация</Badge>
              <Badge>Zoom</Badge>
              <Badge>Google Meet</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
