import type { Metadata } from "next"

import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import { CartProvider } from "@/contexts/CartContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "WMAKERs",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col bg-[#050A14]">

        <CartProvider>

          {children}

        </CartProvider>

      </body>

    </html>
  );
}