import { zodReq } from '@nextvalid/zod-request';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mailerTransport } from '../../../config/mailer.config';

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

const schema = zodReq({
  method: ['POST', 'GET'],
});

const transport = mailerTransport;

export default async function newsletterSubscribeHandler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = schema.parse(req);

  const mailData = {
    from: 'belgattitude@gmail.com',
    to: 's.vanvelthem@gmail.com',
    subject: `Test from node mailer`,
    text: `Email content`,
    html: `<html><h1>Cool</h1></html>`,
  };

  // send mail with defined transport object
  try {
    const info = await transport.sendMail(mailData);
    res.status(200).json({
      success: true,
      data: {
        messageId: info.messageId,
      },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: `Email cannot be sent: ${
        (e as Error)?.message ?? 'Unknown error'
      }`,
    });
  }

  res.status(200);
}
