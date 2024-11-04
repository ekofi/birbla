"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Image from "next/image";

import Header from "../../comp/header";
import Footer from "../../comp/footer";

export default function Home() {
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
                Thanks for your payment!
              </h1>
            </div>

            {/* <div
              className="image-container relative h-64 w-full bg-cover bg-center"
              style={{ backgroundImage: 'url("/ad.png")' }}
            >
              <div className="gradient-overlay"></div>
            </div> */}
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
                We handle subscriptions manually, for now. We'll send your
                subscription, whenever we can.
              </h3>
              <p class="text-gray-500 dark:text-gray-400">
                We work hard for notifications, AI personalization, more UI
                upgrades. Thank you for your contributions.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
