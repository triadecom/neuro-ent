"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { CheckIcon, CloseIcon, StarIcon, ArrowIcon } from "@/components/CheckIcon";

// ─── Feature types ─────────────────────────────────────────────────────────────

interface Feature {
  text: string;
  included: boolean;
}

// ─── Plan data ─────────────────────────────────────────────────────────────────

const freePlanFeatures: Feature[] = [
  { text: "1 нейроментор", included: true },
  { text: "Базовые шаблоны курсов", included: false },
  { text: "Генерация тестов (до 5/мес)", included: false },
  { text: "Аналитика обучения", included: false },
  { text: "Интеграция с LMS", included: false },
  { text: "Приоритетная поддержка", included: false },
];

const proPlanFeatures: Feature[] = [
  { text: "До 10 нейроменторов", included: true },
  { text: "Все шаблоны курсов", included: true },
  { text: "Безлимитная генерация тестов", included: true },
  { text: "Продвинутая аналитика", included: false },
  { text: "Интеграция с LMS", included: false },
  { text: "Приоритетная поддержка", included: false },
];

const enterprisePlanFeatures: Feature[] = [
  { text: "Безлимитные нейроменторы", included: true },
  { text: "Все шаблоны + кастомные", included: true },
  { text: "Безлимитная генерация тестов", included: true },
  { text: "Полная аналитика и отчёты", included: false },
  { text: "Интеграция с любой LMS", included: false },
  { text: "Выделенный менеджер 24/7", included: false },
];

// ─── PricingCard ───────────────────────────────────────────────────────────────

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  oldPrice?: string;
  period: string;
  buttonText: string;
  buttonStyle: "default" | "primary" | "outline";
  features: Feature[];
  highlighted?: boolean;
  showIcon?: boolean;
  iconColor?: string;
  showArrow?: boolean;
  isYearly?: boolean;
  isCustomPrice?: boolean;
}

function PricingCard({
  name, description, price, oldPrice, period, buttonText, buttonStyle,
  features, highlighted = false, showIcon = false, iconColor = "white",
  showArrow = false, isYearly = false, isCustomPrice = false,
}: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });
  const rotateX = useTransform(smoothY, [0, 1], [0.8, -0.8]);
  const rotateY = useTransform(smoothX, [0, 1], [-0.8, 0.8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const glowX = useTransform(smoothX, (v) => `${v * 100}%`);
  const glowY = useTransform(smoothY, (v) => `${v * 100}%`);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]: string[]) =>
      `radial-gradient(600px circle at ${x} ${y}, rgba(251,98,63,0.12) 0%, rgba(251,98,63,0.04) 40%, transparent 70%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ y: isHovered ? -2 : 0 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      transition={{ y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }}
      className="bg-black rounded-[16px] flex flex-col p-4 sm:p-[16px] md:p-[24px] relative flex-1 min-w-0 h-full overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[16px] border border-solid"
        animate={{
          borderColor: isHovered
            ? highlighted ? "rgba(251,98,63,1)" : "rgba(251,98,63,0.6)"
            : highlighted ? "rgba(251,98,63,1)" : "rgba(255,255,255,0.08)",
          boxShadow: isHovered
            ? "0 0 30px rgba(251,98,63,0.15), 0 8px 32px rgba(0,0,0,0.4)"
            : "none",
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[16px]"
        style={{ background: glowBackground }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -top-[50%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(251,98,63,0.10) 0%, transparent 70%)",
        }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <div className="flex flex-col flex-1 relative z-[1]">
        <div className="flex flex-col gap-[8px] mb-[16px]">
          <div className="flex items-center gap-[8px]">
            {showIcon && <StarIcon color={iconColor} />}
            <span className="font-bold text-[24px] text-white tracking-[-1.14px]">{name}</span>
          </div>
          <p className="font-normal text-[14px] text-[#ccc] tracking-[-1.14px] leading-normal whitespace-pre-line">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-[8px] mb-[36px] h-[42px]">
          {isCustomPrice ? (
            <span className="font-bold text-[28px] text-white tracking-[-1.14px]">{price}</span>
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                {isYearly && oldPrice && (
                  <motion.span
                    key="old-price"
                    initial={{ opacity: 0, x: -10, filter: "blur(6px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                    className="font-semibold text-[28px] text-[rgba(255,255,255,0.5)] line-through tracking-[-1.14px]"
                  >
                    {oldPrice}
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="flex items-center gap-[3px]">
                <motion.span
                  key={price}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  className="font-bold text-[28px] text-white tracking-[-1.14px]"
                >
                  {price}
                </motion.span>
                {period && (
                  <span className="font-light text-[16px] text-[rgba(255,255,255,0.6)]">
                    {period}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mt-auto mb-[54px]">
          <button
            className={`w-full rounded-[8px] relative px-[12px] py-[8px] cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98] ${
              buttonStyle === "primary" ? "bg-[#fb623f]" : "bg-[#0a0a0a]"
            }`}
          >
            <div
              aria-hidden="true"
              className={`absolute inset-0 pointer-events-none rounded-[8px] border border-solid ${
                buttonStyle === "outline"
                  ? "border-[#fb623f]"
                  : "border-[rgba(255,255,255,0.1)]"
              }`}
            />
            <div className="flex items-center justify-center gap-[8px]">
              <span
                className={`font-medium text-[16px] tracking-[-0.6px] ${
                  buttonStyle === "default" ? "text-[#ccc]" : "text-white"
                }`}
              >
                {buttonText}
              </span>
              {showArrow && <ArrowIcon />}
            </div>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] relative z-[1]">
        <span className="font-medium text-[16px] text-[#ccc] tracking-[-0.32px]">
          Что включено
        </span>
        <div className="flex flex-col gap-[10px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center gap-[10px] ${!feature.included ? "opacity-50" : ""}`}
            >
              {feature.included ? <CheckIcon /> : <CloseIcon />}
              <span
                className={`text-[16px] text-white tracking-[-0.32px] ${
                  feature.included ? "font-medium" : "font-normal"
                }`}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Toggle ────────────────────────────────────────────────────────────────────

function Toggle({
  isYearly, onToggle,
}: {
  isYearly: boolean; onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-[15px]">
      <motion.span
        animate={{ color: !isYearly ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="font-medium text-[16px] tracking-[-0.6px] cursor-pointer select-none"
        onClick={() => isYearly && onToggle()}
      >
        Ежемесячно
      </motion.span>

      <button
        onClick={onToggle}
        className="relative w-[66px] h-[30px] rounded-full cursor-pointer p-0 border-0 outline-none flex-shrink-0"
        style={{ background: "transparent" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border border-solid border-[rgba(255,255,255,0.1)]"
          animate={{ backgroundColor: isYearly ? "#fb623f" : "#333" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: isYearly
              ? "0 0 16px rgba(251,98,63,0.35)"
              : "0 0 0px rgba(251,98,63,0)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[4px] w-[22px] h-[22px] rounded-full bg-white"
          animate={{ left: isYearly ? 40 : 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
        />
      </button>

      <div className="flex items-center gap-[8px] min-w-[130px]">
        <motion.span
          animate={{ color: isYearly ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.5)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="font-medium text-[16px] tracking-[-0.6px] cursor-pointer select-none"
          onClick={() => !isYearly && onToggle()}
        >
          Ежегодно
        </motion.span>
        <AnimatePresence>
          {isYearly && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.7, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="font-medium text-[12px] text-[#fb623f] bg-[rgba(251,98,63,0.15)] rounded-full px-[8px] py-[2px] tracking-[-0.3px] whitespace-nowrap"
            >
              -20%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── CTA Section ───────────────────────────────────────────────────────────────

function CTASection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const glowX = useTransform(smoothX, (v) => `${v * 100}%`);
  const glowY = useTransform(smoothY, (v) => `${v * 100}%`);
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]: string[]) =>
      `radial-gradient(500px circle at ${x} ${y}, rgba(251,98,63,0.14) 0%, rgba(251,98,63,0.05) 40%, transparent 70%)`
  );

  return (
    <div
      ref={cardRef}
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[rgba(0,0,0,0.5)] rounded-[26px] w-full max-w-[800px] mx-auto overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        className="absolute border border-solid inset-0 pointer-events-none rounded-[26px]"
        animate={{
          borderColor: isHovered ? "rgba(251,98,63,0.85)" : "rgba(251,98,63,0.5)",
          boxShadow: isHovered
            ? "0 0 30px rgba(251,98,63,0.15), 0 8px 32px rgba(0,0,0,0.3)"
            : "none",
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[221px] opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(251,98,63,0.3) 0%, rgba(251,98,63,0) 70%)",
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[26px]"
        style={{ background: glowBackground }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <div className="relative flex flex-col items-center px-6 sm:px-12 md:px-[129px] py-8 gap-[48px]">
        <div className="flex flex-col items-center gap-[16px] w-full">
          <h2 className="font-bold text-[24px] sm:text-[28px] md:text-[32px] text-[#f5f5f5] text-center tracking-[-1.14px] leading-normal">
            Узнайте, как ваша команда может
            <br />
            обучаться в 3 раза быстрее
          </h2>
          <p className="font-medium text-[14px] sm:text-[16px] text-white text-center tracking-[-0.6px] leading-[22px]">
            30-минутное демо на ваших материалах
            <br />
            Без слайдов, без воды — покажем как ваша
            <br />
            база знаний превращается в курсы прямо в разговоре
          </p>
        </div>
        <button className="bg-[#fb623f] rounded-[8px] px-[12px] py-[8px] relative cursor-pointer transition-opacity hover:opacity-90">
          <div
            aria-hidden="true"
            className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]"
          />
          <span className="font-medium text-[16px] text-white tracking-[-0.6px]">
            Запросить демо
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(245,245,245,0.1)] mt-auto">
      <div className="max-w-[1128px] mx-auto px-4 sm:px-6 lg:px-8 py-[40px]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-normal text-[16px] text-[#f5f5f5] tracking-[-0.48px]">
            © 2025 Neuromentor
          </span>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[30px]">
            <a
              href="#"
              className="font-normal text-[16px] text-[#f5f5f5] tracking-[-0.48px] hover:opacity-80 transition-opacity"
            >
              Пользовательское соглашение
            </a>
            <a
              href="#"
              className="font-normal text-[16px] text-[#f5f5f5] tracking-[-0.48px] hover:opacity-80 transition-opacity"
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PricingSection ────────────────────────────────────────────────────────────

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);
  const proMonthly = "2 990₽";
  const proYearly = "2 390₽";
  const proOldPrice = "2 990₽";

  return (
    <section id="pricing" className="bg-[#0a0a0a] flex flex-col">
      <main className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-[128px]">
        <h2 className="font-bold text-[32px] sm:text-[38px] text-[#f5f5f5] text-center tracking-[-1.14px] mb-16 sm:mb-20 md:mb-[96px]">
          Тарифы
        </h2>

        <div className="mb-8">
          <Toggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
        </div>

        <div className="w-full max-w-[1080px] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-[42px] items-stretch mb-16 sm:mb-20 md:mb-[128px]">
          <PricingCard
            name="Бесплатный"
            description={"Базовый доступ к функциям\nнейроментора"}
            price="0₽"
            period="/месяц"
            buttonText="Уже включено"
            buttonStyle="default"
            features={freePlanFeatures}
            isYearly={isYearly}
          />
          <PricingCard
            name="Pro"
            description={"Идеально подходит\nдля большинства пользователей"}
            price={isYearly ? proYearly : proMonthly}
            oldPrice={isYearly ? proOldPrice : undefined}
            period="/месяц"
            buttonText="Выбрать тариф"
            buttonStyle="primary"
            features={proPlanFeatures}
            highlighted
            showIcon
            iconColor="white"
            isYearly={isYearly}
          />
          <PricingCard
            name="Enterprise"
            description={"Для крупных команд\nс индивидуальными потребностями"}
            price="По запросу"
            period=""
            buttonText="Связаться"
            buttonStyle="outline"
            features={enterprisePlanFeatures}
            showIcon
            iconColor="#FB623F"
            showArrow
            isYearly={isYearly}
            isCustomPrice
          />
        </div>

        <CTASection />
      </main>

      <Footer />
    </section>
  );
}
