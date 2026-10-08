import { isPlainObject } from "@httpx/assert";

import { fetchHome } from "@/api/home.api";
import { AboutCard } from "@/components/About/AboutCard";
import { AboutCardBox } from "@/components/About/AboutCardBox";
import { MarkdownText } from "@/components/MarkdownText";
import { PageContent } from "@/components/PageContent";
import { ProseContent } from "@/components/ProseContent";
import { MyActivitiesCard } from "@/components/Sections/MyActivitiesCard";

export const dynamic = "force-dynamic";

const HomeRoute = async () => {
  const homeData = await fetchHome();
  return (
    <PageContent>
      <div className="grid gap-5 md:grid-cols-12">
        {isPlainObject(homeData) === true && (
          <ProseContent className="md:col-span-8 md:px-0">
            <div className="text-title-color-800">
              <MarkdownText text={homeData.introduction} />
            </div>
          </ProseContent>
        )}
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
