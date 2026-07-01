import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ScrollProgress from "@/components/ui/scroll-progress";
import "./globals.css";

const SITE_URL = "https://jonattan-anaya-dev.vercel.app";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pablo Jonattan Alonso Anaya — Data & Software Engineer",
    template: "%s | Pablo Jonattan Alonso Anaya",
  },
  description:
    "Portafolio de Pablo Jonattan Alonso Anaya, Ingeniero en Informática especializado en desarrollo de software, bases de datos, automatización ETL y análisis de datos.",
  keywords: [
    "Pablo Jonattan Alonso Anaya",
    "Data Developer",
    "Data Analyst",
    "SQL Server",
    "Python",
    "Django",
    "Power BI",
    "Portafolio",
    "Ingeniero de Software",
    "ETL",
    "Automatización",
  ],
  authors: [{ name: "Pablo Jonattan Alonso Anaya" }],
  creator: "Pablo Jonattan Alonso Anaya",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Pablo Jonattan Alonso Anaya — Portfolio",
    title: "Pablo Jonattan Alonso Anaya — Data & Software Engineer",
    description:
      "Ingeniero en Informática especializado en desarrollo de software, bases de datos, automatización ETL y análisis de datos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pablo Jonattan Alonso Anaya — Data & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pablo Jonattan Alonso Anaya — Data & Software Engineer",
    description:
      "Ingeniero en Informática especializado en desarrollo de software, bases de datos, automatización ETL y análisis de datos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-bg text-text antialiased">
        <ScrollProgress />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:text-bg focus:outline-none"
        >
          Saltar al contenido principal
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
