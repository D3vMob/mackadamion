"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";
import { Button } from "~/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

export default function ArtistList() {
  const utils = api.useContext();
  const [artists] = api.artist.getAllArtists.useSuspenseQuery();
  

  const deleteArtist = api.artist.deleteArtist.useMutation({
    onSuccess: () => {
      toast.success("Artist deleted successfully");
      // Invalidate and refetch the artists query
      void utils.artist.getAllArtists.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete artist");
    },
  });

  const handleDelete = (artistId: number) => {
    deleteArtist.mutate({ id: artistId });
  };

  return (
    <div className="mx-auto flex max-w-screen-md flex-col gap-4">
      <div className="text-2xl font-bold text-center pt-4">ROASTER</div>
      {artists.map((artist) => (
        <Card key={artist.id} className="flex flex-row overflow-hidden">
          {artist.imageUrl && (
            <div className="h-60 w-60 flex-shrink-0">
              <Image
                src={artist.imageUrl}
                alt={artist.name ?? ""}
                width={192}
                height={192}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-1 flex-col">
            <CardHeader>
              <CardTitle>{artist.name}</CardTitle>
              {artist.description && (
                <CardDescription className="line-clamp-3">
                  <div
                    dangerouslySetInnerHTML={{ __html: artist.description }}
                  />
                </CardDescription>
              )}
            </CardHeader>

            {artist.socialLinks && artist.socialLinks.length > 0 && (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {artist.socialLinks.map((link, index) => (
                    <SocialIcon
                      url={link}
                      key={index}
                      style={{ height: 25, width: 25 }}
                      target="_blank"
                    />
                  ))}
                </div>
              </CardContent>
            )}

            <CardFooter className="flex justify-end gap-2">
              <Link
                href={`/cms/artists/artist/${artist.id}`}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Edit Artist
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    This action cannot be undone and will delete the artist from
                    the database.
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(artist.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}
