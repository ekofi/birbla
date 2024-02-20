"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Header from "../../comp/header";
import Footer from "../../comp/footer";

export default function Home() {
  const supabase = createClientComponentClient();

  return (
    <div className="cover-container flex flex-col items-center justify-center w-full h-full p-3 mx-auto">
      <Header />
      <main className="px-3 my-3 w-full">
        <h1 className="text-4xl font-bold mb-4">Login</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          showLinks={true}
          providers={[]}
          redirectTo="https://birbla.com/auth/callback"
        />
      </main>
      <Footer />
    </div>
  );
}
