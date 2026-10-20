"use client";

import { Check, Send } from "lucide-react";
import { useActionState, useId } from "react";
import type { FC } from "react";

import { cn } from "@/components/utils";
import type { NewsletterSubscriberRequestDataSource } from "@/openapi/model";

import { subscribeToNewsletter } from "./newsletter.actions";
import type { NewsletterState } from "./newsletter.actions";

interface Props {
  /** Where the form is, kept with the subscription */
  source: NewsletterSubscriberRequestDataSource;
  className?: string;
}

const initialState: NewsletterState = { status: "idle" };

/** An email field subscribing to the newsletter */
export const NewsletterForm: FC<Props> = (props) => {
  const { source, className } = props;
  const [state, formAction, pending] = useActionState(
    subscribeToNewsletter,
    initialState
  );
  const emailId = useId();
  const messageId = useId();

  if (state.status === "success") {
    return (
      <output
        className={cn(
          "text-title-color-800 flex items-center gap-2 font-medium",
          className
        )}
      >
        <Check aria-hidden="true" className="text-title-color-600 size-5" />
        Merci, votre inscription est bien enregistrée.
      </output>
    );
  }

  return (
    <form action={formAction} className={cn("flex flex-col gap-2", className)}>
      <input type="hidden" name="source" value={source} />
      {/* Honeypot: out of sight and of the tab order */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor={emailId} className="sr-only">
        Votre adresse e-mail
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={emailId}
          type="email"
          name="email"
          required={true}
          autoComplete="email"
          placeholder="Votre adresse e-mail"
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? messageId : undefined}
          className="text-title-color-800 min-w-0 flex-1 rounded-full bg-white px-5 py-2.5 ring-1 ring-neutral-300 outline-green-500 placeholder:text-neutral-500"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-title-color-600 hover:bg-title-color-700 flex flex-none cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-sm outline-green-500 transition-colors disabled:cursor-wait disabled:opacity-70"
        >
          <Send aria-hidden="true" className="size-4" />
          {pending ? "Inscription…" : "S’inscrire"}
        </button>
      </div>
      {state.status === "error" && (
        <p id={messageId} role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}
    </form>
  );
};
