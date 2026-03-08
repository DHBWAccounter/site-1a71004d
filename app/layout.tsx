import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "krinAI - The Agent That Processes All of Your Invoices",
  description:
    "Automate invoice processing with AI. Extract data, validate details, and streamline your accounts payable workflow in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen bg-slate-950 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
