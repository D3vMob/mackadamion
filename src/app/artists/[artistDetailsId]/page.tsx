import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import ArtistDetail from "~/app/_components/artistDetail";
import { HydrateClient } from "~/trpc/server";

export default async function ArtistDetailsPage(props: {
  params: Promise<{ artistDetailsId: string }>;
}) {
  const { artistDetailsId } = await props.params;
  return (
    <HydrateClient>
      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <div>Back</div>
      </Link>
      <ArtistDetail artistId={parseInt(artistDetailsId)} />
    </HydrateClient>
  );
}
