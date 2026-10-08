"use client";

import type { FC } from "react";

import { MarkdownText } from "@/components/MarkdownText";
import { useGetAbout } from "@/openapi/about/about";

/** The about page text, prefetched by the server component */
export const AboutPageContent: FC = () => {
  const { data, error, isPending } = useGetAbout();

  if (isPending) {
    return null;
  }
  if (error) {
    return <p className="text-red-700">Impossible de charger la page.</p>;
  }
  return (
    <MarkdownText
      className="text-title-color-800"
      text={data.data?.description ?? ""}
    />
  );
};
