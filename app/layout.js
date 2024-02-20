import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Birbla",
  description: "Let's bring social media back",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-full items-center text-center justify-center text-bg-dark">
        {children}
      </body>
    </html>
  );
}
