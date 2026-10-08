import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { ContactPageContent } from "@/components/Contact/ContactPageContent";
import { PageContent } from "@/components/PageContent";
import { ProseContent } from "@/components/ProseContent";
import { reactQueryConfig } from "@/config/react-query.config";
import { getGetContactQueryOptions } from "@/openapi/contact/contact";

export const dynamic = "force-dynamic";

const Contact = async () => {
  // Prefetched on the server, the client component reads it from the cache
  const queryClient = new QueryClient(reactQueryConfig);
  await queryClient.prefetchQuery(getGetContactQueryOptions());

  return (
    <PageContent title="Contact">
      <ProseContent>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ContactPageContent />
        </HydrationBoundary>
      </ProseContent>
    </PageContent>
  );
};

export default Contact;
