import { formatDate } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { TbInfoCircle } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa6";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  return (
    <article className="card bg-amber-500 relative text-[#eee] w-[350px] flex-shrink-0" data-view={post.views}>
      <FaRegEye size={20} className="text-violet-500 absolute z-20 top-5 right-6" />

      <div className="author bg-secondary w-[71%] h-[5rem] flex justify-center items-center gap-[20px] p-[10px] rounded-t-[35px]">
        <div className="bg-gradient-to-r from-primary to-violet-500 w-[10rem] h-[3rem] flex items-center justify-center rounded-full">
          <div className="bg-secondary w-[97%] h-[90%] flex items-center justify-center rounded-full">
            <p className="text-sm bg-gradient-to-r from-primary to-violet-500 text-transparent bg-clip-text">{formatDate(post._createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="relative z-20 bg-secondary px-5 flex items-center justify-between">
        <div className="b-rose-500">
          <Link href={`/user/${post.author?._id}`}>
            <span className="text-sm">{post.author?.name}</span>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className="text-2xl font-bold">{post.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.author?._id}`}>{post.author?.image && <Image src={post.author.image} alt="Avatar" width={50} height={50} className="rounded-full object-cover" />}</Link>
      </div>

      <div className="bg-secondary px-5 py-3 max-h-[5rem]">
        <Link href={`/startup/${post._id}`}>
          <p className="line-clamp-2 text-sm text-gray-400">{post.description}</p>
        </Link>
      </div>

      <div className="bg-secondary px-5 py-3 max-h-[15rem]">
        <div className=" relative w-full h-[10rem]">{post.image && <Image src={post.image} alt="Image" fill className="object-cover rounded-md" />}</div>
      </div>

      <div className="shadow bg-secondary px-5 flex items-center justify-between h-[5rem] rounded-b-[35px]">
        <Link href={`/?query=${post.category ? post.category.toLowerCase() : ""}`}>
          <span className="text-sm text-violet-500 font-semibold border border-violet-500 p-2 rounded-full">{post.category}</span>
        </Link>
        <Link href={`/startup/${post._id}`}>
          <TbInfoCircle size={26} className="text-violet-500" />
        </Link>
      </div>
    </article>
  );
};

export default StartupCard;
