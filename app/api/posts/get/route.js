import { NextResponse } from "next/server";

const HN_TOP_STORIES_URI = "https://hacker-news.glitch.me/api/topstories";

export async function GET(req) {
  // Get the desired number of posts from query parameter
  const numPosts = req.query.num;
  const parsedNumPosts = parseInt(numPosts, 10) || 10; // Default to 10 if invalid

  try {
    // Fetch top story IDs from Hacker News API
    const response = await fetch(HN_TOP_STORIES_URI);
    const topStoriesIds = await response.json();

    // Slice the number of IDs based on parsedNumPosts
    const selectedIds = topStoriesIds.slice(0, parsedNumPosts);

    // Fetch individual post details for each ID
    const posts = await Promise.all(
      selectedIds.map(async (id) => {
        const postResponse = await fetch(
          `https://hacker-news.glitch.me/api/item/${id}`
        );
        const post = await postResponse.json();
        return post;
      })
    );

    // Return fetched posts as JSON response
    NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    NextResponse.json({ error: "Failed to fetch Hacker News posts" });
  }
}
