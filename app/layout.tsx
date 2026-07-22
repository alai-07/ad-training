import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://adtraining.es";
const SITE_NAME = "AD Training";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  title: {
    default: "AD Training | Entrenamiento Online Personalizado",
    template: "%s | AD Training",
  },

  description:
    "Entrenamiento y nutrición personalizada para ayudarte a perder grasa, ganar masa muscular y mejorar tu rendimiento mediante un seguimiento individual.",

  keywords: [
    "entrenador personal",
    "entrenamiento online",
    "nutrición deportiva",
    "pérdida de grasa",
    "ganancia muscular",
    "plan de entrenamiento",
    "entrenamiento personalizado",
    "asesoramiento nutricional",
    "AD Training",
  ],

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "fitness",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "AD Training | Entrenamiento Online Personalizado",
    description:
      "Entrenamiento y nutrición personalizada con seguimiento individual para perder grasa, ganar masa muscular y mejorar tu rendimiento.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AD Training — Entrenamiento online personalizado",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AD Training | Entrenamiento Online Personalizado",
    description:
      "Entrenamiento y nutrición personalizada con seguimiento individual.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Servicio de entrenamiento online y nutrición personalizada con seguimiento individual.",
  image: `${SITE_URL}/og-image.png`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description:
    "Entrenamiento y nutrición personalizada para perder grasa, ganar masa muscular y mejorar el rendimiento.",
  inLanguage: "es-ES",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>

      <body className="flex min-h-full flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}