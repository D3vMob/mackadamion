
import EventForm from "~/app/_components/eventForm";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import { HydrateClient } from "~/trpc/server";

export default function EventPage() {
  return (
    <div>
      <HydrateClient>
        <SignedIn>
          <EventForm />
      </SignedIn>
      <SignedOut>
          <div>You must be signed in to edit this artist</div>
        </SignedOut>
      </HydrateClient>
    </div>
  );
}

