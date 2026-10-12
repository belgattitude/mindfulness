import type { Metadata } from "next";

import { NotFoundScene } from "@/components/NotFound/NotFoundScene";

export const metadata: Metadata = {
  title: "Page introuvable",
};

/** Unknown urls (and notFound() outside the sections having their own) */
const NotFound = () => (
  <NotFoundScene
    title="Ce sentier s’efface dans la forêt"
    text="La page que vous cherchez n’existe pas, ou elle a changé de chemin. Prenez une respiration : d’autres sentiers vous attendent."
    links={[
      { href: "/", label: "Retour à l’accueil" },
      { href: "/agenda", label: "Voir l’agenda" },
      { href: "/contact", label: "Me contacter" },
    ]}
  />
);

export default NotFound;
