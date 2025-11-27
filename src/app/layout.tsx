import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/UI/header";
import { Providers } from "@/providers";
import { AuthModalProvider } from "@/components/UI/modals/AuthModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StomDent - Стоматологическая клиника",
  description: "Профессиональная стоматология",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <AuthModalProvider>
            <Header />
            <main className="container mx-auto p-4">
              {children}
            </main>
          </AuthModalProvider>
        </Providers>
      </body>
    </html>
  );
}