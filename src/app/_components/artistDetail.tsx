"use client";

import { api } from "~/trpc/react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { SocialIcon } from "react-social-icons";

export default function ArtistDetail({ artistId }: { artistId: number }) {
  const [artist, events] = api.artist.getArtist.useSuspenseQuery({ id: artistId });
  const socialLinks = artist?.socialLinks ? artist.socialLinks : [];
  if (!artist) return null;
  console.log("ArtistDetail events:", events.data?.events);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row gap-6 items-start">
        <div className="relative h-32 w-32 rounded-full overflow-hidden">
          <Image
            src={artist.imageUrl ?? "/default-artist.jpg"}
            alt={artist.name ?? ""}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{artist.name}</h1>
          <div className="flex gap-2">
            {socialLinks.map((link, index) => (
              <SocialIcon 
                key={index} 
                url={link}
                className="h-8 w-8" // Optional: adjust size if needed
                target="_blank"
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        {artist.description && (
          <div 
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: artist.description }}
          />
        )}
      </CardContent>
    </Card>
  );
}
