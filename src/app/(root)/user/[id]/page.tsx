import UserStartups from "@/components/UserStartups";
import { auth } from "@/libs/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RiLoader2Line } from "react-icons/ri";

const UserProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, {
    id: id,
  });

  if (!user) return notFound();

  console.log({ id, session, user }, "<----userProfilePage");

  return (
    <>
      <section className="b-rose-500 w-full max-w-7xl mx-auto mt-20 flex gap-20 pb-10">
        {/* User Card */}
        <div className="profile_card !bg-gradient-to-tl from-violet-500 to-primary">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">{user.name}</h3>
          </div>

          <Image src={user.image} alt={user.name} width={220} height={220} className="profile_image" />

          <p className="text-30-extrabold mt-7 text-center">@{user?.username}</p>
          <p className="mt-2 text-center text-14-normal">{user?.bio}</p>
        </div>

        {/* User Posts */}
        <div className="b-emerald-500 max-w-4xl flex-1 flex flex-col gap-5 lg:-mt-5">
          <div className="bg-gradient-to-r from-primary to-violet-500 px-5 py-3 rounded-lg max-w-fit">
            <span className="uppercase text-gray-300 font-bold">{session?.id === id ? "Your" : "All"} Startups</span>
          </div>

          <ul className="grid sm:grid-cols-2 gap-y-16">
            <Suspense fallback={<RiLoader2Line className="animate-spin bg-emerald-800" />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserProfilePage;
