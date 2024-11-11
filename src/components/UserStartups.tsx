import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return <>{startups.length > 0 ? startups.map((startup: StartupTypeCard) => <StartupCard post={startup} key={startup._id} />) : <p className="text-black-100 text-sm font-normal">No startups yet!</p>}</>;
};

export default UserStartups;
