import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const Matadata: Metadata = {
  title: 'Estudo Bibliométrico em IA',
  description: 'Este App é um mecanismo de busca para estudos bibliométricos na área de Inteligência Artificial. Neste app, existem duas funcionalidades principais: um mecanismo de busca e um mapa com universidades, autores e artigos. O mecanismo de busca permite que os usuários pesquisem artigos por título, autor ou universidade. O mapa mostra a localização de universidades, autores e artigos.',
  category: 'Bibliometria',
  keywords: ['IA', 'Bibliometria', 'Inteligência Artificial'],
  classification: 'Public',
  applicationName: 'Estudo Bibliométrico em IA',
  generator: 'Next.js',
  robots: 'noindex, nofollow',
  icons: [
    {
      url: '/favicon.ico',
      sizes: '64x64',
      type: 'image/png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0E0E0E]`}
      >
        {children}
      </body>
    </html>
  );
}
