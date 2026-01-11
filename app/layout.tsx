import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import GrainOverlay from "./components/GrainOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import TechnicalFrame from "./components/TechnicalFrame";

export const metadata: Metadata = {
  title: "Théodore de Boisseson",
  description: "Portfolio Hybride | Tech & Art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GrainOverlay />
        <TechnicalFrame />
        {children}
      </body>
    </html>
  );
}
