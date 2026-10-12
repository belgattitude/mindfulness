import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { ContactPageContent } from "@/components/Contact/ContactPageContent";
import { PageContent } from "@/components/PageContent";
import { reactQueryConfig } from "@/config/react-query.config";
import { getPageMetadata } from "@/lib/metadata/page-metadata";
import { getGetContactQueryOptions } from "@/openapi/contact/contact";

export const dynamic = "force-dynamic";

export const metadata = getPageMetadata({
  title: "Contact",
  description:
    "Contacter Sandrine Rauter par e-mail, WhatsApp ou téléphone, ou la retrouver sur LinkedIn.",
  path: "/contact",
});

const Contact = async () => {
  // Prefetched on the server, the client component reads it from the cache
  const queryClient = new QueryClient(reactQueryConfig);
  await queryClient.prefetchQuery(getGetContactQueryOptions());

  return (
    <PageContent>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ContactPageContent />
      </HydrationBoundary>
    </PageContent>
  );
};

export default Contact;
