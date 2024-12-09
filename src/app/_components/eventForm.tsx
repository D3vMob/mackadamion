"use client";

import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { eventSchema } from "~/server/db/schema";
import { EventSchema } from "~/server/db/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { COUNTRIES } from "~/lib/countries";
import { MultiSelect } from "~/components/multi-select";

export default function EventForm({ eventId }: { eventId?: number }) {
  const [event] = eventId
    ? api.event.getEventById.useSuspenseQuery({ id: eventId })
    : [];
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title ?? "",
      description: event?.description ?? "",
      date: event?.date ?? new Date(),
      venue: event?.venue ?? "",
      city: event?.city ?? "",
      countryCode: event?.countryCode ?? "CA",
      tags: event?.tags ?? [],
    },
  });

  const createEvent = api.event.createEvent.useMutation({
    onSuccess: () => {
      toast.success("Event created successfully");
      router.push("/cms/eventsPlan");
      form.reset();
      utils.event.getAllEvents.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateEvent = api.event.updateEvent.useMutation({
    onSuccess: () => {
      toast.success("Event updated successfully");
      router.push("/cms/eventsPlan");
      form.reset();
      utils.event.getAllEvents.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: artists } = api.artist.getAllArtists.useQuery();
  console.log("Component artistNames:", artists);

  function onSubmit(data: EventSchema) {
    if (eventId) {
      updateEvent.mutate({ id: eventId, ...data });
    } else {
      createEvent.mutate(data);
    }
  }

  console.log("Form data:", form.getValues());



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[90%] space-y-4 sm:max-w-md"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  value={format(field.value, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    field.onChange(date);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artists</FormLabel>
              <MultiSelect
                options={(artists ?? []).map((artist) => ({
                  label: artist.name ?? "",
                  value: artist.id.toString(),
                }))}
                value={field.value}
                onValueChange={field.onChange}
              />
              <FormDescription>
                Select one or more artists for this event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={createEvent.isPending || updateEvent.isPending}
        >
          {eventId ? "Update" : "Create"} Event
        </Button>
      </form>
    </Form>
  );
}
