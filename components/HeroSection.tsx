"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }

    const particles: Particle[] = [];
    const count = 60;
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < count; i++) {
      const isOrange = Math.random() < 0.3;
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: isOrange ? "251,98,63" : "245,245,245",
      });
    }

    let isVisible = true;

    const draw = () => {
      const r = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(251,98,63,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > r.width) p.vx *= -1;
        if (p.y < 0 || p.y > r.height) p.vy *= -1;
      }

      if (isVisible) animId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInvisible = !isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && wasInvisible) draw();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);
    draw();

    return () => {
      isVisible = false;
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100vh-59px)] overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <Image
          src="/assets/0ef80fc888ccf94149fa39a78418423763ee475a.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 z-[1]">
        <ParticleCanvas />
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[251px] z-[2]"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(ellipse 100% 50% at 50% 100%, rgba(251,98,63,0.3), rgba(251,98,63,0) 70%)",
        }}
      />

      <div className="relative z-[4] max-w-[1280px] mx-auto px-4 sm:px-6 min-h-[calc(100vh-59px)] flex items-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 w-full pt-[100px] lg:pt-[80px] pb-[60px] lg:pb-[120px]">
          {/* Left — Text */}
          <div className="flex-[1.2] flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-bold text-[28px] sm:text-[36px] lg:text-[48px] leading-[1.15] tracking-[-1.44px] text-[#f5f5f5] max-w-[666px]"
            >
              Обучайте свою команду
              <br />
              в 10 раз эффективнее
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="font-medium text-[14px] sm:text-[16px] leading-[22px] tracking-[-0.6px] text-white max-w-[454px] mt-5 lg:mt-8"
            >
              Загрузите регламент, запись митинга или просто расскажите боту — Нейроментор создаст курс, назначит его сотрудникам и проверит, что каждый реально усвоил материал.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex items-center justify-center lg:justify-start gap-3 mt-7 lg:mt-10"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#fb623f] text-white font-medium text-[14px] sm:text-[16px] tracking-[-0.6px] px-4 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] cursor-pointer"
              >
                <span>Связаться</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2.67 13.33L13.33 2.67" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2.67 2.67H13.33V13.33" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.a>
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center bg-[rgba(13,13,13,0.8)] text-white font-medium text-[14px] sm:text-[16px] tracking-[-0.6px] px-4 py-2.5 rounded-lg border border-[rgba(255,255,255,0.1)] cursor-pointer"
              >
                Тарифы
              </motion.a>
            </motion.div>
          </div>

          {/* Right — Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative flex-1 w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(251,98,63,0.15)] to-transparent blur-2xl" />
            <div className="relative rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(13,13,13,0.9)] backdrop-blur-sm overflow-hidden">
              <video
                src="https://neuromentor.ai/images/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                ref={(el) => { if (el) el.play().catch(() => {}); }}
                className="w-full object-cover aspect-video"
              />
            </div>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute left-4 -bottom-5 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(13,13,13,0.95)] backdrop-blur-sm px-4 py-3 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-[#fb623f] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <div>
                <div className="text-[11px] text-white font-medium">Курс создан</div>
                <div className="text-[10px] text-[rgba(255,255,255,0.4)]">за 2 минуты</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
