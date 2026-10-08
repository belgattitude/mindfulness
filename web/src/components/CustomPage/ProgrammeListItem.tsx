import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/Button/Button";
import { MarkdownText } from "@/components/MarkdownText";
import { useFragment } from "@/gql/fragment-masking";
import { getStrapiMedia } from "@/lib/strapi";

import { fullProgrammeFragment } from "../../api/programmes";
import type { FetchProgramme } from "../../api/programmes";

interface Props {
  children?: never;
  programme: FetchProgramme;
  className?: string;
}

export const ProgrammeListItem: FC<Props> = (props) => {
  const { className = "", programme } = props;
  const data = useFragment(fullProgrammeFragment, programme);
  return (
    <div
      className={twMerge(
        clsx("prose-lg my-5 flex flex-col gap-5 border-5 py-5 md:flex-row"),
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
