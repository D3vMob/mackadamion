import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ArtistList from "~/app/_components/artistList";
import { HydrateClient } from "~/trpc/server";

export default function ArtistsPage() {
  return (
    <HydrateClient>
      <SignedIn>
        <Link
          href="/cms"
          className="absolute left-4 top-4 text-sm font-medium text-primary hover:text-primary/80"
        >
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            <div>DASHBOARD</div>
          </div>
        </Link>
        <ArtistList />
        <Link
          href="/cms/artists/artist"
          className="fixed bottom-4 right-4 rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground hover:shadow-md"
        >
          <PlusIcon className="h-4 w-4" />
        </Link>
      </SignedIn>
      <SignedOut>
        <div>You must be signed in to edit this artist</div>
      </SignedOut>
    </HydrateClient>
  );
}
