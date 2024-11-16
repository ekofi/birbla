import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GoogleAdsense from "../comp/GoogleAdsense";
import FacebookPixel from "../comp/FacebookPixel";
import GoogleAds from "../comp/GoogleAds";
import Script from "next/script";
import { GA_TRACKING_ID } from "@/lib/gtag";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Birbla",
  description: "A Hacker News reader with AI personalized feed + good design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}');
        `,
          }}
        />
      </head>
      <body className="flex h-full items-center text-center justify-center text-bg-dark">
        {process.env.NODE_ENV === "production" && <GoogleAds />}
        {children}
      </body>
      <GoogleAdsense pId="ca-pub-4889127835846378" />
      <FacebookPixel />
    </html>
  );
}
