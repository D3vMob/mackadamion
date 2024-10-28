"use server";

import { env } from "~/env";
import { Client, type Common, SendEmailV3_1 } from "node-mailjet";

const EMAIL_RECEIVER = env.EMAIL_RECEIVER;

const mailjet = new Client({
  apiKey: env.MAILJET_API,
  apiSecret: env.MAILJET_SECRET,
});

export const sendMail = async ({
  sendTo,
  subject,
  text,
  html,
}: {
  sendTo?: string;
  subject: string;
  text?: string;
  html?: string;
}) =>  {
  const data: SendEmailV3_1.Body<Common.UnknownRec, Common.UnknownRec> = {
    Messages: [
      {
        From: {
          Email: "do_not_reply@mackadamion.com",
        },
        To: [
          {
            Email: sendTo ?? EMAIL_RECEIVER,
          },
        ],
        TemplateErrorReporting: {
          Email: "danny@mackadamion.com",
          Name: "Danny",
        },
        Subject: subject,
        HTMLPart: `<h3>${!sendTo ? "NEW MESSAGE FROM WEBSITE:" : "Thank you for your message!"}</h3><br />${html}`,
        TextPart: `NEW MESSAGE FROM WEBSITE: ${text}`,
        TemplateLanguage: true,
      },
    ],
  };
  
  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request<SendEmailV3_1.Response>(data);

    const messageStatus = result.body.Messages[0]!;
    return {
      success: messageStatus.Status.toLowerCase() === "success",
      data: {
        status: messageStatus.Status,
        to: messageStatus.To[0]?.Email,
        messageId: messageStatus?.To[0]?.MessageID,
      },
    };
  } catch (error) {
    console.error("Mailjet error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};