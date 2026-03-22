import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

import GrainOverlay from "./components/ui/GrainOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import TechnicalFrame from "./components/ui/TechnicalFrame";
import React from "react";

export const metadata: Metadata = {
  title: "Théodore de Boisseson",
  description: "Portfolio / Étudiant en Informatique & Créateur Numérique",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        <GrainOverlay />
        <TechnicalFrame />
        {children}
      </body>
    </html>
  );
}
