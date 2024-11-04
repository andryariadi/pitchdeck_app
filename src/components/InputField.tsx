type InputFieldProps = {
  isSearch?: boolean;
  icon: React.ReactNode;
  passIcon?: React.ReactNode;
  openPass?: boolean;
  setOpenPass?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  propData?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({ isSearch, icon, passIcon, openPass, setOpenPass, type, propData, ...props }: InputFieldProps) => {
  return (
    <div className={`group relative ${isSearch ? "max-w-2xl w-full" : ""}`}>
      {/* Left icon */}
      <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none text-violet-500 group-hover:scale-110 group-hover:text-primary transition-all duration-300">{icon}</div>

      {/* Password visibility toggle (for password fields only) */}
      {type === "password" || type === "text" ? (
        <div className="absolute inset-y-0 right-0 px-3 flex items-center text-primary cursor-pointer" onClick={() => setOpenPass && setOpenPass(!openPass)}>
          {passIcon}
        </div>
      ) : null}

      {/* Input field */}
      <input
        {...propData}
        {...props}
        type={type}
        className={`w-full py-3 pl-11 pr-11 bg-gray-800 ${
          isSearch ? "rounded-full" : "rounded-lg"
        } outline-none border border-violet-500 focus:border-primary text-white placeholder:text-sm placeholder-gray-400 placeholder-opacity-50 transition-all duration-300`}
      />
    </div>
  );
};

export default InputField;
