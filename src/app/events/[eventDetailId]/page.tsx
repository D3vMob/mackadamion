import BackButton from "~/components/backButton";
import EventDetail from "../../_components/eventDetail";
import { HydrateClient } from "~/trpc/server";

export default async function EventsPage(props: {
  params: Promise<{ eventDetailId: string }>;
}) {
  const { eventDetailId } = await props.params;
  return (
    <HydrateClient>
      <div className="pt-16">
        <BackButton />
        <EventDetail eventId={parseInt(eventDetailId)} />
      </div>
    </HydrateClient>
  );
}
