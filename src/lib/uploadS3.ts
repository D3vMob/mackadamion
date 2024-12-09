"use server";
import { S3 } from "@aws-sdk/client-s3";
import { env } from "~/env";
import { v4 as uuidv4 } from 'uuid';

const s3 = new S3({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function generateUUID(name: string) {
  const uuid = uuidv4();
  return `_${name}_${uuid}`;
}

export async function uploadS3(
  base64String: string,
  uuid: string,
  type: string,
) {
  if (!uuid) {
    console.log("No UUID");
    return;
  }

  // Remove the data URL prefix to get just the base64 data
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  await s3.putObject({
    Bucket: "yard-sale",
    Key: uuid,
    Body: buffer,
    ContentType: type,
  });
}
