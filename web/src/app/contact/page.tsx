import { fetchContactPage } from "@/api/contact.api";
import { MarkdownText } from "@/components/MarkdownText";
import { PageContent } from "@/components/PageContent";
import { ProseContent } from "@/components/ProseContent";

export const dynamic = "force-dynamic";

const Contact = async () => {
  const data = await fetchContactPage();
  return (
    <PageContent title="Contact">
      <ProseContent>
        {data && (
          <MarkdownText
            className="text-title-color-800"
            text={data.contact?.description ?? ""}
          />
        )}
      </ProseContent>
    </PageContent>
  );
};

export default Contact;
