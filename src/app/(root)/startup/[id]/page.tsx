import HeroSection from "@/components/HeroSection";
import { formatDate } from "@/libs/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import View from "@/components/View";
import { RiLoader2Line } from "react-icons/ri";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

export const experimental_ppr = true;

const md = markdownit();

const DetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // data fetching with pattern parallel data fetching
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, {
      id: id,
    }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "marvel-universe",
    }),
  ]);

  const datePost = formatDate(post._createdAt);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  console.log({ post, editorPosts }, "<---dideatilpage");

  return (
    <>
      <HeroSection tag={datePost} title={post.title} desc={post.description} />
      <section className="b-rose-600 w-full max-w-6xl mx-auto mt-10 space-y-10">
        {/* Image section */}
        <div className="b-violet-500 relative w-full h-[30rem]">
          <Image src={post.image} alt={post.title} fill className="object-cover rounded-lg" />
        </div>
        {/* Information */}
        <div className="b-amber-500 w-full max-w-4xl mx-auto space-y-7">
          {/* User and category information */}
          <div className="b-sky-500 flex items-center justify-between">
            {/* User */}
            <div className="flex items-center gap-3">
              <Link href={`/user/${post.author?._id}`}>
                <Image src={post.author?.image} alt={post.author?.name} width={50} height={50} className="object-cover rounded-full drop-shadow-lg" />
              </Link>

              <div className="flex flex-col text-primary">
                <span className="font-bold text-[20px]">
                  {post.author?.name} - {post.title}
                </span>
                <span className="font-medium text-[16px] text-gray-400">{post.author?.email}</span>
              </div>
            </div>

            {/* Category */}
            <div className="bg-gradient-to-r from-primary to-violet-500 w-[10rem] h-[3rem] flex items-center justify-center rounded-full">
              <div className="bg-tertiary w-[97%] h-[90%] flex items-center justify-center rounded-full">
                <p className="text-sm font-bold bg-gradient-to-r from-primary to-violet-500 text-transparent bg-clip-text">{post.category}</p>
              </div>
            </div>
          </div>

          {/* Post information */}
          <div className="b-green-600 space-y-7 pb-7 border-b border-gray-400">
            <div className="bg-gradient-to-r from-primary to-violet-500 px-5 py-3 rounded-lg max-w-fit">
              <h3 className="uppercase text-gray-300 font-bold">Pitch Details</h3>
            </div>

            {parsedContent ? (
              <article dangerouslySetInnerHTML={{ __html: parsedContent }} className="prose max-w-4xl font-work-sans break-all text-gray-200" />
            ) : (
              <p className="text-gray-400 text-sm text-pretty bg-violet-500">No detail provided!</p>
            )}
          </div>

          {/* Editor */}
          <div className="b-violet-500 w-full max-w-4xl mx-auto space-y-7 pb-10">
            {editorPosts?.length > 0 && (
              <>
                <div className="bg-gradient-to-r from-primary to-violet-500 px-5 py-3 rounded-lg max-w-fit">
                  <h3 className="uppercase text-gray-300 font-bold">Editor Picks</h3>
                </div>

                <ul className="grid sm:grid-cols-2 gap-y-20">
                  {editorPosts.map((post: StartupTypeCard, i: number) => (
                    <StartupCard key={i} post={post} />
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* Views */}
        {/* in PPR page if you want to get dynamic data then use Suspense */}
        <Suspense fallback={<RiLoader2Line className="animate-spin bg-emerald-800" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default DetailPage;
