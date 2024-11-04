import HeroSection from "@/components/HeroSection";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { auth } from "@/libs/auth";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
// import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  // if in file client.ts useCdn is false its mean data will not cached and will fetch from server and used sanityFetch to get data realtime
  const { data: posts } = await sanityFetch({
    query: STARTUP_QUERY,
    params: { search: query || null },
  });

  // if in file client.ts useCdn is true its mean data will cached in CDN so used client.fetch
  // const posts = await client.fetch(STARTUP_QUERY, {
  //   params: { search: query || null },
  // });

  const session = await auth();

  console.log({ session, sessionId: session?.user?.id, posts }, "<---dihomepage");

  return (
    <>
      <HeroSection tag="Pitch, Vote and Grow" title="Pitch Your Startup, Connect With Entepreneurs" desc="Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions" field query={query} />

      <section className="b-rose-600 w-full max-w-6xl mx-auto mt-10 space-y-5">
        {/* Title */}
        <div className="bg-gradient-to-r from-primary to-violet-500 px-5 py-3 rounded-lg max-w-fit">
          <span className="uppercase text-gray-300 font-bold">{query ? `Search results for "${query}"` : "All Startups"}</span>
        </div>

        {/* Card */}
        <div className="b-amber-500 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-14">{posts?.length > 0 ? posts.map((post: StartupTypeCard) => <StartupCard post={post} key={post._id} />) : <p>No startups found</p>}</div>
      </section>

      {/* if in file client.ts useCdn is true its mean data will cached in CDN */}
      <SanityLive />
    </>
  );
}
