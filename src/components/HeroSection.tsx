import Search from "@/components/Search";

type HeroProps = {
  tag?: string;
  title: string;
  desc?: string;
  field?: boolean;
  query?: string;
};

const HeroSection = ({ tag, title, desc, field, query }: HeroProps) => {
  return (
    <section className="relative min-h-96 w-full max-w-[85rem] mx-auto mt-10 overflow-hidden border border-primary border-opacity-60 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-primary opacity-5 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <div className="b-amber-500 relative z-20 flex flex-col items-center gap-6">
        {tag && (
          <div className="bg-gradient-to-r from-primary to-violet-500 px-5 py-3 rounded-md">
            <span className="uppercase text-gray-300 font-bold">{tag}</span>
          </div>
        )}

        <div className="b-amber-500 w-full max-w-[48.5rem]">
          <h1 className="text-5xl uppercase font-bold text-center bg-gradient-to-r from-primary to-violet-500 text-transparent bg-clip-text">{title}</h1>
        </div>

        {desc && <p className="w-full max-w-xl text-center text-gray-300 line-clamp-2 b-amber-500">{desc}</p>}

        {field && <Search query={query} />}
      </div>

      {/* <Boxes /> */}
    </section>
  );
};

export default HeroSection;
