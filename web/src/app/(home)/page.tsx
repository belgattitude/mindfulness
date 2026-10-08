import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";

import { getUpcomingEventsParams } from "@/api/events.rest";
import { AboutCard } from "@/components/About/AboutCard";
import { UpcomingEventsCard } from "@/components/Event/UpcomingEventsCard";
import { HomeIntroduction } from "@/components/Home/HomeIntroduction";
import { PageContent } from "@/components/PageContent";
import { MyActivitiesCard } from "@/components/Sections/MyActivitiesCard";
import { reactQueryConfig } from "@/config/react-query.config";
import { getGetEventsQueryOptions } from "@/openapi/event/event";
import { getGetHomeQueryOptions } from "@/openapi/home/home";

export const dynamic = "force-dynamic";

const HomeRoute = async () => {
  const now = dayjs().toISOString();
  const upcomingParams = getUpcomingEventsParams({ now, limit: 3 });

  // Prefetched on the server, the client components read them from the cache
  const queryClient = new QueryClient(reactQueryConfig);
  await Promise.all([
    queryClient.prefetchQuery(getGetHomeQueryOptions()),
    queryClient.prefetchQuery(getGetEventsQueryOptions(upcomingParams)),
  ]);

  return (
    <PageContent>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="grid gap-8 md:grid-cols-12">
          <HomeIntroduction />
          <div className="md:col-span-4">
            <UpcomingEventsCard
              params={upcomingParams}
              now={now}
              className="md:sticky md:top-6"
            />
          </div>
        </div>
      </HydrationBoundary>
      <AboutCard className="mt-10" />
      <MyActivitiesCard className="mt-8" />
    </PageContent>
  );
};

export default HomeRoute;
