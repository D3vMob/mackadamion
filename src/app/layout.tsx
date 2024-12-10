import "~/styles/globals.css";

import { env } from "~/env.js";
import { ClerkProvider } from "@clerk/nextjs";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import GoogleAnalytics from "~/components/GoogleAnalytics";
import { TRPCReactProvider } from "~/trpc/react";
import { Suspense } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title:
    "Mackadamion Music Agency | Global Music Production and Advocacy Led by Danny Scopelleti",
  description:
    "Mackadamion is a premier music and placement agency founded by seasoned singer-songwriter Danny Scopelleti. With nearly 20 years of industry expertise, we produce music for artists across New York, Los Angeles, Montreal, and Europe. In 2024, we showcased our impact by presenting the official ARDN theme song at the United Nations Assembly, highlighting our dedication to global music and advocacy.",

  // Basic metadata
  keywords: [
    "music agency",
    "music production",
    "Danny Scopelleti",
    "global music",
    "music advocacy",
  ],
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
    google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
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
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <GoogleAnalytics />
        <body>
          <Toaster />
          <div className="absolute right-4 top-2 z-50 text-gray-500">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
