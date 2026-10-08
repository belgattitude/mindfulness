import Link from "next/link";
import type { FC } from "react";

import { siteConfig } from "@/config/site.config";
import type { MainNavLinks } from "@/config/site.config";

import { MainLogo } from "../Logo/MainLogo";

interface Props {
  mainNavLinks: MainNavLinks;
}

interface FooterLink {
  title: string;
  href: string;
}

// Evaluated once per server start, good enough for the copyright
const copyrightYear = new Date().getFullYear();

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
  const { mainNavLinks } = props;
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
      <div className="mx-auto max-w-[1200px] px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 flex flex-col items-start gap-4 lg:col-span-1">
            <Link
              href="/"
              className="image-rendering-unblur flex items-center gap-3 outline-green-500"
            >
              <MainLogo
                width={90}
                height={60}
                priority={false}
                className="h-[52px] w-auto"
              />
              <span className="font-family-brand text-nav-title text-xl">
                {siteConfig.metadata.siteTitle}
              </span>
            </Link>
            <p className="max-w-xs leading-relaxed">
              Mindfulness, yoga et dialogue conscient. En personne et en ligne,
              en France et en Belgique.
            </p>
            <Link
              href="/contact"
              className="text-nav-title rounded-full bg-white/70 px-5 py-2 text-sm font-medium shadow-sm outline-green-500 transition-colors hover:bg-white"
            >
              Me contacter
            </Link>
          </div>

          <FooterColumn title="Activités" links={byGroup("activities")} />
          <FooterColumn title="Agenda" links={agendaLinks} />
          <FooterColumn title="Infos" links={byGroup("menu")} />
        </div>

        <div className="mt-12 border-t border-white/50 pt-6 text-sm text-neutral-600">
          © {copyrightYear} {siteConfig.metadata.siteTitle}
        </div>
      </div>
    </footer>
  );
};
