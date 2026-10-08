import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { AboutCard } from "@/components/About/AboutCard";
import { AboutCardBox } from "@/components/About/AboutCardBox";
import { HomeIntroduction } from "@/components/Home/HomeIntroduction";
import { PageContent } from "@/components/PageContent";
import { MyActivitiesCard } from "@/components/Sections/MyActivitiesCard";
import { reactQueryConfig } from "@/config/react-query.config";
import { getGetHomeQueryOptions } from "@/openapi/home/home";

export const dynamic = "force-dynamic";

const HomeRoute = async () => {
  // Prefetched on the server, the client component reads it from the cache
  const queryClient = new QueryClient(reactQueryConfig);
  await queryClient.prefetchQuery(getGetHomeQueryOptions());

  return (
    <PageContent>
      <div className="grid gap-5 md:grid-cols-12">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <HomeIntroduction />
        </HydrationBoundary>
        <AboutCardBox className="mb-5 flex flex-col md:col-span-4">
          <AboutCard className="bg-brand-color/60" />
        </AboutCardBox>
      </div>
      <div>
        <MyActivitiesCard className="mt-5 p-5" />
      </div>
    </PageContent>
  );
};

export default HomeRoute;
