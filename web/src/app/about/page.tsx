import { fetchAboutPage } from "@/api/about.api";
import { MarkdownText } from "@/components/MarkdownText";
import { PageContent } from "@/components/PageContent";
import { ProseContent } from "@/components/ProseContent";

export const dynamic = "force-dynamic";

const About = async () => {
  const data = await fetchAboutPage();
  return (
    <PageContent title="A mon propos">
      <ProseContent>
        {data && (
          <MarkdownText
            className="text-title-color-800"
            text={data.about?.description ?? ""}
          />
        )}
      </ProseContent>
    </PageContent>
  );
};

export default About;
