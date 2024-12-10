"use client";

import { api } from "~/trpc/react";
import { Card, CardHeader, CardContent } from "~/components/ui/card";
import Image from "next/image";

export default function EventDetail({eventId}: {eventId: number}) {
  const [event] = api.event.getEventById.useSuspenseQuery({ id: eventId });
  if (!event) return null;
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row gap-6 items-start">
        <div className="relative h-32 w-32 rounded-full overflow-hidden">
          <Image
            src={event.imageUrl ?? "/default-artist.jpg"}
            alt={event.title ?? ""}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          
        </div>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none">
        {event.description && (
          <div 
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        )}
      </CardContent>
    </Card>
  );;
}

