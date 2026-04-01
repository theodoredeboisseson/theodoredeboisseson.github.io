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
  metadataBase: new URL("https://theodoredeboisseson.github.io"),
  title: "Théodore de Boisseson",
  description: "Portfolio / Étudiant en Informatique & Créateur Numérique",
  openGraph: {
    title: "Théodore de Boisseson | Portfolio",
    description: "Portfolio de Théodore de Boisseson - Étudiant en Informatique & Création Numérique",
    url: "https://theodoredeboisseson.github.io",
    siteName: "Portfolio de Théodore",
    images: [
      {
        url: "/images/profile_picture.jpg",
        width: 1200,
        height: 1200,
        alt: "Théodore de Boisseson",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Théodore de Boisseson | Portfolio",
    description: "Portfolio de Théodore de Boisseson - Étudiant en Informatique & Création Numérique",
    images: ["/images/profile_picture.jpg"],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Théodore de Boisseson",
              "jobTitle": "Étudiant en Informatique & Création Numérique",
              "url": "https://theodoredeboisseson.github.io",
              "sameAs": [
                "https://github.com/theodoredeboisseson",
                "https://www.linkedin.com/in/theodoredeboisseson/"
              ],
              "description": "Portfolio de Théodore de Boisseson - Étudiant en Informatique et Création Numérique basé à Montpellier.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Montpellier",
                "addressCountry": "FR"
              }
            })
          }}
        />
        <GrainOverlay />
        <TechnicalFrame />
        {children}
      </body>
    </html>
  );
}
