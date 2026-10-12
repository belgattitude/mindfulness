import { getPageParams } from "@/api/pages.rest";
import {
  getStrapiOgImage,
  renderDefaultOgImage,
  renderOgImage,
} from "@/lib/og/og-image";
import { getPageIntroductionText } from "@/lib/text/text.utils";
import { getPages } from "@/openapi/page/page";

export const alt = "Une activité de Sandrine Rauter";
// The size Facebook, LinkedIn and X expect (1.91:1)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ pageSlug: string }>;
}

/** The activity link preview: its title, introduction and cover */
const Image = async (props: Props) => {
  const { pageSlug } = await props.params;
  const response = await getPages(getPageParams({ slug: pageSlug }));
  const page = response.data?.[0];
  if (!page) {
    return renderDefaultOgImage();
  }
  return renderOgImage({
    eyebrow: "Mes activités",
    title: page.title ?? "",
    subtitle: getPageIntroductionText(page.introduction, 110),
    image: await getStrapiOgImage(page.cover),
  });
};

export default Image;
