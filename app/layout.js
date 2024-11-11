import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import GoogleAdsense from "../comp/GoogleAdsense";
import FacebookPixel from "../comp/FacebookPixel";
import GoogleAds from "../comp/GoogleAds";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Birbla",
  description: "A Hacker News reader with AI personalized feed + good design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-full items-center text-center justify-center text-bg-dark">
        {process.env.NODE_ENV === "production" && <GoogleAds />}
        {children}
      </body>
      <GoogleAdsense pId="ca-pub-4889127835846378" />
      <FacebookPixel />
    </html>
  );
}
