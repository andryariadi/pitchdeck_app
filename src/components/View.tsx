import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { VscEye } from "react-icons/vsc";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });

  after(async () => {
    await writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit();
  });

  console.log({ totalViews }, "<----views");
  return (
    <div className="bg-rose-600 fixed bottom-3 left-3 flex items-center justify-end">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <div className="text-gray-300 font-medium text-[16px] bg-gradient-to-r from-primary to-violet-500 px-4 py-2 rounded-lg capitalize">
        <div className="flex items-center gap-2">
          <VscEye size={22} />
          <span>{totalViews}</span>
        </div>
      </div>
    </div>
  );
};

export default View;
