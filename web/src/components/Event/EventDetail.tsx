"use client";

import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  MapPin,
  MonitorPlay,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC, ReactNode } from "react";

import { DateRangeText } from "@/components/DateRangeText";
import { MarkdownText } from "@/components/MarkdownText";
import { ProseContent } from "@/components/ProseContent";
import { ShareButton } from "@/components/Share/ShareButton";
import { getStrapiMedia } from "@/lib/strapi";
import { getTextExcerpt, isRedundantSummary } from "@/lib/text/text.utils";
import { useGetEvents } from "@/openapi/event/event";
import type { Event, GetEventsParams } from "@/openapi/model";

import { PageBackgroundImg } from "../PageBackgroundImg";
import { PageContent } from "../PageContent";
import {
  EventDateBadge,
  EventTags,
  getEventStatus,
  isOnlineEvent,
} from "./EventMeta";
import type { EventStatus } from "./EventMeta";

interface Props {
  /** The params prefetched by the server component (same query key) */
  params: GetEventsParams;
  /** Reference date (iso) for the event status, set by the server */
  now: string;
}

const InfoItem: FC<{ icon: ReactNode; label: string; children: ReactNode }> = (
  props
) => {
  const { icon, label, children } = props;
  return (
    <div className="flex gap-3">
      <div className="text-title-color-500 mt-0.5 flex-none">{icon}</div>
      <div>
        <dt className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
          {label}
        </dt>
        <dd className="text-neutral-800">{children}</dd>
      </div>
    </div>
  );
};

const iconClassName = "size-5";

/** Dates, place, organizers, programmes and actions */
const EventInfoPanel: FC<{ event: Event; status: EventStatus }> = (props) => {
  const { event, status } = props;
  const online = isOnlineEvent(event);
  const programmes = (event.programmes ?? []).filter((p) => p.slug);
  return (
    <div className="bg-brand-color-50 ring-brand-color-200 flex flex-col gap-6 rounded-2xl p-6 ring-1 lg:sticky lg:top-6">
      <h2 className="text-title-color-800 text-lg font-medium">
        Infos pratiques
      </h2>
      <dl className="flex flex-col gap-4 text-sm">
        <InfoItem
          label="Dates"
          icon={<CalendarDays aria-hidden="true" className={iconClassName} />}
        >
          <DateRangeText
            startAt={event.startAt}
            endAt={event.endAt}
            className="first-letter:capitalize"
          />
        </InfoItem>
        {online ? (
          <InfoItem
            label="Lieu"
            icon={<MonitorPlay aria-hidden="true" className={iconClassName} />}
          >
            En ligne
          </InfoItem>
        ) : (
          event.location && (
            <InfoItem
              label="Lieu"
              icon={<MapPin aria-hidden="true" className={iconClassName} />}
            >
              {event.location}
            </InfoItem>
          )
        )}
        {event.organizers && (
          <InfoItem
            label="Animé par"
            icon={<Users aria-hidden="true" className={iconClassName} />}
          >
            {event.organizers}
          </InfoItem>
        )}
      </dl>

      {programmes.length > 0 && (
        <div className="border-brand-color-200 flex flex-col gap-2 border-t pt-5 text-sm">
          <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
            {programmes.length === 1
              ? "Fait partie du programme"
              : "Fait partie des programmes"}
          </p>
          <ul className="flex flex-col gap-1.5">
            {programmes.map((programme) => (
              <li key={programme.documentId}>
                <Link
                  href={`/programme/${encodeURIComponent(programme.slug ?? "")}`}
                  className="text-title-color-700 hover:text-title-color-900 font-medium underline decoration-current/30 underline-offset-4 outline-green-500 hover:decoration-current"
                >
                  {programme.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Link
          href="/contact"
          className="bg-title-color-600 hover:bg-title-color-700 rounded-full px-4 py-2.5 text-center text-sm font-medium text-white outline-green-500 transition-colors"
        >
          {status === "past"
            ? "Être informé·e des prochaines dates"
            : "Me contacter pour participer"}
        </Link>
        {event.facebookLink && (
          <a
            href={event.facebookLink}
            target="_blank"
            rel="noreferrer"
            className="border-brand-color-400 text-title-color-800 hover:bg-brand-color-100 flex items-center justify-center gap-2 rounded-full border bg-white px-4 py-2.5 text-sm font-medium outline-green-500 transition-colors"
          >
            <ExternalLink aria-hidden="true" className="size-4" />
            Voir sur Facebook
          </a>
        )}
        <ShareButton
          title={event.displayTitle ?? event.title}
          text={event.summary || getTextExcerpt(event.description ?? "")}
        />
      </div>
    </div>
  );
};

export const EventDetail: FC<Props> = (props) => {
  const { params, now } = props;
  const { data, error, isPending } = useGetEvents(params);

  if (isPending) {
    return null;
  }
  if (error) {
    return (
      <p className="text-red-700">Impossible de charger l&rsquo;événement.</p>
    );
  }
  const event = data.data?.[0];
  if (!event) {
    return <p>NotFound</p>;
  }

  const cover = getStrapiMedia(event.cover);
  const status = getEventStatus({
    startAt: event.startAt,
    endAt: event.endAt,
    now,
  });
  const summary =
    event.summary &&
    !isRedundantSummary(event.summary, {
      title: event.displayTitle ?? event.title,
      description: event.description ?? "",
    })
      ? event.summary
      : null;

  return (
    <div className="flex flex-1">
      <PageBackgroundImg url={cover ?? ""} />
      <PageContent className="z-10 w-full" title="Agenda">
        <Link
          href="/agenda"
          className="text-title-color-600 hover:text-title-color-800 flex w-fit items-center gap-1.5 text-sm font-medium outline-green-500 transition-colors"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Retour à l&rsquo;agenda
        </Link>

        <header className="mt-6 flex flex-col gap-3">
          <EventTags eventType={event.eventType} status={status} />
          <h1 className="text-title-color-800 text-3xl leading-tight font-normal lg:text-4xl">
            {event.displayTitle ?? event.title}
          </h1>
          {summary !== null && (
            <p className="max-w-3xl text-lg leading-8 text-neutral-600">
              {summary}
            </p>
          )}
        </header>

        {cover !== null && (
          <div className="bg-brand-color-200 relative mt-8 aspect-16/9 overflow-hidden rounded-2xl md:aspect-21/9">
            <Image
              alt=""
              fill={true}
              priority={true}
              sizes="(min-width: 1280px) 1100px, 100vw"
              className="object-cover"
              src={cover}
            />
            <EventDateBadge
              startAt={event.startAt}
              className="absolute top-4 left-4"
            />
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          {/* First on small screens, next to the description on large ones */}
          <aside className="lg:col-start-2 lg:row-start-1">
            <EventInfoPanel event={event} status={status} />
          </aside>

          <ProseContent className="lg:col-start-1 lg:row-start-1 [&_h1]:text-2xl lg:[&_h1]:text-2xl [&_h2]:text-xl [&_h2]:font-normal">
            <MarkdownText text={event.description ?? ""} />
          </ProseContent>
        </div>
      </PageContent>
    </div>
  );
};
