import type { Contact } from "@/openapi/model";

/** The contact channels of the strapi "contact" single type */
export type ContactDetails = Pick<
  Contact,
  "email" | "phone" | "whatsapp" | "linkedin"
>;

const getPhoneDigits = (phone: string) => phone.replaceAll(/\D/gu, "");

/** "+32 476 298 224" → tel:+32476298224 */
export const getTelUrl = (phone: string) => `tel:+${getPhoneDigits(phone)}`;

/** A chat with the number: the app on phones, WhatsApp web on desktops */
export const getWhatsappUrl = (phone: string) =>
  `https://wa.me/${getPhoneDigits(phone)}`;
