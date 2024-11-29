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
import { LoaderCircle, Send } from "lucide-react";
import { addMailjetContact } from "~/lib/newsLetter";
import { toast } from "sonner";
import { motion } from "motion/react";

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
    try {
      const result = await addMailjetContact(values);
      if (result.success) {
        toast.success(result.data.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  };

  return (
    <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    transition={{
      delay: 1.5,
      duration: 0.6,
      ease: "linear",
      repeat: 0,
    }}
    className="mx-auto w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <Input
                    placeholder="Newsletter (enter your email)"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute mt-1 text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Send />
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
