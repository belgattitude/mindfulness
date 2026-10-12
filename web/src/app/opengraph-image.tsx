import { siteConfig } from "@/config/site.config";
import { renderDefaultOgImage } from "@/lib/og/og-image";

export const alt = siteConfig.metadata.siteTitle;
// The size Facebook, LinkedIn and X expect (1.91:1)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The site link preview, also used by the pages without their own */
const Image = () => renderDefaultOgImage();

export default Image;
