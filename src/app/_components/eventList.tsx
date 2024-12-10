"use client";

import { toast } from "sonner";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
} from "~/components/ui/alert-dialog";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { cn } from "~/lib/utils";

export default function EventList({ headTitle }: { headTitle?: boolean }) {
  const utils = api.useUtils();
  const [events] = api.event.getAllEvents.useSuspenseQuery();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata.role === "admin";

  const deleteEvent = api.event.deleteEvent.useMutation({
    onSuccess: () => {
      toast.success("Event deleted successfully");
      void utils.event.getAllEvents.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete event");
    },
  });

  const handleDelete = (eventId: number) => {
    deleteEvent.mutate({ id: eventId });
  };

  return (
    <div className="flex flex-col gap-4 md:mx-auto md:max-w-screen-md">
      {headTitle && (
        <div className="pt-4 text-center text-2xl font-bold">EVENTS</div>
      )}
      {events.map((event) => (
        <Card
          key={event.id}
          className="flex h-full flex-col items-center overflow-hidden pt-8 md:h-60 md:flex-row md:items-start md:pt-0"
        >
          <Link href={`/events/${event.id}`}>
            <div>
              {event.imageUrl && (
                <div className="h-60 w-60 flex-shrink-0">
                  <Image
                    src={event.imageUrl}
                    alt={event.title ?? ""}
                    width={192}
                    height={192}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </Link>
          <div className="flex flex-col justify-between md:flex-1">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                {event.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {event.description && (
                <CardDescription className="text-md line-clamp-3 text-gray-900">
                  <div
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </CardDescription>
              )}
            </CardContent>
            <CardFooter
              className={cn(
                "flex items-center justify-between",
                !headTitle && "justify-center",
              )}
            >
              <div
                className={cn(
                  "text-md flex flex-wrap gap-2 font-bold text-gray-500",
                  !headTitle && "text-center",
                )}
              >
                {event.date ? format(event.date, "PP - HH:mm") : ""}
              </div>
              {isAdmin && (
                <div className="flex gap-2">
                  <Link
                    href={`/cms/eventsPlan/event/${event.id}`}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    Edit Event
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
                        This action cannot be undone and will delete the event
                        from the database.
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}
