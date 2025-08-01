import type { Metadata } from "next";
import "./globals.css";
import Navegation from "@/components/navegation/navegation";
import Content from "@/components/content/content";
import AppContextProvider from "@/context/appContext";
import ContSign from "@/components/navegation/conSign";
import { Poppins } from 'next/font/google';
import NavUser from "@/components/navegation/navUser";
import NavCart from "@/components/navegation/navCart";
import CardModal from "@/components/cardModal/cardModal";
import Script from "next/script";
import NavBurger from "@/components/navegation/navBurger";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const monaSans = Mona_Sans({
//   variable: "--font-mona-sans",
//   subsets: ["latin"],
// });

const poopins = Poppins({
  variable: "--font-poppins",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "System Pro Computer",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${poopins.className}`}>
      <Script src="https://sdk.mercadopago.com/js/v2" strategy="beforeInteractive"/>
        <AppContextProvider>
          <CardModal />
          <ContSign />
          <Navegation />
          <NavCart />
          <NavBurger />
          <NavUser />
          <Content>{children}</Content>
        </AppContextProvider>
      </body>
    </html>
  );
}
