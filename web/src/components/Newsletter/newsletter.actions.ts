"use server";

import { isHttpException } from "@httpx/exception";
import { z } from "zod";

import { NewsletterSubscriberRequestDataSource } from "@/openapi/model";
import { postNewsletterSubscribersSubscribe } from "@/openapi/newsletter-subscriber/newsletter-subscriber";

export type NewsletterState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const schema = z.object({
  email: z.email(),
  source: z.enum(NewsletterSubscriberRequestDataSource),
});

/** Subscribes an email to the newsletter, stored in strapi */
export const subscribeToNewsletter = async (
  _previous: NewsletterState,
  formData: FormData
): Promise<NewsletterState> => {
  // The honeypot field is hidden to people: only bots fill it
  if (formData.get("website")) {
    return { status: "success" };
  }
  const parsed = schema.safeParse({
    email: String(formData.get("email") ?? "").trim(),
    source: formData.get("source"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: "Cette adresse e-mail ne semble pas valide.",
    };
  }
  try {
    await postNewsletterSubscribersSubscribe({ data: parsed.data });
    return { status: "success" };
  } catch (error) {
    if (isHttpException(error) && error.statusCode === 400) {
      return {
        status: "error",
        message: "Cette adresse e-mail ne semble pas valide.",
      };
    }
    console.error("Newsletter subscription failed", error);
    return {
      status: "error",
      message:
        "L’inscription n’a pas pu aboutir, merci de réessayer plus tard.",
    };
  }
};
