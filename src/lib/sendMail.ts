"use server";

import { env } from "~/env";
import { Client, type SendEmailV3_1, type LibraryResponse } from "node-mailjet";

const EMAIL_RECEIVER = env.NEXT_PUBLIC_EMAIL_RECEIVER;

const mailjet = new Client({
  apiKey: env.NEXT_PUBLIC_MAILJET_API,
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
}) => {
  const data: SendEmailV3_1.Body = {
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
        HTMLPart: `<h3>${!sendTo ? "NEW MESSAGE FROM WEBSITE:" : "Thank you for your message!"} </h3><br />${html}`,
        TextPart: `NEW MESSAGE FROM WEBSITE: ${text}`,
        TemplateLanguage: true,
      },
    ],
  };

  const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
    .post("send", { version: "v3.1" })
    .request(data);

  // const Status  = result.body.Messages[0];
  return {
    success: true,
    data: result.body.Messages[0],
  };
};
