/**
 * Server only: the VERCEL_* system variables are not exposed to the browser.
 * https://vercel.com/docs/environment-variables/system-environment-variables
 */

/** A Vercel preview deployment (a branch or pull request) */
export const isVercelPreview = (): boolean =>
  process.env.VERCEL_ENV === "preview";

/**
 * The public url of the site, the base of the canonical urls and the link
 * previews (og:image…). On a Vercel preview, its own url (the branch one,
 * stable across deployments, as next does without metadataBase), so the link
 * previews can be tested there. Otherwise NEXT_PUBLIC_SITE_URL (.env, and
 * .env.development for next dev).
 */
export const getSiteUrl = (): string | null => {
  const previewHost = isVercelPreview()
    ? process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
    : undefined;
  if (previewHost) {
    return `https://${previewHost}`;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || null;
};
