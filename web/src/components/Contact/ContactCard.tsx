"use client";

import { Check, Copy } from "lucide-react";
import type { FC, ReactNode } from "react";

import { cn } from "@/components/utils";

import { useCopyFeedback } from "./useCopyFeedback";

export interface ContactCardAction {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
}

interface Props {
  title: string;
  icon: ReactNode;
  value: string;
  /** The first one is the main action */
  actions: ContactCardAction[];
  /** Adds a button copying the value */
  copy?: { label: string; copiedLabel: string } | undefined;
}

const buttonClassName =
  "flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium outline-green-500 transition-colors";
const primaryClassName =
  "bg-title-color-600 hover:bg-title-color-700 text-white";
const secondaryClassName =
  "text-title-color-800 bg-white ring-1 ring-neutral-300 hover:bg-neutral-50";

const CopyButton: FC<{ value: string; label: string; copiedLabel: string }> = (
  props
) => {
  const { value, label, copiedLabel } = props;
  const { copied, copy } = useCopyFeedback(value);
  return (
    <button
      type="button"
      onClick={() => {
        void copy();
      }}
      className={cn(buttonClassName, secondaryClassName)}
    >
      {copied ? (
        <Check aria-hidden="true" className="size-4" />
      ) : (
        <Copy aria-hidden="true" className="size-4" />
      )}
      {/* Announced to screen readers when the value is copied */}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
};

/** A contact channel: its value, the links to use it and a copy button */
export const ContactCard: FC<Props> = (props) => {
  const { title, icon, value, actions, copy } = props;
  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-200 md:p-6">
      <div className="flex items-center gap-4">
        <span className="bg-brand-color-50 text-title-color-700 flex size-12 flex-none items-center justify-center rounded-full">
          {icon}
        </span>
        <div className="min-w-0">
          <h2 className="text-title-color-600 text-xs font-medium tracking-widest uppercase">
            {title}
          </h2>
          <p className="text-title-color-800 mt-1 text-lg font-medium break-all tabular-nums">
            {value}
          </p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <a
            key={action.href}
            href={action.href}
            {...(action.external === true && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            className={cn(
              buttonClassName,
              index === 0 ? primaryClassName : secondaryClassName
            )}
          >
            {action.icon}
            {action.label}
          </a>
        ))}
        {copy && (
          <CopyButton
            value={value}
            label={copy.label}
            copiedLabel={copy.copiedLabel}
          />
        )}
      </div>
    </div>
  );
};
