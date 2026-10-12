"use client";

import { ExternalLink, Mail, Phone } from "lucide-react";
import type { FC } from "react";

import { BlocksText } from "@/components/BlocksText";
import { ProseContent } from "@/components/ProseContent";
import { useGetContact } from "@/openapi/contact/contact";
import type { Contact } from "@/openapi/model";

import { getTelUrl, getWhatsappUrl } from "./contact.utils";
import { ContactCard } from "./ContactCard";
import type { ContactCardAction } from "./ContactCard";
import { LinkedinIcon, WhatsappIcon } from "./ContactIcons";

const ContactCards: FC<{ contact: Contact }> = (props) => {
  const { email, phone, whatsapp, linkedin } = props.contact;
  const callAction: ContactCardAction | null = phone
    ? {
        href: getTelUrl(phone),
        label: "Appeler",
        icon: <Phone aria-hidden="true" className="size-4" />,
      }
    : null;
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {phone && callAction && (
        <li>
          <ContactCard
            title={whatsapp ? "WhatsApp et téléphone" : "Téléphone"}
            icon={
              whatsapp ? (
                <WhatsappIcon className="size-5" />
              ) : (
                <Phone aria-hidden="true" className="size-5" />
              )
            }
            value={phone}
            actions={
              whatsapp
                ? [
                    {
                      href: getWhatsappUrl(phone),
                      label: "Écrire sur WhatsApp",
                      icon: <WhatsappIcon className="size-4" />,
                      external: true,
                    },
                    callAction,
                  ]
                : [callAction]
            }
            copy={{ label: "Copier", copiedLabel: "Numéro copié" }}
          />
        </li>
      )}
      {email && (
        <li>
          <ContactCard
            title="E-mail"
            icon={<Mail aria-hidden="true" className="size-5" />}
            value={email}
            actions={[
              {
                href: `mailto:${email}`,
                label: "Écrire un e-mail",
                icon: <Mail aria-hidden="true" className="size-4" />,
              },
            ]}
            copy={{ label: "Copier", copiedLabel: "Adresse copiée" }}
          />
        </li>
      )}
      {linkedin && (
        <li>
          <ContactCard
            title="LinkedIn"
            icon={<LinkedinIcon className="size-5" />}
            value="Sandrine Rauter"
            actions={[
              {
                href: linkedin,
                label: "Voir le profil",
                icon: <ExternalLink aria-hidden="true" className="size-4" />,
                external: true,
              },
            ]}
          />
        </li>
      )}
    </ul>
  );
};

/** The contact page, prefetched by the server component */
export const ContactPageContent: FC = () => {
  const { data, error, isPending } = useGetContact();

  if (isPending) {
    return null;
  }
  if (error) {
    return <p className="text-red-700">Impossible de charger la page.</p>;
  }
  const contact = data.data;
  if (!contact) {
    return <p>NotFound</p>;
  }
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-title-color-800 text-3xl leading-tight font-normal lg:text-4xl">
          {contact.title ?? "Contact"}
        </h1>
        {contact.summary && (
          <p className="text-title-color-600 text-lg italic">
            {contact.summary}
          </p>
        )}
        <ProseContent className="[&_p:first-child]:mt-0">
          <BlocksText
            className="text-title-color-800"
            content={contact.description}
          />
        </ProseContent>
      </header>
      <ContactCards contact={contact} />
    </div>
  );
};
