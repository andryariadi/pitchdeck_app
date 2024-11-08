import HeroSection from "@/components/HeroSection";
import { formatDate } from "@/libs/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import View from "@/components/View";
import { RiLoader2Line } from "react-icons/ri";

export const experimental_ppr = true;

const md = markdownit();

const DetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, {
    id: id,
  });

  const datePost = formatDate(post._createdAt);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  console.log(post, "<---dideatilpage");

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
          <div className="b-green-600 space-y-3 pb-7 border-b border-gray-400">
            <h3 className="text-[30px] font-bold bg-gradient-to-r from-primary to-violet-500 text-transparent bg-clip-text w-max">Pitch Details</h3>

            {parsedContent ? (
              <article dangerouslySetInnerHTML={{ __html: parsedContent }} className="prose max-w-4xl font-work-sans break-all text-gray-200" />
            ) : (
              <p className="text-gray-400 text-sm text-pretty bg-violet-500">No detail provided!</p>
            )}
          </div>

          {/* Editor */}
          <div className="bg-violet-500 w-full max-w-4xl mx-auto">Editor</div>
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
