"use client";

import { useState, useEffect } from "react";

export default function NewsletterEmbed() {
  // Add CSS to override iframe background if needed
  useEffect(() => {
    // This adds a style tag to try to override the iframe background
    const style = document.createElement("style");
    style.innerHTML = `
      iframe[src="https://birbla.substack.com/embed"] {
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [isVisible, setIsVisible] = useState(true);

  // Check localStorage on component mount to see if user has dismissed the form before
  useEffect(() => {
    const hasClosedNewsletter = localStorage.getItem("newsletterClosed");
    if (hasClosedNewsletter) {
      setIsVisible(false);
    }
  }, []);

  function handleClose() {
    setIsVisible(false);
    // Save to localStorage so it stays closed on page refresh
    localStorage.setItem("newsletterClosed", "true");
  }

  if (!isVisible) {
    return null; // Don't render anything if the component is closed
  }

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 relative">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 z-10"
        aria-label="Close newsletter signup"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Join for free</h2>
      </div>

      <div className="flex justify-center">
        <iframe
          src="https://birbla.substack.com/embed"
          width="480"
          height="320"
          style={{ border: "none", background: "transparent" }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}
