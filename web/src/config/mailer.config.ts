import { createTransport } from 'nodemailer';
import { z } from 'zod';

const schema = z.object({
  service: z.string().optional(),
  host: z.string().optional(),
  port: z.coerce.number().optional(),
  secure: z
    .string()
    .default('true')
    .transform((val) => {
      return !['false', '0', 0].includes(val);
    }),
  auth: z.object({
    user: z.string().optional(),
    pass: z.string().optional(),
  }),
});

const config = schema.parse({
  service: process.env.MAILER_SERVICE,
  host: process.env.MAILER_SMTP_HOST,
  port: process.env.MAILER_SMTP_PORT,
  secure: process.env.MAILER_SECURE,
  auth: {
    user: process.env.MAILER_AUTH_USERNAME,
    pass: process.env.MAILER_AUTH_PASSWORD,
  },
});

export const mailerTransport = createTransport({
  ...config,
});
