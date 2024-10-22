"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Send } from "lucide-react";

const newsLetterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function NewsLetter() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof newsLetterSchema>>({
    values: {
      email: "",
    },
    resolver: zodResolver(newsLetterSchema),
  });

  const onSubmit = async (values: z.infer<typeof newsLetterSchema>) => {
    setIsSubmitting(true);
    // Here you would typically handle the newsletter subscription
    console.log("Subscribing email:", values.email);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // form.reset();
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage className="absolute mt-1 text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : <Send />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
