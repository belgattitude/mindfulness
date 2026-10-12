"use client";

import { Popover } from "@base-ui/react/popover";
import { Check, Copy, Mail, Phone } from "lucide-react";
import type { FC, ReactNode } from "react";

import { getTelUrl, getWhatsappUrl } from "@/components/Contact/contact.utils";
import { WhatsappIcon } from "@/components/Contact/ContactIcons";
import { useCopyFeedback } from "@/components/Contact/useCopyFeedback";

const actionClassName =
  "text-nav-title hover:bg-brand-color-100 flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium outline-green-500 transition-colors";

interface ContactAction {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
}

interface ContactPopoverProps {
  /** Accessible name of the trigger, an icon only */
  label: string;
  title: string;
  icon: ReactNode;
  /** Shown in the popup and copied to the clipboard */
  value: string;
  copyLabel: string;
  copiedLabel: string;
  actions: ContactAction[];
  className?: string | undefined;
}

/** An icon button opening a popup: the contact value, its links and a copy */
const ContactPopover: FC<ContactPopoverProps> = (props) => {
  const { label, title, icon, value, copyLabel, copiedLabel, actions } = props;
  const { copied, copy } = useCopyFeedback(value);

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label={label}
        title={title}
        className={props.className}
      >
        {icon}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="top" sideOffset={8} className="z-50">
          <Popover.Popup className="font-family-primary w-72 origin-(--transform-origin) rounded-2xl bg-white p-4 text-neutral-700 shadow-lg ring-1 ring-black/5 transition-[transform,opacity] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
            <Popover.Title className="text-nav-title flex items-center gap-2 text-sm font-medium tracking-widest uppercase">
              {icon}
              {title}
            </Popover.Title>
            <Popover.Description className="text-title-color-800 mt-2 text-lg font-medium break-all tabular-nums">
              {value}
            </Popover.Description>
            <div className="mt-3 flex flex-col gap-1">
              {actions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  {...(action.external === true && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={actionClassName}
                >
                  {action.icon}
                  {action.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  void copy();
                }}
                className={actionClassName}
              >
                {copied ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  <Copy aria-hidden="true" className="size-4" />
                )}
                {/* Announced to screen readers when the value is copied */}
                <span aria-live="polite">
                  {copied ? copiedLabel : copyLabel}
                </span>
              </button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};

interface PhonePopoverProps {
  /** International number, as shown: "+32 476 298 224" */
  phone: string;
  /** The number is on WhatsApp */
  whatsapp: boolean;
  className?: string;
}

/**
 * The phone number in a popup: open a WhatsApp chat (wa.me, the app or
 * WhatsApp web), call or copy the number.
 */
export const PhonePopover: FC<PhonePopoverProps> = (props) => {
  const { phone, whatsapp, className } = props;
  const whatsappAction: ContactAction = {
    href: getWhatsappUrl(phone),
    label: "Écrire sur WhatsApp",
    icon: <WhatsappIcon className="size-4" />,
    external: true,
  };
  const callAction: ContactAction = {
    href: getTelUrl(phone),
    label: "Appeler",
    icon: <Phone aria-hidden="true" className="size-4" />,
  };
  return (
    <ContactPopover
      label={`${whatsapp ? "WhatsApp" : "Téléphone"} de Sandrine Rauter`}
      title={whatsapp ? "WhatsApp" : "Téléphone"}
      icon={
        whatsapp ? (
          <WhatsappIcon className="size-4" />
        ) : (
          <Phone aria-hidden="true" className="size-4" />
        )
      }
      value={phone}
      copyLabel="Copier le numéro"
      copiedLabel="Numéro copié"
      actions={whatsapp ? [whatsappAction, callAction] : [callAction]}
      className={className}
    />
  );
};

interface EmailPopoverProps {
  email: string;
  className?: string;
}

/** The email address in a popup: write (mail app) or copy the address */
export const EmailPopover: FC<EmailPopoverProps> = (props) => {
  const { email, className } = props;
  return (
    <ContactPopover
      label="E-mail de Sandrine Rauter"
      title="E-mail"
      icon={<Mail aria-hidden="true" className="size-4" />}
      value={email}
      copyLabel="Copier l’adresse"
      copiedLabel="Adresse copiée"
      actions={[
        {
          href: `mailto:${email}`,
          label: "Écrire un e-mail",
          icon: <Mail aria-hidden="true" className="size-4" />,
        },
      ]}
      className={className}
    />
  );
};
