import { NotFoundScene } from "@/components/NotFound/NotFoundScene";
import { siteConfig } from "@/config/site.config";

/** An unknown activity page: the existing ones as ways out */
const ActivityNotFound = () => (
  <NotFoundScene
    eyebrow="Mes activités"
    title="Cette activité n’existe pas"
    text="Le sentier que vous suivez s’arrête ici. Voici les activités que je propose, en personne et en ligne."
    links={siteConfig.mainNavLinks
      .filter((link) => link.footerGroup === "activities")
      .map((link) => ({ href: link.href, label: link.title }))}
  />
);

export default ActivityNotFound;
