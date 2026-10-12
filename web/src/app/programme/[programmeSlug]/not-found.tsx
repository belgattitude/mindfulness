import { NotFoundScene } from "@/components/NotFound/NotFoundScene";

/** An unknown programme: renamed or no longer offered */
const ProgrammeNotFound = () => (
  <NotFoundScene
    eyebrow="Programmes et cycles"
    title="Ce programme n’est plus proposé"
    text="Il a peut-être été renommé ou retiré. Découvrez les programmes et cycles à venir dans l’agenda."
    links={[
      { href: "/agenda/programmes-et-cycles", label: "Programmes et cycles" },
      { href: "/agenda", label: "Voir l’agenda" },
    ]}
  />
);

export default ProgrammeNotFound;
