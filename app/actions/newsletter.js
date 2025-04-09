"use server";

import { subscribe } from "substack-subscriber";

export async function subscribeToNewsletter(formData) {
  const email = formData.get("email");
  const substackUrl = "https://birbla.substack.com"; // Replace with your actual Substack URL

  try {
    const response = await subscribe(email, substackUrl);
    return {
      success: true,
      message: "Thanks for subscribing! Please check your email to confirm.",
    };
  } catch (error) {
    console.error("Error subscribing:", error);
    return {
      success: false,
      message: "Error subscribing. Please try again.",
    };
  }
}
