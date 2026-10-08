"use client";

import type { FC } from "react";

import { MarkdownText } from "@/components/MarkdownText";
import { useGetContact } from "@/openapi/contact/contact";

/** The contact page text, prefetched by the server component */
export const ContactPageContent: FC = () => {
  const { data, error, isPending } = useGetContact();

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
