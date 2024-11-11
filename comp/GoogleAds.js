// app/components/GoogleAds.js
"use client";

import Script from "next/script";

export default function GoogleAds() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16772176368"
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16772176368');
        `}
      </Script>
    </>
  );
}
