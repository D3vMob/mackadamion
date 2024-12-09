import EventForm from "~/app/_components/eventForm";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { HydrateClient } from "~/trpc/server";

export default async function EventPage(props: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await props.params;
  return (
    <div>
      <HydrateClient>
        <SignedIn>
          <EventForm eventId={parseInt(eventId)} />
        </SignedIn>
        <SignedOut>
          <div>You must be signed in to edit this artist</div>
        </SignedOut>
      </HydrateClient>
    </div>
  );
}
