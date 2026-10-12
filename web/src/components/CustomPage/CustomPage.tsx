"use client";

import type { FC } from "react";

import { BlocksText } from "@/components/BlocksText";
import { PageBackgroundImg } from "@/components/PageBackgroundImg";
import { PageContent } from "@/components/PageContent";
import { ProgrammeCard } from "@/components/Programme/ProgrammeCard";
import { ProseContent } from "@/components/ProseContent";
import { getStrapiMedia } from "@/lib/strapi";
import type { GetPagesParams } from "@/openapi/model";
import { useGetPages } from "@/openapi/page/page";

interface Props {
  /** The params prefetched by the server component (same query key) */
  params: GetPagesParams;
  /** Reference date (iso) for the programmes next dates, set by the server */
  now: string;
}

export const CustomPage: FC<Props> = (props) => {
  const { params, now } = props;
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
  const programmes = page.programmes ?? [];
  return (
    <div>
      {cover !== null && <PageBackgroundImg url={cover} />}
      <PageContent eyebrow={{ label: "Mes activités" }}>
        {/* The introduction starts with the page title (an h1) */}
        <ProseContent className="max-w-3xl [&_h1]:mt-0 [&_h1]:mb-6 [&_h1]:text-[2.25rem] [&_h1]:leading-[1.1] [&_h1]:text-balance md:[&_h1]:text-5xl">
          <BlocksText content={page.introduction} />
        </ProseContent>

        {programmes.length > 0 && (
          <section className="mt-12 flex flex-col gap-5">
            <h2 className="heading-section">
              {programmes.length === 1
                ? "Programme et cycle"
                : "Programmes et cycles"}
            </h2>
            <ul className="flex flex-col gap-5">
              {programmes.map((programme) => (
                <li key={programme.documentId}>
                  <ProgrammeCard programme={programme} now={now} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </PageContent>
    </div>
  );
};
