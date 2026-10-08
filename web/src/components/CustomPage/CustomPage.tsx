import type { FC } from "react";

import { fullPageFragment } from "@/api/pages.api";
import type { FetchPage } from "@/api/pages.api";
import { MarkdownText } from "@/components/MarkdownText";
import { PageBackgroundImg } from "@/components/PageBackgroundImg";
import { PageContent } from "@/components/PageContent";
import { useFragment } from "@/gql/fragment-masking";
import { getStrapiMedia } from "@/lib/strapi";

import { ProgrammeListItem } from "./ProgrammeListItem";

export const CustomPage: FC<{ page: FetchPage }> = (props) => {
  const page = useFragment(fullPageFragment, props.page);
  if (!page) {
    return <p>NotFound</p>;
  }
  const cover = page.cover ? getStrapiMedia(page.cover) : null;
  return (
    <div>
      {cover !== null && <PageBackgroundImg url={cover} />}
      <PageContent title={["Mes activités", page.title].join(" > ")}>
        <MarkdownText
          className="prose-lg my-5"
          text={page.introduction ?? ""}
        />
        <h1 className="mb-3 pt-3 text-3xl">
          {page.programmes?.length === 1
            ? "Programme et cycle"
            : "Programmes et cycles"}
        </h1>

        {page.programmes?.map(
          (programme) =>
            programme && (
              <ProgrammeListItem
                className={"rounded-lg bg-white p-5 md:rounded-xl"}
                key={programme.documentId}
                programme={programme}
              />
            )
        )}
      </PageContent>
    </div>
  );
};
