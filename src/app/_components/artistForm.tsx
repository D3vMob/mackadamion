"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ArtistInput } from "~/server/db/schema";
import { toast } from "sonner";
import { generateUUID, uploadS3 } from "~/lib/uploadS3";
import { artistSchema } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { z } from "zod";
import { env } from "~/env";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import Tiptap from "~/components/editor/Tiptap";
import { Button } from "~/components/ui/button";
import { CameraIcon, Loader2, X, PlusCircle, Trash2 } from "lucide-react";

export default function ArtistForm({ artistId }: { artistId?: number }) {
  const [artist] = artistId
    ? api.artist.getArtist.useSuspenseQuery({ id: artistId })
    : [];
  const router = useRouter();
  const utils = api.useUtils();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata.role === "admin";

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const imageBaseUrl = env.NEXT_PUBLIC_AWS_BUCKET;

  const [imageUrl, setImageUrl] = useState<string>(artist?.imageUrl ?? "");

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
      const uuid = await generateUUID(form.getValues("name") ?? file.name);
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

  const form = useForm<ArtistInput>({
    resolver: zodResolver(artistSchema),
    values: {
      name: artist?.name ?? "",
      imageUrl: artist?.imageUrl ?? "",
      description: artist?.description ?? "",
      socialLinks: artist?.socialLinks ?? [],
    },
  });

  const createArtist = api.artist.createArtist.useMutation({
    onSuccess: async () => {
      setIsSubmitLoading(false);
      toast.success("Artist created successfully");
      form.reset();
      await utils.artist.getArtist.invalidate();
      router.push("/cms/artists");
    },
    onError: () => {
      setIsSubmitLoading(false);
      toast.error("Failed to create artist");
    },
  });
  const updateArtist = api.artist.updateArtist.useMutation({
    onSuccess: async () => {
      setIsSubmitLoading(false);
      toast.success("Artist updated successfully");
      await utils.artist.getArtist.invalidate();
      router.push("/cms/artists");
    },
    onError: () => {
      setIsSubmitLoading(false);
      toast.error("Failed to update artist");
    },
  });

  function onSubmit(values: z.infer<typeof artistSchema>) {
    setIsSubmitLoading(true);
    if (imageUrl) {
      values.imageUrl = imageUrl;
    }
    if (artistId) {
      updateArtist.mutate({
        id: artistId,
        ...values,
      });
    } else {
      createArtist.mutate(values);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
          name="socialLinks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Links</FormLabel>
              <div className="space-y-2">
                {field.value.map((link: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <FormControl>
                      <Input
                        value={link}
                        onChange={(e) => {
                          const newLinks = [...field.value];
                          newLinks[index] = e.target.value;
                          field.onChange(newLinks);
                        }}
                        placeholder="https://"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newLinks = field.value.filter((_, i) => i !== index);
                        field.onChange(newLinks);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => field.onChange([...field.value, ""])}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Social Link
                </Button>
              </div>
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
          <Button type="submit" disabled={isSubmitLoading}>
            {isSubmitLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : artistId ? (
              "Save"
            ) : (
              "Create"
            )}
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
