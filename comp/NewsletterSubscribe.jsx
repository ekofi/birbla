"use client";

import { useState, useEffect } from "react";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [submitted, setSubmitted] = useState(false);

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
    <div className="w-full max-w-md mx-auto py-8 px-4 relative mt-4">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
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

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Join for free</h2>
        <p className="text-gray-600">
          Get the latest news delivered to your inbox
        </p>
      </div>

      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-md text-center">
          Thanks for subscribing!
        </div>
      ) : (
        <form
          action="https://formsubmit.co/ekoficapital@gmail.com"
          method="POST"
          className="flex flex-col gap-3"
          onSubmit={() => {
            setIsSubmitting(true);
            setTimeout(() => {
              setSubmitted(true);
              setIsSubmitting(false);
            }, 1000);
          }}
        >
          {/* FormSubmit configuration */}
          <input
            type="hidden"
            name="_subject"
            value="New newsletter subscription!"
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_next"
            value={typeof window !== "undefined" ? window.location.href : ""}
          />

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}
    </div>
  );
}
