// app/api/newsletter/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    // Here we'll make a direct API call to Substack's API using their public subscribe endpoint
    const substackUrl = "https://birbla.substack.com";

    // Using the public subscription endpoint
    const response = await fetch(`${substackUrl}/api/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        captcha: "off",
      }),
    });

    if (!response.ok) {
      throw new Error(`Substack API responded with status ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing! Please check your email to confirm.",
      data,
    });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error subscribing. Please try again.",
      },
      { status: 500 }
    );
  }
}
