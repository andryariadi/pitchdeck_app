import { handleGithubLogin, handleLogout } from "@/libs/actions";
import { auth } from "@/libs/auth";
import Image from "next/image";
import Link from "next/link";
import { ImGithub } from "react-icons/im";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from "./Button";

const Navbar = async () => {
  const session = await auth();

  console.log(session, "<---dinavbar");

  return (
    <header className="p-5 bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg border-b border-primary border-opacity-60">
      <nav className="b-rose-600 px-10 flex items-center justify-between">
        <Link href="/" className="b-green-700 hover:scale-105 transition-all duration-300">
          <Image src="/logo.svg" width={200} height={200} alt="Pitchdeck" />
        </Link>
        <div className="b-sky-600 flex items-center gap-5">
          {session && session.user ? (
            <>
              <Button btn={false} url="/startup/create" title="Create" icon={IoIosAddCircleOutline} />

              <form action={handleLogout} className="b-green-500">
                <Button btn title="Logout" icon={AiOutlineLogout} />
              </form>

              <Link href={`/user/${session.user.id}`}>{session.user.image && <Image src={session.user.image} width={35} height={35} alt="Avatar" className="rounded-full" />}</Link>
            </>
          ) : (
            <form action={handleGithubLogin} className="b-green-500">
              <Button btn title="Login" icon={ImGithub} />
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
