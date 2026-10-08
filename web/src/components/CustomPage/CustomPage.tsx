"use client";

import type { FC } from "react";

import { MarkdownText } from "@/components/MarkdownText";
import { PageBackgroundImg } from "@/components/PageBackgroundImg";
import { PageContent } from "@/components/PageContent";
import { getStrapiMedia } from "@/lib/strapi";
import type { GetPagesParams } from "@/openapi/model";
import { useGetPages } from "@/openapi/page/page";

import { ProgrammeListItem } from "./ProgrammeListItem";

interface Props {
  /** The params prefetched by the server component (same query key) */
  params: GetPagesParams;
}

export const CustomPage: FC<Props> = (props) => {
  const { params } = props;
  const { data, error, isPending } = useGetPages(params);

  if (isPending) {
    return null;
  }
  if (error) {
    return <p className="text-red-700">Impossible de charger la page.</p>;
  }
  const page = data.data?.[0];
  if (!page) {
    return <p>NotFound</p>;
  }
  const cover = page.cover ? getStrapiMedia(page.cover) : null;
  return (
    <div>
      {cover !== null && <PageBackgroundImg url={cover} />}
      <PageContent title={["Mes activités", page.title].join(" > ")}>
        <MarkdownText
          className="typeset my-5 text-inherit [--typeset-flow:1.333em] [--typeset-size:1.125rem] [&_h1]:mb-10 [&_h1]:text-5xl [&_h1]:font-normal [&_h1]:text-inherit"
          text={page.introduction ?? ""}
        />
        <h1 className="mb-3 pt-3 text-3xl">
          {page.programmes?.length === 1
            ? "Programme et cycle"
            : "Programmes et cycles"}
        </h1>

        {page.programmes?.map((programme) => (
          <ProgrammeListItem
            className="rounded-lg bg-white p-5 md:rounded-xl"
            key={programme.documentId}
            programme={programme}
          />
        ))}
      </PageContent>
    </div>
  );
};
