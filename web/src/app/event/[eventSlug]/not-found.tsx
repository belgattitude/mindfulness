import { NotFoundScene } from "@/components/NotFound/NotFoundScene";

/** An unknown event: passed and removed, renamed… */
const EventNotFound = () => (
  <NotFoundScene
    eyebrow="Agenda"
    title="Cet événement n’est plus à l’agenda"
    text="Il a peut-être déjà eu lieu, changé de date ou de nom. Les prochaines rencontres vous attendent dans l’agenda."
    links={[
      { href: "/agenda", label: "Voir l’agenda" },
      { href: "/contact", label: "Me contacter" },
    ]}
  />
);

export default EventNotFound;
