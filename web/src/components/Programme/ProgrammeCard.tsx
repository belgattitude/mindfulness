import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { EventMiniItem, getNextEvents } from "@/components/Event/EventMiniItem";
import { getStrapiMedia } from "@/lib/strapi";
import type { Programme } from "@/openapi/model";

interface Props {
  programme: Programme;
  /** Reference date (iso) to find the next events, set by the server */
  now: string;
  className?: string;
}

/** Shown events, the agenda has them all */
const maxNextEvents = 2;

/** A programme with its next dates, styled like the agenda event cards */
export const ProgrammeCard: FC<Props> = (props) => {
  const { programme, now, className } = props;
  const programmeUrl = `/programme/${encodeURIComponent(programme.slug ?? "")}`;
  const cover = getStrapiMedia(programme.cover);
  const nextEvents = getNextEvents(programme.events ?? [], now).slice(
    0,
    maxNextEvents
  );

  return (
    <article
      className={twMerge(
        "ring-brand-color-200 flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 md:flex-row",
        className
      )}
    >
      <Link
        href={programmeUrl}
        tabIndex={-1}
        aria-hidden="true"
        className="group bg-brand-color-200 relative aspect-16/10 flex-none overflow-hidden md:aspect-auto md:min-h-56 md:w-72"
      >
        {cover !== null && (
          <Image
            alt=""
            fill={true}
            sizes="(min-width: 768px) 288px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
            src={cover}
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl leading-snug font-medium">
            <Link
              href={programmeUrl}
              className="text-title-color-800 hover:text-title-color-600 outline-green-500 transition-colors"
            >
              {programme.title}
            </Link>
          </h3>
          {programme.summary && (
            <p className="line-clamp-3 leading-7 text-neutral-700">
              {programme.summary}
            </p>
          )}
        </div>

        <div className="border-brand-color-100 flex flex-col gap-2 border-t pt-4">
          <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
            Prochaines dates
          </p>
          {nextEvents.length === 0 ? (
            <p className="text-sm text-neutral-600">
              Aucune date prévue pour le moment.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {nextEvents.map((event) => (
                <li key={event.documentId}>
                  <EventMiniItem event={event} now={now} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href={programmeUrl}
          className="text-title-color-600 hover:text-title-color-800 mt-auto flex w-fit items-center gap-1 text-sm font-medium outline-green-500 transition-colors"
        >
          Découvrir le programme
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </article>
  );
};
