import { z } from "zod";

export const startupSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(32, { message: "Name must be at most 32 characters long" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long" }),
  category: z.string().min(1, { message: "Category is required" }).max(32, { message: "Category must be at most 32 characters long" }),
  image: z.string().min(1, { message: "Image url is required" }).url({ message: "Image link must be a valid URL" }),
  pitch: z.string().min(5, { message: "Pitch must be at least 5 characters long" }),
});
