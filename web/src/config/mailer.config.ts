import { createTransport } from "nodemailer";
import { z } from "zod";

const schema = z.object({
  auth: z.object({
    user: z.string().optional(),
    pass: z.string().optional(),
  }),
  host: z.string().optional(),
  port: z.coerce.number().optional(),
  secure: z
    .string()
    .default("true")
    .transform((val) => !["false", "0", 0].includes(val)),
  service: z.string().optional(),
});

const config = schema.parse({
  auth: {
    pass: process.env.MAILER_AUTH_PASSWORD,
    user: process.env.MAILER_AUTH_USERNAME,
  },
  host: process.env.MAILER_SMTP_HOST,
  port: process.env.MAILER_SMTP_PORT,
  secure: process.env.MAILER_SECURE,
  service: process.env.MAILER_SERVICE,
});

export const mailerTransport = createTransport({
  ...config,
});
