import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/icomoon.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nexus",
  description: "Tu librería universitaria con espacios de coworking",
  icons: {
    icon: "/images/svg/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
