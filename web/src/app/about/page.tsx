import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { AboutPageContent } from "@/components/About/AboutPageContent";
import { PageContent } from "@/components/PageContent";
import { ProseContent } from "@/components/ProseContent";
import { reactQueryConfig } from "@/config/react-query.config";
import { getGetAboutQueryOptions } from "@/openapi/about/about";

export const dynamic = "force-dynamic";

const About = async () => {
  // Prefetched on the server, the client component reads it from the cache
  const queryClient = new QueryClient(reactQueryConfig);
  await queryClient.prefetchQuery(getGetAboutQueryOptions());

  return (
    <PageContent title="A mon propos">
      <ProseContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AboutPageContent />
        </HydrationBoundary>
      </ProseContent>
    </PageContent>
  );
};

export default About;
