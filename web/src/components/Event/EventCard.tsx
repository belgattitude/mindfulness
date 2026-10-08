import { clsx } from "clsx";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  MonitorPlay,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { DateRangeText } from "@/components/DateRangeText";
import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiMedia } from "@/lib/strapi/getStrapiMedia";

import { EventDateBadge, EventTags, isOnlineEvent } from "./EventMeta";
import type { EventStatus } from "./EventMeta";

/** The fields used by the card */
export interface EventCardEvent {
  slug: string;
  title: string;
  displayTitle?: string | null;
  summary?: string | null;
  startAt: string;
  endAt: string;
  cover?: StrapiMedia | null;
  eventType?: string | null;
  location?: string | null;
  organizers?: string | null;
  online?: boolean | null;
}

interface Props {
  event: EventCardEvent;
  status: EventStatus;
  className?: string;
}

export const EventCard: FC<Props> = (props) => {
  const { className = "", event, status } = props;
  const eventUrl = `/event/${encodeURIComponent(event.slug)}`;
  const cover = getStrapiMedia(event.cover);
  const online = isOnlineEvent(event);
  const isPast = status === "past";

  return (
    <Link
      href={eventUrl}
      className={twMerge(
        clsx(
          "group ring-brand-color-200 flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 outline-green-500 transition-shadow duration-300 hover:shadow-lg md:flex-row",
          { "opacity-75 hover:opacity-100": isPast }
        ),
        className
      )}
    >
      <div className="bg-brand-color-200 relative aspect-16/10 flex-none overflow-hidden md:aspect-auto md:min-h-48 md:w-72">
        {cover !== null && (
          <Image
            alt=""
            fill={true}
            sizes="(min-width: 768px) 288px, 100vw"
            className={clsx(
              "object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none",
              { grayscale: isPast }
            )}
            src={cover}
          />
        )}
        <EventDateBadge
          startAt={event.startAt}
          className="absolute top-3 left-3"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <EventTags eventType={event.eventType} status={status} />

        <h3 className="text-title-color-800 group-hover:text-title-color-600 text-xl leading-snug font-medium transition-colors">
          {event.displayTitle ?? event.title}
        </h3>

        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-neutral-600">
          <li className="flex items-center gap-1.5">
            <CalendarDays
              aria-hidden="true"
              className="text-title-color-500 size-4 flex-none"
            />
            <DateRangeText
              startAt={event.startAt}
              endAt={event.endAt}
              className="first-letter:capitalize"
            />
          </li>
          {online ? (
            <li className="flex items-center gap-1.5">
              <MonitorPlay
                aria-hidden="true"
                className="text-title-color-500 size-4 flex-none"
              />
              En ligne
            </li>
          ) : (
            event.location && (
              <li className="flex items-center gap-1.5">
                <MapPin
                  aria-hidden="true"
                  className="text-title-color-500 size-4 flex-none"
                />
                {event.location}
              </li>
            )
          )}
          {event.organizers && (
            <li className="flex items-center gap-1.5">
              <Users
                aria-hidden="true"
                className="text-title-color-500 size-4 flex-none"
              />
              {event.organizers}
            </li>
          )}
        </ul>

        {event.summary && (
          <p className="line-clamp-2 text-base leading-7 text-neutral-700">
            {event.summary}
          </p>
        )}

        <span className="text-title-color-600 mt-auto flex items-center gap-1 pt-1 text-sm font-medium">
          Voir le détail
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </span>
      </div>
    </Link>
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
      <article className="typeset px-6 py-4">
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
