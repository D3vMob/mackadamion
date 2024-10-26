import "~/styles/globals.css";
import { Toaster } from "sonner";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Mackadamion Music Agency | Global Music Production and Advocacy Led by Danny Scopelleti",
  description: "Mackadamion is a premier music and placement agency founded by seasoned singer-songwriter Danny Scopelleti. With nearly 20 years of industry expertise, we produce music for artists across New York, Los Angeles, Montreal, and Europe. In 2024, we showcased our impact by presenting the official ARDN theme song at the United Nations Assembly, highlighting our dedication to global music and advocacy.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
