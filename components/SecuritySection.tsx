"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/section-badge";
import svgPaths from "@/lib/svg-designflex";

const cardGradientBg = `url('data:image/svg+xml;utf8,<svg viewBox="0 0 344 226" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><rect x="0" y="0" height="100%25" width="100%25" fill="url(%23grad)" opacity="0.5"/><defs><radialGradient id="grad" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="10" gradientTransform="matrix(26.432 50.657 -10.504 22.6 184.01 -0.000013036)"><stop stop-color="rgba(251,98,63,0)" offset="0"/><stop stop-color="rgba(255,68,0,0.1)" offset="1"/></radialGradient></defs></svg>')`;

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[rgba(13,13,13,0.8)] inline-flex items-center px-[12px] py-[8px] rounded-[8px] relative">
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
      <span className="font-medium text-[16px] text-white tracking-[-0.6px] leading-[18px]">
        {children}
      </span>
    </div>
  );
}

function FeatureCard({
  icon, title, description,
}: {
  icon: string; title: string; description: string;
}) {
  return (
    <div
      className="flex-1 min-w-0 rounded-[16px] relative"
      style={{ backgroundImage: cardGradientBg }}
    >
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[16px]"
      />
      <div className="flex flex-col gap-[20px] items-start p-[24px]">
        <div className="shrink-0 size-[36px] relative">
          <Image
            alt=""
            fill
            className="object-cover pointer-events-none"
            src={icon}
            sizes="36px"
          />
        </div>
        <div className="flex flex-col gap-[12px] w-full">
          <span className="font-bold text-[20px] text-white tracking-[-0.6px] leading-[22px]">
            {title}
          </span>
          <p className="font-normal text-[#ccc] text-[16px] tracking-[-0.48px] leading-[21.76px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function DsgnflexLogo() {
  return (
    <div className="h-[32px] w-[214px] shrink-0">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 128.061 19.0861"
      >
        <g>
          <path d={svgPaths.p14f25780} fill="white" />
          <path d={svgPaths.p123f14c0} fill="white" />
          <path d={svgPaths.pe1e8c00} fill="white" />
          <path d={svgPaths.p14951900} fill="white" />
          <path d={svgPaths.p2f87b180} fill="white" />
          <path d={svgPaths.p1e369400} fill="white" />
          <path d={svgPaths.p1f451780} fill="white" />
          <path d={svgPaths.p29f59a00} fill="white" />
          <path d={svgPaths.pabd7a80} fill="white" />
          <path d={svgPaths.pb451800} fill="white" />
          <path d={svgPaths.pdf15280} fill="white" />
          <path d={svgPaths.p4ce6b00} fill="white" />
          <path d={svgPaths.pf122800} fill="white" />
        </g>
      </svg>
    </div>
  );
}

export function SecuritySection() {
  return (
    <div className="bg-[#0a0a0a] w-full">
      {/* Security */}
      <section className="flex flex-col items-center gap-[53px] w-full max-w-[1080px] mx-auto px-[24px] py-[80px] lg:py-[120px]">
        <div className="flex flex-col gap-[16px] items-center">
          <SectionBadge>Безопасность</SectionBadge>
          <div className="flex flex-col items-center gap-[18px]">
            <div className="font-bold text-[#f5f5f5] text-[32px] lg:text-[38px] text-center tracking-[-1.14px] leading-[1.1]">
              <p>Безопасное решение</p>
              <p>для вашего бизнеса</p>
            </div>
            <p className="font-medium text-[#ccc] text-[18px] lg:text-[20px] text-center tracking-[-0.6px] leading-[22px] max-w-[660px]">
              Нейроментор — не только облако. Разворачиваем внутри вашего контура, подключаем к вашим моделям, соблюдаем все стандарты.
            </p>
          </div>
          <div className="flex gap-[12px] items-center flex-wrap justify-center mt-[2px]">
            <Tag>On premise</Tag>
            <Tag>Приватность</Tag>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[24px] w-full">
          <FeatureCard
            icon="/assets/6045a9c5f32c4e3e68a7fcbd45b89fd829a92f1f.png"
            title="Коробочное решение"
            description="Полностью автономная установка внутри вашей инфраструктуры. Данные не покидают ваш контур — никогда"
          />
          <FeatureCard
            icon="/assets/2316847e659bd3bcbd1d5c79bc96311d1a23fd77.png"
            title="Защищённые серверы"
            description="Шифрование end-to-end, SOC 2 compliance, разграничение ролей и доступов. Ваши корпоративные данные в безопасности"
          />
          <FeatureCard
            icon="/assets/cd91e0edfe6fb8f7e5e80c0bb4e656f74d911e2e.png"
            title="Локальные модели"
            description="Работаем с вашими on-premise LLM моделями. Никакие данные не передаются во внешние сервисы"
          />
        </div>
      </section>

      {/* Case */}
      <section className="flex flex-col items-center gap-[58px] w-full max-w-[1080px] mx-auto px-[24px] pb-[80px] lg:pb-[120px]">
        <div className="flex flex-col gap-[16px] items-center">
          <SectionBadge>Результаты</SectionBadge>
          <div className="font-bold text-[#f5f5f5] text-[32px] lg:text-[38px] text-center tracking-[-1.14px] leading-[41.8px]">
            Кейс применения Нейроментора
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-[46px] items-stretch w-full">
          <div className="w-full lg:w-[521px] shrink-0 overflow-hidden rounded-[26px]">
            <div className="bg-black rounded-[26px] relative h-full">
              <div className="px-[28px] pt-[32px]">
                <motion.div
                  initial={{ y: 120, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ rotate: 3, scale: 1.03 }}
                >
                  <Image
                    alt="DesignFlex interface"
                    className="w-full rounded-[9px] object-cover"
                    src="/assets/de4c941c02584f9539765fdabad9fd94903206ea.png"
                    width={411}
                    height={320}
                  />
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-[20px] right-[20px] h-[91px] bg-gradient-to-b from-transparent via-black via-[82.6%] to-black" />
            </div>
          </div>

          <div className="flex flex-col gap-[31px] w-full lg:max-w-[492px]">
            <div className="flex flex-col gap-[16px]">
              <DsgnflexLogo />
              <div className="flex flex-col gap-[8px]">
                <div
                  className="font-roboto font-medium text-[20px] lg:text-[24px] text-white leading-normal"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <p>Сократили процесс обучения на 70%</p>
                  <p>в нашем проекте DesignFlex</p>
                </div>
                <p className="font-normal text-[#ccc] text-[16px] tracking-[-0.6px] leading-[22px]">
                  До Нейроментора онбординг в DesignFlex занимал неделю и требовал ручной подготовки материалов. Теперь платформа делает это автоматически.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] text-[20px] text-white tracking-[-0.6px]">
              <p className="font-bold leading-[26px]">Результат:</p>
              <ul className="font-normal list-disc ml-[24px] leading-[28px]">
                <li>70% быстрее обучение</li>
                <li>20% меньше затрат</li>
                <li>Онбординг за 2 дня вместо недели</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
