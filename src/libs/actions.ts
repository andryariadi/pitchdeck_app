"use server";

import { z } from "zod";
import { auth, signIn, signOut } from "./auth";
import { startupSchema } from "./validators";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut({ redirectTo: "/" });
};

export const createPitch = async (data: z.infer<typeof startupSchema>) => {
  console.log(data, "<----dicreatePitch");

  const session = await auth();
  console.log({ session }, "<----dicreatePitch2");
  try {
    if (!session) return { error: "Not signed in!" };

    const slug = slugify(data.title as string, { lower: true, strict: true });

    const newStartup = {
      title: data.title,
      description: data.description,
      category: data.category,
      image: data.image,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch: data.pitch,
    };

    const newPitch = await writeClient.create({ _type: "startup", ...newStartup });

    console.log({ newPitch }, "<----dicreatePitch3");

    if (newPitch) return { success: true, message: "Your startup pitch has been created successfully!", newPitch };
  } catch (error) {
    console.log(error);
  }
};
