"use client";

import { api } from "~/trpc/react";

export default function EventList() {
  const [events] = api.event.getAllEvents.useSuspenseQuery();
  console.log("EventList events:", events); 
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {events.map((event) => (
        <div key={event.id}>
          <div> {event.title}</div>
          <div>{event.date?.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
