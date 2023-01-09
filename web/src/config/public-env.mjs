// @ts-check

import { z } from 'zod';

const publicEnvSchema = z.object({
  NEXT_PUBLIC_STRAPI_API_URL: z.string().url(),
});

const parsedPublicEnv = publicEnvSchema.safeParse(process.env);

if (!parsedPublicEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(parsedPublicEnv.error.format(), null, 4)
  );
  process.exit(1);
}

export const publicEnv = parsedPublicEnv.data;
