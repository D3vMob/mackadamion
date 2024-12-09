import { SignedIn, SignedOut } from "@clerk/nextjs";
import ArtistForm from "~/app/_components/artistForm";
import { HydrateClient } from "~/trpc/server";

export default function ArtistPage() {
  return (
    <HydrateClient>
      <SignedIn>
        <ArtistForm />
      </SignedIn>
      <SignedOut>
        <div>You must be signed in to edit this artist</div>
      </SignedOut>
    </HydrateClient>
  );
}
