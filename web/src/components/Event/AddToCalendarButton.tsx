"use client";

import { Popover } from "@base-ui/react/popover";
import { CalendarPlus, Download, ExternalLink } from "lucide-react";
import type { FC } from "react";

import { siteConfig } from "@/config/site.config";
import { getGoogleCalendarUrl } from "@/lib/calendar/calendar.utils";
import type { Event } from "@/openapi/model";

import { getCalendarEvent, getEventIcsPath } from "./eventCalendar";

const actionClassName =
  "text-nav-title hover:bg-brand-color-100 flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium outline-green-500 transition-colors";

/** Google opens its form, the others read the .ics file */
export const AddToCalendarButton: FC<{ event: Event }> = (props) => {
  const { event } = props;
  const calendarEvent = getCalendarEvent(event, {
    siteUrl: siteConfig.canonicalUrl || null,
  });
  return (
    <Popover.Root>
      <Popover.Trigger className="border-brand-color-400 text-title-color-800 hover:bg-brand-color-100 flex cursor-pointer items-center justify-center gap-2 rounded-full border bg-white px-4 py-2.5 text-sm font-medium outline-green-500 transition-colors">
        <CalendarPlus aria-hidden="true" className="size-4" />
        Ajouter à mon agenda
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" sideOffset={8} className="z-50">
          <Popover.Popup className="font-family-primary w-64 origin-(--transform-origin) rounded-2xl bg-white p-2 text-neutral-700 shadow-lg ring-1 ring-black/5 transition-[transform,opacity] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Popover.Title className="sr-only">
              Ajouter à mon agenda
            </Popover.Title>
            <div className="flex flex-col gap-1">
              <a
                href={getGoogleCalendarUrl(calendarEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClassName}
              >
                <ExternalLink aria-hidden="true" className="size-4" />
                Google Agenda
              </a>
              <a
                href={getEventIcsPath(event.slug)}
                download={`${event.slug}.ics`}
                className={actionClassName}
              >
                <Download aria-hidden="true" className="size-4" />
                Apple, Outlook… (.ics)
              </a>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
