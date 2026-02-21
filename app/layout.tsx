import type { Metadata } from "next";
import { Onest, Roboto } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Нейроментор — Превратите любой контент в обученную команду",
  description:
    "Загрузите регламент, запись митинга или просто расскажите боту — Нейроментор создаст курс, назначит его сотрудникам и проверит, что каждый реально усвоил материал.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body
        className={`${onest.variable} ${roboto.variable} font-sans bg-[#0a0a0a] min-h-screen w-full overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
