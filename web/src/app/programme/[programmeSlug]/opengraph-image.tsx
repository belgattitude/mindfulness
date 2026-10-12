import { getProgrammeParams } from "@/api/programmes.rest";
import {
  getStrapiOgImage,
  renderDefaultOgImage,
  renderOgImage,
} from "@/lib/og/og-image";
import { getBlocksText, getTextExcerpt } from "@/lib/text/text.utils";
import { getProgrammes } from "@/openapi/programme/programme";

export const alt = "Un programme de Sandrine Rauter";
// The size Facebook, LinkedIn and X expect (1.91:1)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ programmeSlug: string }>;
}

/** The programme link preview: its title, summary and cover (a poster) */
const Image = async (props: Props) => {
  const { programmeSlug } = await props.params;
  const response = await getProgrammes(
    getProgrammeParams({ slug: programmeSlug })
  );
  const programme = response.data?.[0];
  if (!programme) {
    return renderDefaultOgImage();
  }
  return renderOgImage({
    eyebrow: "Programme",
    title: programme.title ?? "",
    subtitle: getTextExcerpt(
      programme.summary || getBlocksText(programme.description),
      110
    ),
    image: await getStrapiOgImage(programme.cover),
  });
};

export default Image;
