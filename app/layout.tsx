import './globals.css';

import type { Metadata } from 'next';
import {
  Dancing_Script,
  Geist,
  Geist_Mono,
} from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "button'd - UI/UX Design & Web Development | New Orleans",
  description: "A UI/UX designer and web developer based in New Orleans. Specializing in graphic design, brand strategy, digital design, and UX/UI. Heart centered approach, mindful design, empowered results.",
  keywords: ["UI/UX design", "web development", "New Orleans", "graphic design", "brand strategy", "digital design"],
  authors: [{ name: "Benjamin Shirley" }],
  openGraph: {
    title: "button'd - UI/UX Design & Web Development",
    description: "Inspire, Create, Innovate",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${script.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
