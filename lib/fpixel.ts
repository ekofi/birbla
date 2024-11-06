export const FB_PIXEL_ID = "1549475562606968";

declare global {
  interface Window {
    fbq: any;
  }
}

export const pageview = () => {
  window.fbq("track", "PageView");
};

export const event = (name: string, options = {}) => {
  window.fbq("track", name, options);
};

export const initiateCheckout = (value: number, currency: string = "USD") => {
  window.fbq("track", "InitiateCheckout", {
    value: value,
    currency: currency,
  });
};
