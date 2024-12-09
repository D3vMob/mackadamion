"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";

export default function ArtistPublic() {
  const [artists] = api.artist.getAllArtists.useSuspenseQuery();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-72 md:max-w-5xl"
    >
      <CarouselContent>
        {artists.map((artist) => (
          <CarouselItem key={artist.id} className={cn("md:basis-1/3")}>
            <Card>
              {artist.imageUrl && (
                <Link href={`/artists/${artist.id}`}>
                  <div className="h-180 w-180 flex-shrink-0 p-4">
                    <Image
                      src={artist.imageUrl}
                      alt={artist.name ?? ""}
                      width={180}
                      height={180}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              )}

              <CardHeader>
                <CardTitle>{artist.name}</CardTitle>
                {artist.description && (
                  <CardDescription className="line-clamp-6">
                    <div
                      dangerouslySetInnerHTML={{ __html: artist.description }}
                    />
                  </CardDescription>
                )}
              </CardHeader>

              {artist.socialLinks && artist.socialLinks.length > 0 && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {artist.socialLinks && artist.socialLinks.length > 0 && (
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {artist.socialLinks.map((link, index) => (
                            <SocialIcon
                              url={link}
                              key={index}
                              target="_blank"
                            />
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
