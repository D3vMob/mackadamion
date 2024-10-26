"use server";

import Mailjet from "node-mailjet";
import { env } from "~/env";

type ContactRequest = {
  email: string;
  name?: string;
  isExcludedFromCampaigns?: boolean;
};

type SuccessResponse = {
  success: true;
  data: {
    email: string;
    message: string;
  };
};

type ErrorResponse = {
  success: false;
  error: string;
};

type ActionResponse = SuccessResponse | ErrorResponse;

const mailjet = new Mailjet({
  apiKey: env.NEXT_PUBLIC_MAILJET_API,
  apiSecret: env.MAILJET_SECRET,
});

export async function addMailjetContact(
  data: ContactRequest,
): Promise<ActionResponse> {
  try {
    if (!data.email) {
      return {
        success: false,
        error: "Email and name are required",
      };
    }

    const request = await mailjet.post("contact").request({
      Email: data.email,
      Name: "New Follow",
      IsExcludedFromCampaigns: data.isExcludedFromCampaigns ?? false,
    });

    return {
      success: true,
      data: {
        email: data.email,
        message: "Thank you for subscribing!",
      },
    };
  } catch (error) {
    console.error("Mailjet error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Failed to add contact",
    };
  }
}
