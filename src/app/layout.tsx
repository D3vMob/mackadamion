import "~/styles/globals.css";
import { Toaster } from "sonner";

import { GeistSans } from "geist/font/sans";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mackadamion Music Agency | Global Music Production and Advocacy Led by Danny Scopelleti",
  description: "Mackadamion is a premier music and placement agency founded by seasoned singer-songwriter Danny Scopelleti. With nearly 20 years of industry expertise, we produce music for artists across New York, Los Angeles, Montreal, and Europe. In 2024, we showcased our impact by presenting the official ARDN theme song at the United Nations Assembly, highlighting our dedication to global music and advocacy.",
  
  // Basic metadata
  keywords: ["music agency", "music production", "Danny Scopelleti", "global music", "music advocacy"],
  authors: [{ name: "Danny Scopelleti" }],
  creator: "Danny Scopelleti",
  publisher: "Mackadamion Music Agency",
  
  // Favicon and other icons
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  
  // Open Graph metadata for social media
  openGraph: {
    type: "website",
    title: "Mackadamion Music Agency | Global Music Production",
    description: "Premier music and placement agency led by Danny Scopelleti, serving artists globally with 20 years of expertise.",
    url: "https://mackadamion.com",
    siteName: "Mackadamion Music Agency",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mackadamion Music Agency - Global Music Production and Advocacy",
      },
    ],
    locale: "en_US",
  },
  
  // Twitter Card metadata
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Mackadamion Music Agency | Global Music Production",
  //   description: "Premier music and placement agency led by Danny Scopelleti, serving artists globally with 20 years of expertise.",
  //   images: ["/twitter-image.jpg"],
  //   creator: "@mackadamion",
  //   site: "@mackadamion",
  // },
  
  // Robots directives
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
  
  // Verification for search consoles
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  
  // Alternative languages
  alternates: {
    canonical: "https://mackadamion.com",
    languages: {
      "en-US": "https://mackadamion.com",
    },
  },
  
  // Additional metadata
  category: "Music Production",
  classification: "Music Agency",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <Toaster />
      <body>{children}</body>
    </html>
  );
}
