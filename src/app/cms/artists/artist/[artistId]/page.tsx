import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import ArtistForm from "~/app/_components/artistForm";
import { HydrateClient } from "~/trpc/server";

export default async function ArtistPage(props: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await props.params;
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
        <ArtistForm artistId={parseInt(artistId)} />
      </SignedIn>
      <SignedOut>
        <div>You must be signed in to edit this artist</div>
      </SignedOut>
    </HydrateClient>
  );
}
