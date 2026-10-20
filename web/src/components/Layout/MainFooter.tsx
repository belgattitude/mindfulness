import Link from "next/link";
import type { FC } from "react";

import type { ContactDetails } from "@/components/Contact/contact.utils";
import { LinkedinIcon } from "@/components/Contact/ContactIcons";
import { NewsletterForm } from "@/components/Newsletter/NewsletterForm";
import { siteConfig } from "@/config/site.config";
import type { MainNavLinks } from "@/config/site.config";

import { MainLogo } from "../Logo/MainLogo";
import { EmailPopover, PhonePopover } from "./ContactPopovers";

interface Props {
  mainNavLinks: MainNavLinks;
  /** From strapi, null when it could not be loaded */
  contact: ContactDetails | null;
}

interface FooterLink {
  title: string;
  href: string;
}

// Evaluated once per server start, good enough for the copyright
const copyrightYear = new Date().getFullYear();

const iconButtonClassName =
  "text-nav-title flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/70 shadow-sm outline-green-500 transition-colors hover:bg-white";

const linkClassName =
  "text-neutral-700 decoration-nav-title/40 underline-offset-4 transition-colors outline-green-500 hover:text-nav-title hover:underline";

const FooterColumn: FC<{ title: string; links: FooterLink[] }> = (props) => {
  const { title, links } = props;
  return (
    <nav aria-label={`Pied de page - ${title}`}>
      <p className="text-nav-title text-sm font-medium tracking-widest uppercase">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClassName}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const MainFooter: FC<Props> = (props) => {
  const { mainNavLinks, contact } = props;
  const byGroup = (group: MainNavLinks[number]["footerGroup"]) =>
    mainNavLinks.filter((link) => link.footerGroup === group);

  const agendaLinks: FooterLink[] = [
    ...siteConfig.search.eventTypes.map(({ slug, title }) => ({
      href: `/agenda/${slug}`,
      title,
    })),
    ...byGroup("agenda").map(({ href }) => ({
      href,
      title: "Tout l’agenda",
    })),
  ];

  return (
    <footer
      aria-label="Pied de page"
      className="radial-gradient bg-brand-color-600 font-family-primary mt-10 w-full border-t border-white/60 text-neutral-700"
    >
      {/* Above the page background image, which shows over the gradient */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col items-start gap-4 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 outline-green-500"
            >
              <MainLogo className="h-[52px] w-auto" />
              <span className="font-family-brand text-nav-title text-xl">
                {siteConfig.metadata.siteTitle}
              </span>
            </Link>
            <p className="max-w-xs leading-relaxed">
              Mindfulness, yoga et dialogue conscient. En personne et en ligne,
              en France et en Belgique.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="text-nav-title rounded-full bg-white/70 px-5 py-2 text-sm font-medium shadow-sm outline-green-500 transition-colors hover:bg-white"
              >
                Me contacter
              </Link>
              {contact?.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de Sandrine Rauter"
                  title="LinkedIn"
                  className={iconButtonClassName}
                >
                  <LinkedinIcon className="size-4" />
                </a>
              )}
              {contact?.phone && (
                <PhonePopover
                  phone={contact.phone}
                  whatsapp={contact.whatsapp ?? false}
                  className={iconButtonClassName}
                />
              )}
              {contact?.email && (
                <EmailPopover
                  email={contact.email}
                  className={iconButtonClassName}
                />
              )}
            </div>
          </div>

          <FooterColumn title="Activités" links={byGroup("activities")} />
          <FooterColumn title="Agenda" links={agendaLinks} />
          <FooterColumn title="Infos" links={byGroup("menu")} />
        </div>

        <section
          aria-labelledby="footer-newsletter-title"
          className="mt-12 flex flex-col gap-4 rounded-2xl bg-white/50 p-5 md:flex-row md:items-center md:justify-between md:gap-8 md:p-6"
        >
          <div>
            <p
              id="footer-newsletter-title"
              className="text-nav-title text-sm font-medium tracking-widest uppercase"
            >
              Newsletter
            </p>
            <p className="mt-2 leading-relaxed">
              Les prochains cours, stages et retraites, quelques fois par an.
            </p>
          </div>
          <NewsletterForm source="footer" className="w-full md:max-w-md" />
        </section>

        <div className="mt-10 border-t border-white/50 pt-6 text-sm text-neutral-600">
          © {copyrightYear} {siteConfig.metadata.siteTitle}
        </div>
      </div>
    </footer>
  );
};
