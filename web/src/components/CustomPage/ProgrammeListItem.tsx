import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/Button/Button";
import { MarkdownText } from "@/components/MarkdownText";
import { getStrapiMedia } from "@/lib/strapi";
import type { Programme } from "@/openapi/model";

interface Props {
  children?: never;
  programme: Programme;
  className?: string;
}

export const ProgrammeListItem: FC<Props> = (props) => {
  const { className = "", programme: data } = props;
  return (
    <div
      className={twMerge(
        clsx(
          "typeset my-5 flex flex-col gap-5 border-5 py-5 text-inherit [--typeset-flow:1.333em] [--typeset-size:1.125rem] md:flex-row [&_h1]:mt-0 [&_h1]:font-normal"
        ),
        className
      )}
    >
      <div className="flex-none md:w-[250px]">
        <Link href={`/p/i/${data.slug}`}>
          <Image
            alt={`Photo ${
              data.cover?.alternativeText ?? `programme ${data.title}`
            }`}
            width={500}
            height={500}
            priority={true}
            className="relative mt-2 h-[250px] rounded-full object-cover"
            style={{
              objectFit: "cover",
            }}
            src={getStrapiMedia(data.cover) ?? ""}
          />
        </Link>
      </div>
      <div className={twMerge("", className)}>
        <h1 className="text-title-color-600 mb-5 text-2xl">{data.title}</h1>

        <MarkdownText
          className=""
          text={data.summary ?? data.description ?? ""}
        />

        <div className="flex w-full flex-row justify-start gap-2">
          <div>
            <Link href={`/programme/${data.slug}`}>
              {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */}
              <Button>Détail</Button>
            </Link>
          </div>
          <div>
            <Link href="/agenda">
              {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */}
              <Button>Consultez l&apos;agenda</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
