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

  return (
    <header className="px-3 py-5 md:p-5 bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg border-b border-primary border-opacity-60">
      <nav className="b-rose-600 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="b-green-700 hover:scale-105 transition-all duration-300">
          <Image src="/logo.svg" width={200} height={200} alt="Pitchdeck" />
        </Link>

        {/* Navlink */}
        <div className="b-sky-600 flex items-center gap-5">
          {session && session.user ? (
            <>
              <Button btn={false} url="/startup/create" title="Create" icon={IoIosAddCircleOutline} />

              <form action={handleLogout} className="b-green-500">
                <Button btn title="Logout" icon={AiOutlineLogout} />
              </form>

              <div className="flex items-center gap-3">
                <span className="hidden md:block text-sm font-semibold bg-gradient-to-r from-primary to-violet-500 text-transparent bg-clip-text">{session.user.name}</span>

                <Link href={`/user/${session.id}`}>{session.user.image && <Image src={session.user.image} width={35} height={35} alt="Avatar" className="rounded-full" />}</Link>
              </div>
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
