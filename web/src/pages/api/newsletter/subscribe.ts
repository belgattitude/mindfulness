import type { NextApiRequest, NextApiResponse } from "next";

import { mailerTransport } from "@/config/mailer.config";

type Response =
  | {
      success: true;
      data: {
        messageId: string;
      };
    }
  | {
      success: false;
      message: string;
    };

const transport = mailerTransport;

export default async function newsletterSubscribeHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const mailData = {
    from: "belgattitude@gmail.com",
    html: `<html><h1>Cool</h1></html>`,
    subject: `Test from node mailer`,
    text: `Email content`,
    to: "s.vanvelthem@gmail.com",
  };

  // send mail with defined transport object
  try {
    const info = await transport.sendMail(mailData);
    res.status(200).json({
      data: {
        messageId: info.messageId,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Email cannot be sent: ${
        (error as Error)?.message ?? "Unknown error"
      }`,
    });
  }

  res.status(200);
}
