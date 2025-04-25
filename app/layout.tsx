import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NavbarContainer from "./components/common/NavbarContainer";

// Primary app fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add Playfair Display
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Add Roboto
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotels254",
  description: "Book top hotels across Kenya",
  icons: {
    icon: "/kenyan.png", // or "/favicon.ico"
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased min-h-screen flex flex-col justify-between
        `}
      >
        <NavbarContainer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
