import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  btn: boolean;
  title: string;
  icon: IconType;
  url?: string;
}

const Button: FC<ButtonProps> = ({ btn, title, icon: Icon, url }) => {
  return btn ? (
    <button
      className={`group flex items-center justify-start w-9 h-9 border border-primary rounded-full cursor-pointer relative overflow-hidden transition-all duration-150 shadow-lg md:hover:w-24 hover:rounded-lg ${
        title === "Logout" ? "hover:border-rose-600" : ""
      } md:active:translate-x-1 md:active:translate-y-1`}
    >
      <div className="b-rose-500 flex items-center justify-center w-full transition-all duration-300 md:group-hover:justify-start md:group-hover:px-3">
        <Icon size={20} className={`text-primary ${title === "Logout" ? "group-hover:text-rose-600" : ""} transition-all duration-300`} />
      </div>
      <span
        className={`b-amber-500 absolute right-2 md:transform md:translate-x-full opacity-0 text-primary text-sm font-semibold md:group-hover:translate-x-0 md:group-hover:opacity-100 ${
          title === "Logout" ? "group-hover:text-rose-600" : ""
        } transition-all duration-300`}
      >
        {title}
      </span>
    </button>
  ) : (
    <Link
      href={url || "#"}
      passHref
      className="group flex items-center justify-start w-9 h-9 border border-primary rounded-full cursor-pointer relative overflow-hidden transition-all duration-150 shadow-lg md:hover:w-24 hover:rounded-lg md:active:translate-x-1 md:active:translate-y-1"
    >
      <div className="b-rose-500 flex items-center justify-center w-full transition-all duration-300 md:group-hover:justify-start md:group-hover:px-3">
        <Icon size={20} className="text-primary" />
      </div>
      <div className="b-amber-500 absolute right-2 md:transform md:translate-x-full opacity-0 text-primary text-sm font-semibold md:group-hover:translate-x-0 md:group-hover:opacity-100">{title}</div>
    </Link>
  );
};

export default Button;
