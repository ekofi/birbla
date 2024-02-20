import Header from "../comp/header";
import Footer from "../comp/footer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as cheerio from "cheerio";
import got from "got";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const res = await fetch(
    "http://hn.algolia.com/api/v1/search?tags=front_page"
  );
  const posts = await res.json();

  const posts2 = await Promise.all(
    posts.hits.map(async (post) => {
      const imageUrl = await imageURL(post.url);
      return { ...post, imageUrl }; // Add imageUrl to each post object
    })
  );

  async function imageURL(input) {
    try {
      const response = await got(input);
      const $ = cheerio.load(response.body);
      const imageUrl =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content");

      return imageUrl;
    } catch (error) {
      return 500;
    }
  }

  function timeAgo(input) {
    const date = input instanceof Date ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat("en");
    const ranges = [
      ["years", 3600 * 24 * 365],
      ["months", 3600 * 24 * 30],
      ["weeks", 3600 * 24 * 7],
      ["days", 3600 * 24],
      ["hours", 3600],
      ["minutes", 60],
      ["seconds", 1],
    ];
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;

    for (const [rangeType, rangeVal] of ranges) {
      if (rangeVal < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / rangeVal;
        return formatter.format(Math.round(delta), rangeType);
      }
    }
  }

  function getDomain(url, subdomain) {
    subdomain = subdomain || false;

    url = url?.replace(/(https?:\/\/)?(www.)?/i, "");

    if (!subdomain) {
      url = url.split(".");

      url = url.slice(url.length - 2).join(".");
    }

    if (url?.indexOf("/") !== -1) {
      return url?.split("/")[0];
    }

    return url;
  }

  return (
    <div className="cover-container flex flex-col items-center justify-center w-full h-full p-3 mx-auto">
      <Header user={user} />
      <main class="px-3 my-3 scroll">
        <h1 class="text-4xl font-bold mb-4">Feed</h1>
        <div class="text-lg mb-4">
          <ul className="text-left">
            {posts2.map((post) => (
              <li className="mb-6" key={post.objectID}>
                <a href={post.url}>
                  <img
                    className="rounded-xl mb-2 imageU"
                    src={
                      post.imageUrl ||
                      "https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png"
                    }
                  ></img>
                </a>
                <a href={post.url}>{post.title}</a>{" "}
                <a className="text-gray-400">({getDomain(post.url, true)})</a>
                <br />
                <a className="text-gray-400">
                  {post.points} points by {post.author}{" "}
                  <a href={"/post?id=" + post.objectID}>
                    {timeAgo(post.created_at)}
                  </a>{" "}
                  -{" "}
                  <a href={"/post?id=" + post.objectID}>
                    {post.num_comments > 0 && post.num_comments + " comments"}
                  </a>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
