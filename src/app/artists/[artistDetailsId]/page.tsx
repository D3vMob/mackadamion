import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import ArtistDetail from "~/app/_components/artistDetail";
import BackButton from "~/components/backButton";
import { HydrateClient } from "~/trpc/server";

export default async function ArtistDetailsPage(props: {
  params: Promise<{ artistDetailsId: string }>;
}) {
  const { artistDetailsId } = await props.params;
  return (
    <HydrateClient>
      <div className="pt-16">
        <BackButton />
        <ArtistDetail artistId={parseInt(artistDetailsId)} />
      </div>
    </HydrateClient>
  );
}
