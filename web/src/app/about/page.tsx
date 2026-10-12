import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";

import { AboutPageContent } from "@/components/About/AboutPageContent";
import { PageContent } from "@/components/PageContent";
import { reactQueryConfig } from "@/config/react-query.config";
import { getPageMetadata } from "@/lib/metadata/page-metadata";
import { getBlocksText, getTextExcerpt } from "@/lib/text/text.utils";
import { getAbout, getGetAboutQueryOptions } from "@/openapi/about/about";

export const dynamic = "force-dynamic";

/** The link previews: the default image is her portrait */
export const generateMetadata = async (): Promise<Metadata> => {
  const about = await getAbout()
    .then((response) => response.data)
    .catch(() => null);
  return getPageMetadata({
    title: "À propos",
    description: about
      ? getTextExcerpt(about.summary || getBlocksText(about.description))
      : undefined,
    path: "/about",
  });
};

const About = async () => {
  // Prefetched on the server, the client component reads it from the cache
  const queryClient = new QueryClient(reactQueryConfig);
  await queryClient.prefetchQuery(getGetAboutQueryOptions());

  return (
    <PageContent eyebrow={{ label: "À propos" }}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AboutPageContent />
      </HydrationBoundary>
    </PageContent>
  );
};

export default About;
