"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Image from "next/image";

import Header from "../../comp/header";
import Footer from "../../comp/footer";

import { initiateCheckout } from "../../lib/fpixel";
import { event } from "../../lib/fpixel";

import { gevent } from "../../lib/gtag";

export default function Home() {
  const handleClick = () => {
    // Track the click event
    event("InitiateCheckout", {
      currency: "USD",
      value: 24.0,
    });

    gevent({
      action: "button_click",
      category: "engagement",
      label: "button_join",
      value: 1,
    });
  };

  const supabase = createClientComponentClient();

  return (
    <div className="cover-container flex flex-col items-center justify-center w-full h-full p-3 mx-auto">
      <Header />
      <main className="px-3 my-3 w-full">
        <section>
          <div class=" px-4 mx-auto max-w-screen-xl sm:py-2 lg:px-6">
            <div class="image-container">
              <Image
                width={648}
                height={648}
                src={"/ad2.png"}
                className="drop-shadow-2xl rounded-md"
              />
              <div class="gradient-overlay"></div>
            </div>
            <div class="max-w-screen-md mt-4 mb-4 lg:mb-8">
              <h1 className="text-4xl font-bold mb-4 tracking-tight font-extrabold">
                Hacker News, Reinvented: Great Design, AI Personalization,
                Instant Notifications
              </h1>
            </div>
            <button
              type="button"
              class="mb-4 lg:mb-8 px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <a
                href="https://buy.stripe.com/9AQ29GdJp1qzbnOcN3"
                rel="noreferrer noopener"
                target="_blank"
                className="text-2xl font-bold mb-4 tracking-tight font-extrabold"
                onClick={handleClick}
              >
                Get Premium for $24/year
              </a>
            </button>

            {/* <div
              className="image-container relative h-64 w-full bg-cover bg-center"
              style={{ backgroundImage: 'url("/ad.png")' }}
            >
              <div className="gradient-overlay"></div>
            </div> */}
            <div class="space-y-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
              <div class="flex flex-col items-center text-center rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-center items-center w-12 h-12 rounded-full bg-primary-100 lg:h-14 lg:w-14 dark:bg-primary-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-primary-600 lg:w-7 lg:h-7 dark:text-primary-300"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                    />
                  </svg>
                </div>
                <h3 class="mb-2 text-xl font-bold dark:text-white">
                  Great-looking UI
                </h3>
                <p class="text-gray-500 dark:text-gray-400">
                  A great looking UI that fits into every device - with images
                  of the links.
                </p>
              </div>
              <div class="flex flex-col items-center text-center rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-center items-center  w-12 h-12 rounded-full bg-primary-100 lg:h-14 lg:w-14 dark:bg-primary-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-primary-600 lg:w-7 lg:h-7 dark:text-primary-300"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <h3 class="mb-2 text-xl font-bold dark:text-white">
                  Personalization
                </h3>
                <p class="text-gray-500 dark:text-gray-400">
                  Personalize your journey using AI-powered algorithm.
                </p>
              </div>
              <div class="flex flex-col items-center text-center rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-center items-center w-12 h-12 rounded-full bg-primary-100 lg:h-14 lg:w-14 dark:bg-primary-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-primary-600 lg:w-7 lg:h-7 dark:text-primary-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                    />
                  </svg>
                </div>
                <h3 class="mb-2 text-xl font-bold dark:text-white">
                  Notifications - coming soon
                </h3>
                <p class="text-gray-500 dark:text-gray-400">
                  Follow users who have commented - be notified of their new
                  comments.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
