"use client";

import InputField from "./InputField";
import { FaBarsStaggered } from "react-icons/fa6";
import { BiCategoryAlt, BiLoaderCircle } from "react-icons/bi";
import { IoIosLink } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startupSchema } from "@/libs/validators";
import { z } from "zod";

const StartupForm = () => {
  const [pitch, setPitch] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof startupSchema>>({
    resolver: zodResolver(startupSchema),
  });

  // const dataTitle = register("title");
  // const dataCategory = register("category");
  // const dataImage = register("image");

  const handlePitchChange = (pitch?: string) => {
    setValue("pitch", pitch ?? ""); // Fallback to empty string if pitch is undefined
    setPitch(pitch ?? "");
  };

  const handleSubmitStartup: SubmitHandler<z.infer<typeof startupSchema>> = async (data) => {
    console.log(data, "<----dihandleSubmitStartup");
  };

  console.log(pitch, "<----dipitch");

  return (
    <form onSubmit={handleSubmit(handleSubmitStartup)} className="bg-emerald-500 grid grid-cols-2 gap-10">
      <div className="relative">
        <InputField type="text" name="title" placeholder="Startup Title" icon={<FaBarsStaggered />} propData={{ ...register("title") }} />

        {errors.title && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.title.message as string}</p>}
      </div>

      <div className="relative">
        <InputField type="text" name="category" placeholder="Choose a category (e.g., Tech, Ecommerce, Studio, Education, etc.)" icon={<BiCategoryAlt size={22} />} propData={{ ...register("category") }} />

        {errors.category && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.category.message as string}</p>}
      </div>

      <div className="relative">
        <textarea
          id="description"
          rows={1}
          cols={30}
          placeholder="Short description of your startup idea"
          className="w-full pl-4 py-3 rounded-lg bg-gray-800 outline-none border border-violet-500 focus:border-primary text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300"
          {...register("description")}
        />

        {errors.description && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.description.message as string}</p>}
      </div>

      <div className="relative">
        <InputField type="text" name="image" placeholder="Image Url" icon={<IoIosLink size={22} />} propData={{ ...register("image") }} />

        {errors.image && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.image.message as string}</p>}
      </div>

      <div className="relative col-span-2">
        <MDEditor
          value={pitch}
          onChange={handlePitchChange}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, borderColor: "rgb(139 92 246/1)", overflow: "hidden", background: "rgb(31 41 55/1)" }}
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && <p className="absolute -bottom-7 text-red-500 text-sm">Pitch is {errors.pitch.message as string}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="col-span-2 py-3 px-4 bg-gradient-to-r from-primary to-violet-500 text-white font-bold rounded-lg shadow-lg hover:from-primary-600 hover:to-violet-700 transition-all duration-300 flex items-center justify-center gap-3"
      >
        {isSubmitting ? (
          <BiLoaderCircle size={22} className="animate-spin mx-auto" />
        ) : (
          <>
            <span>Submit Your Pitch</span>
            <BsSend size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default StartupForm;
