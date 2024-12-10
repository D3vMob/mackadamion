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
import { generateUUID, uploadS3 } from "~/lib/uploadS3";
import { useUser } from "@clerk/nextjs";
import { env } from "~/env";
import { useRef, useState } from "react";
import Link from "next/link";
import { CameraIcon, Loader2 } from "lucide-react";
import { X } from "lucide-react";
import Image from "next/image";
import Tiptap from "~/components/editor/Tiptap";

export default function EventForm({ eventId }: { eventId?: number }) {
  const [event] = eventId
    ? api.event.getEventById.useSuspenseQuery({ id: eventId })
    : [];
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata.role === "admin";
  const utils = api.useUtils();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const imageBaseUrl = env.NEXT_PUBLIC_AWS_BUCKET;

  const [imageUrl, setImageUrl] = useState<string>(event?.imageUrl ?? "");

  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const handleRemoveImage = () => {
    setImageUrl("");
  };
  function handlePickClick() {
    imageInputRef?.current?.click();
  }
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setImageLoading(true);
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      const uuid = await generateUUID(form.getValues("title") ?? file.name);
      if (file && file.size <= MAX_FILE_SIZE) {
        try {
          await uploadS3(base64String, uuid, file.type);
          setImageUrl(`${imageBaseUrl}${uuid}`);
          await user?.reload();
          setImageLoading(false);
        } catch (error) {
          console.error(error);
          toast.error("Failed to upload image");
          setImageLoading(false);
        }
      } else {
        toast.error(
          `File size is too large. Please keep file size under ${MAX_FILE_SIZE / (1024 * 1024)} MB.`,
        );
        setImageLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title ?? "",
      description: event?.description ?? "",
      imageUrl: event?.imageUrl ?? "",
      date: event?.date ?? new Date(),
      venue: event?.venue ?? "",
      city: event?.city ?? "",
      countryCode: event?.countryCode ?? "CA",
      tags: event?.tags ?? [],
    },
  });

  const createEvent = api.event.createEvent.useMutation({
    onSuccess: () => {
      setIsSubmitLoading(false);
      toast.success("Event created successfully");
      router.push("/cms/eventsPlan");
      form.reset();
      utils.event.getAllEvents.invalidate();
    },
    onError: (error) => {
      setIsSubmitLoading(false);
      toast.error(error.message);
    },
  });

  const updateEvent = api.event.updateEvent.useMutation({
    onSuccess: () => {
      setIsSubmitLoading(false);
      toast.success("Event updated successfully");
      router.push("/cms/eventsPlan");
      form.reset();
      utils.event.getAllEvents.invalidate();
    },
    onError: (error) => {
      setIsSubmitLoading(false);
      toast.error(error.message);
    },
  });

  const { data: artists } = api.artist.getAllArtists.useQuery();

  console.log(form.getValues("tags"));

  function onSubmit(data: EventSchema) {
    setIsSubmitLoading(true);
    if (imageUrl) {
      data.imageUrl = imageUrl;
    }
    if (eventId) {
      updateEvent.mutate({ id: eventId, ...data });
    } else {
      createEvent.mutate(data);
    }
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="pb-4 text-center text-red-500">
          You are not authorized to access this page
        </div>
        <Link href="/" className="text-blue-500 underline">
          Go back to home
        </Link>
      </div>
    );
  }

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
                <Tiptap onChange={field.onChange} content={field.value} />
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
                defaultValue={event?.tags ?? []}
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
        <div className="flex justify-end gap-2">
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <Button
            type="button"
            variant="ghost"
            className="cursor-pointer rounded-md border border-gray-300"
            onClick={() => handlePickClick()}
          >
            <CameraIcon className="h-6 w-6" />
          </Button>
          <Button
            type="submit"
            disabled={createEvent.isPending || updateEvent.isPending}
          >
            {eventId ? "Update" : "Create"} Event
          </Button>
        </div>
        {imageUrl && (
          <div className="flex flex-wrap gap-2">
            <div className="relative h-[400px] w-[400px] p-8">
              <X
                className="absolute -right-1 -top-1 z-20 cursor-pointer rounded-full border border-gray-500 bg-white hover:bg-gray-200"
                color="gray"
                size={18}
                onClick={() => handleRemoveImage()}
              />
              <Image
                src={imageUrl}
                alt="uploaded image"
                fill
                className="object-cover"
                sizes="400px"
              />
            </div>
            {imageLoading && (
              <div className="relative flex h-[100px] w-[100px] items-center justify-center rounded border border-gray-300 p-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>
        )}
      </form>
    </Form>
  );
}
