"use client";

import { ArrowDown, ArrowRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { EventCard } from "@/components/Event/EventCard";
import { getEventStatus } from "@/components/Event/EventMeta";
import {
  EventMiniItem,
  getNextEvents,
  getPastEvents,
} from "@/components/Event/EventMiniItem";
import { MarkdownText } from "@/components/MarkdownText";
import { PageContent } from "@/components/PageContent";
import { ProseContent } from "@/components/ProseContent";
import { ShareButton } from "@/components/Share/ShareButton";
import { getStrapiMedia } from "@/lib/strapi";
import { getTextExcerpt, isRedundantSummary } from "@/lib/text/text.utils";
import type { Event, GetProgrammesParams, Programme } from "@/openapi/model";
import { useGetProgrammes } from "@/openapi/programme/programme";

interface Props {
  /** The params prefetched by the server component (same query key) */
  params: GetProgrammesParams;
  /** Reference date (iso) for the sessions, set by the server */
  now: string;
}

/** Past sessions are only a reminder, the agenda has them all */
const maxPastEvents = 3;

/** At a glance: next session, contact and share */
const ProgrammeSummaryPanel: FC<{
  programme: Programme;
  nextEvents: Event[];
  now: string;
  shareText: string;
}> = (props) => {
  const { programme, nextEvents, now, shareText } = props;
  const [nextEvent] = nextEvents;
  return (
    <div className="bg-brand-color-50 ring-brand-color-200 flex flex-col gap-5 rounded-2xl p-6 ring-1 lg:sticky lg:top-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-title-color-800 flex items-center gap-2 text-lg font-medium">
          <CalendarDays
            aria-hidden="true"
            className="text-title-color-500 size-5"
          />
          Prochaine session
        </h2>
        {nextEvent === undefined ? (
          <p className="text-sm text-neutral-600">
            Aucune date prévue pour le moment.
          </p>
        ) : (
          <EventMiniItem
            event={nextEvent}
            now={now}
            className="hover:bg-white"
          />
        )}
        <a
          href="#dates"
          className="text-title-color-600 hover:text-title-color-800 flex w-fit items-center gap-1 text-sm font-medium outline-green-500 transition-colors"
        >
          {nextEvents.length > 1
            ? `Voir les ${nextEvents.length} dates`
            : "Voir les dates"}
          <ArrowDown aria-hidden="true" className="size-4" />
        </a>
      </div>

      <div className="border-brand-color-200 flex flex-col gap-2 border-t pt-5">
        <Link
          href="/contact"
          className="bg-title-color-600 hover:bg-title-color-700 rounded-full px-4 py-2.5 text-center text-sm font-medium text-white outline-green-500 transition-colors"
        >
          {nextEvent === undefined
            ? "Être informé·e des prochaines dates"
            : "Me contacter pour participer"}
        </Link>
        <ShareButton title={programme.title ?? ""} text={shareText} />
      </div>
    </div>
  );
};

/** The programme sessions, as in the agenda: the page can be shared as is */
const ProgrammeDates: FC<{
  nextEvents: Event[];
  pastEvents: Event[];
  now: string;
}> = (props) => {
  const { nextEvents, pastEvents, now } = props;
  return (
    <section id="dates" className="flex scroll-mt-6 flex-col gap-5">
      <h2 className="text-title-color-800 text-2xl font-light">
        Dates à l&rsquo;agenda
      </h2>
      {nextEvents.length === 0 ? (
        <p className="text-neutral-600">
          Aucune date prévue pour le moment, n&rsquo;hésitez pas à me contacter
          pour être informé·e des prochaines sessions.
        </p>
      ) : (
        <ul className="flex flex-col gap-5">
          {nextEvents.map((event) => (
            <li key={event.documentId}>
              <EventCard
                event={event}
                status={getEventStatus({
                  startAt: event.startAt,
                  endAt: event.endAt,
                  now,
                })}
              />
            </li>
          ))}
        </ul>
      )}
      {pastEvents.length > 0 && (
        <>
          <h3 className="text-title-color-800 mt-4 text-xl font-light">
            Sessions passées
          </h3>
          <ul className="flex flex-col gap-5">
            {pastEvents.map((event) => (
              <li key={event.documentId}>
                <EventCard event={event} status="past" />
              </li>
            ))}
          </ul>
        </>
      )}
      <Link
        href="/agenda"
        className="text-title-color-600 hover:text-title-color-800 flex w-fit items-center gap-1 text-sm font-medium outline-green-500 transition-colors"
      >
        Voir tout l&rsquo;agenda
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
};

export const ProgrammePage: FC<Props> = (props) => {
  const { params, now } = props;
  const { data: response, error, isPending } = useGetProgrammes(params);

  if (isPending) {
    return null;
  }
  if (error) {
    return <p className="text-red-700">Impossible de charger le programme.</p>;
  }
  const programme = response.data?.[0];
  if (!programme) {
    return <p>NotFound</p>;
  }

  const cover = getStrapiMedia(programme.cover);
  const description = programme.description ?? "";
  const summary =
    programme.summary &&
    !isRedundantSummary(programme.summary, {
      title: programme.title ?? "",
      description,
    })
      ? programme.summary
      : null;
  const events = programme.events ?? [];
  const nextEvents = getNextEvents(events, now);
  const pastEvents = getPastEvents(events, now).slice(0, maxPastEvents);

  return (
    <PageContent className="w-full" title={["Programmes et cycles"]}>
      <header className="flex flex-col gap-3">
        <span className="bg-brand-color-100 text-title-color-800 w-fit rounded-full px-2.5 py-1 text-xs font-medium">
          Programme
        </span>
        <h1 className="text-title-color-800 text-3xl leading-tight font-normal lg:text-4xl">
          {programme.title}
        </h1>
        {summary !== null && (
          <p className="max-w-3xl text-lg leading-8 text-neutral-600">
            {summary}
          </p>
        )}
      </header>

      {cover !== null && (
        // The covers are posters (text, portrait): shown whole, over a blurred
        // copy of themselves
        <div className="bg-brand-color-200 relative mt-8 h-72 overflow-hidden rounded-2xl md:h-96">
          <Image
            alt=""
            fill={true}
            sizes="100vw"
            className="scale-110 object-cover opacity-60 blur-2xl"
            src={cover}
          />
          <Image
            alt={programme.cover?.alternativeText ?? ""}
            fill={true}
            priority={true}
            sizes="(min-width: 1280px) 1100px, 100vw"
            className="object-contain p-4 drop-shadow-xl md:p-6"
            src={cover}
          />
        </div>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* First on small screens, next to the description on large ones */}
        <aside className="lg:col-start-2 lg:row-start-1">
          <ProgrammeSummaryPanel
            programme={programme}
            nextEvents={nextEvents}
            now={now}
            shareText={programme.summary ?? getTextExcerpt(description)}
          />
        </aside>
        <div className="flex flex-col gap-12 lg:col-start-1 lg:row-start-1">
          <ProseContent className="[&_h1]:text-2xl lg:[&_h1]:text-2xl [&_h2]:text-xl [&_h2]:font-normal">
            <MarkdownText text={description} />
          </ProseContent>
          <ProgrammeDates
            nextEvents={nextEvents}
            pastEvents={pastEvents}
            now={now}
          />
        </div>
      </div>
    </PageContent>
  );
};
