import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans";
import Head from "next/head";
import Script from 'next/script';
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/Provider";
import MetaPixels from "@/lib/metapixels";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DeColors Lifestyle",
  description: "Cosmetics brand",
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
    </html>
  );
}
