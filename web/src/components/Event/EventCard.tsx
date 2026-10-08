import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { DateRangeText } from "@/components/DateRangeText";
import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiMedia } from "@/lib/strapi/getStrapiMedia";

/** The fields used by the card, whatever the api (graphql or rest) */
export interface EventCardEvent {
  slug: string;
  title: string;
  summary?: string | null;
  startAt: string;
  endAt: string;
  cover?: StrapiMedia | null;
}

interface Props {
  event: EventCardEvent;
  className?: string;
}

export const EventCard: FC<Props> = (props) => {
  const { className = "", event } = props;
  const eventUrl = `/event/${encodeURIComponent(event.slug)}`;
  return (
    <div
      className={twMerge(
        clsx("flex flex-col gap-5 pt-5 md:flex-row"),
        className
      )}
    >
      <div className="flex-none md:w-[300px]">
        <Link href={eventUrl}>
          <Image
            alt={`Photo ${event.title}`}
            width={1000}
            height={800}
            priority={true}
            className="relative h-[200px] rounded-sm object-cover"
            style={{
              objectFit: "cover",
            }}
            src={getStrapiMedia(event.cover) ?? ""}
          />
        </Link>
      </div>
      <div className="">
        <div className="text-brand-color-900 text-2xl leading-8 uppercase">
          <Link href={eventUrl} className="text-2xl leading-8 uppercase">
            {event.title}
          </Link>
        </div>

        <DateRangeText
          startAt={event.startAt}
          endAt={event.endAt}
          className="text-indigo-600 first-letter:capitalize"
        />

        <div className="divide-y divide-gray-300/50">
          <div className="space-y-6 py-8 text-base leading-7 font-normal text-neutral-800">
            <p>{event.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EventCardBackup: FC<Props> = (props) => {
  const { event } = props;

  const keywords = ["cool", "test"];

  const eventUrl = `/event/${encodeURIComponent(event.slug)}`;

  return (
    <div className="max-w-sm overflow-hidden rounded-sm shadow-lg">
      <div className="h-56">
        <Link href={eventUrl}>
          <Image
            alt="Cover event"
            width={1000}
            height={800}
            priority={true}
            className="size-full object-cover object-center lg:size-full"
            src={getStrapiMedia(event.cover) ?? ""}
          />
        </Link>
      </div>
      <article className="prose px-6 py-4">
        <div className="mb-2 text-xl font-bold">
          <Link href={eventUrl}>{event.title}</Link>
        </div>
        <DateRangeText
          startAt={event.startAt}
          endAt={event.endAt}
          className="text-indigo-600 first-letter:capitalize"
        />
        <p className="line-clamp-4 text-base text-gray-700">{event.summary}</p>
      </article>
      <div className="px-6 pt-4 pb-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
          >
            #{keyword}
          </span>
        ))}
      </div>
    </div>
  );
};
