import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { GeistSans } from "geist/font/sans";
import Head from "next/head";
import Script from 'next/script';
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/Provider";
import MetaPixels from "@/lib/metapixels";

import "./globals.css";
import { Metadata } from "next";
import { WEBSITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "De Colores Lifestyle",
  description: "Discover our wide range of skincare, makeup, and wellness products designed to enhance your natural beauty.",
  keywords: "cosmetics, beauty products, skincare, makeup, wellness, nail polish, body wax, wax powder, De Colores Lifestyle, Chelsy, Herbonica",
  // authors: add about our comapny
  alternates: {
    canonical: WEBSITE_URL,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <Head>
        <MetaPixels />
        <meta name="google-site-verification" content="CJlT5WbSvD3vI6dvZacFTVzH41xndM6kIGCZuLpzk0E" />
      </Head>
      <GoogleTagManager gtmId="GTM-5SCTLK2H" />
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <Script
            id="razorpay-checkout-js"
            src="https://checkout.razorpay.com/v1/checkout.js"
          />
        </AuthProvider>
        <Analytics mode={'production'} />
      </body>
      <GoogleAnalytics gaId="G-Z28Q2W929Y" />
      <script defer data-website-id="66faed924de2c5dcac38edd7" data-domain="chelsycosmetics.com" src="https://datafa.st/js/script.js"></script>
    </html>
  );
}
