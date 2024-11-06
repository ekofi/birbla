"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { FB_PIXEL_ID, pageview } from "../lib/fpixel";
import { Suspense } from "react";

// Separate component for search params tracking
function FacebookPixelRoute() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (FB_PIXEL_ID) pageview();
  }, [pathname, searchParams]);

  return null;
}

// Main Facebook Pixel component
export default function FacebookPixel() {
  useEffect(() => {
    // This pageview only triggers the first time
    if (FB_PIXEL_ID) pageview();
  }, []);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <Suspense fallback={null}>
        <FacebookPixelRoute />
      </Suspense>
    </>
  );
}
