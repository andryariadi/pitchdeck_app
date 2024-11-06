"use client";

import InputField from "./InputField";
import { FaBarsStaggered } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosLink } from "react-icons/io";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const StartupForm = () => {
  const [pitch, setPitch] = useState("Yoo bree");

  return (
    <form className="bg-rose-500 grid grid-cols-2 gap-7">
      <div>
        <InputField type="text" name="title" placeholder="Startup Title" icon={<FaBarsStaggered />} />
      </div>

      <div>
        <InputField type="text" name="category" placeholder="Choose a category (e.g., Tech, Ecommerce, Studio, Education, etc.)" icon={<BiCategoryAlt size={22} />} />
      </div>

      <div className="">
        <textarea
          name="description"
          id="description"
          rows={1}
          cols={30}
          placeholder="Short description of your startup idea"
          className="w-full pl-4 py-3 rounded-lg bg-gray-800 outline-none border border-violet-500 focus:border-primary text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300"
        />
      </div>

      <div>
        <InputField type="text" name="link" placeholder="Image Url" icon={<IoIosLink size={22} />} />
      </div>

      <div className="col-span-2">
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
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
      </div>

      <button className="col-span-2 py-3 px-4 bg-gradient-to-r from-primary to-violet-500 text-white font-bold rounded-lg shadow-lg hover:from-primary-600 hover:to-violet-700 transition-all duration-300">Submit</button>
    </form>
  );
};

export default StartupForm;
