"use client";

import type { FC } from "react";

import { MarkdownText } from "@/components/MarkdownText";
import { ProseContent } from "@/components/ProseContent";
import { useGetHome } from "@/openapi/home/home";

/** The home introduction, prefetched by the server component */
export const HomeIntroduction: FC = () => {
  const { data, error, isPending } = useGetHome();

  if (isPending) {
    return null;
  }
  if (error) {
    return (
      <p className="text-red-700 md:col-span-8">
        Impossible de charger l&rsquo;introduction.
      </p>
    );
  }
  return (
    <ProseContent className="md:col-span-8 md:px-0">
      <div className="text-title-color-800">
        <MarkdownText text={data.data?.introduction ?? ""} />
      </div>
    </ProseContent>
  );
};
