import { NotFoundScene } from "@/components/NotFound/NotFoundScene";

/** Unknown agenda filters (url segments) */
const AgendaNotFound = () => (
  <NotFoundScene
    eyebrow="Agenda"
    title="Ce chemin ne mène à aucune date"
    text="Cette sélection de l’agenda n’existe pas. Retrouvez toutes les dates, puis choisissez un univers ou un type d’activité."
    links={[
      { href: "/agenda", label: "Voir tout l’agenda" },
      { href: "/", label: "Retour à l’accueil" },
    ]}
  />
);

export default AgendaNotFound;
