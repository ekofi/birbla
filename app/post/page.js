import Header from "../../comp/header";
import Footer from "../../comp/footer";

import * as cheerio from "cheerio";
import Image from "next/image";

export default async function Home({ searchParams }) {
  const { id } = searchParams;
  console.log(id);

  const res = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
  const posts = await res.json();

  const posts2 = await Object.entries(posts).reduce(
    async (accumulator, [postId, post]) => {
      const imageUrl = await imageURL(posts.url);
      return Object.assign(posts, { image: imageUrl });
    },
    {}
  );

  async function imageURL(input) {
    try {
      const response = await fetch(input);
      const body = await response.text();
      const $ = cheerio.load(body);
      const imageUrl =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content");

      // Validate the image URL using a HEAD request
      if (imageUrl) {
        try {
          const headResponse = await fetch(imageUrl, { method: "HEAD" });
          if (headResponse.ok) {
            return imageUrl;
          }
        } catch {
          return null;
        }
      }
      return null;
    } catch (error) {
      return null;
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
    url = url.replace(/(https?:\/\/)?(www.)?/i, "");

    if (!subdomain) {
      url = url.split(".");
      url = url.slice(url.length - 2).join(".");
    }

    if (url.indexOf("/") !== -1) {
      return url.split("/")[0];
    }

    return url;
  }

  console.log(posts.children);

  return (
    <div className="cover-container flex flex-col items-center justify-center w-full h-full p-3 mx-auto">
      <Header />
      <main
        className="px-3 my-3 scroll"
        style={{ width: "-webkit-fill-available" }}
      >
        <div className="text-lg mb-4">
          <ul className="text-left">
            <div className="mb-6">
              <a href={posts.url}>
                <Image
                  className="rounded-xl mb-2 imageU"
                  width={650}
                  height={650}
                  src={
                    posts2.image ||
                    "https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png"
                  }
                />
              </a>
              <a href={posts.url}>{posts.title}</a>{" "}
              <a className="text-gray-400">({getDomain(posts.url, true)})</a>
              <br />
              <a className="text-gray-400">
                {posts.points} points by {posts.author} -{" "}
                <a>{timeAgo(posts.created_at)}</a>{" "}
              </a>
            </div>
          </ul>
          <hr />
          <ul className="text-left mt-6">
            {posts.children.map((post) => (
              <li className="mb-6" key={post.id}>
                <a>
                  <div dangerouslySetInnerHTML={{ __html: post.text }} />
                </a>{" "}
                <a className="text-gray-400">
                  {post.points !== null && post.points + " points"} by{" "}
                  {post.author} - {timeAgo(post.created_at)}{" "}
                  {post.num_comments > 0 && post.num_comments + " comments"}
                </a>
              </li>
            ))}
          </ul>
          {posts.children.children &&
            posts.children.children.map((posta) => (
              <li className="text-sm" key={posta.id}>
                <a>{posta.text}</a> <br />
                <a className="text-gray-400">
                  {posta.points !== null && posta.points + " points"} by{" "}
                  {posta.author} - {timeAgo(posta.created_at)}{" "}
                  {posta.num_comments > 0 && posta.num_comments + " comments"}
                </a>
              </li>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
