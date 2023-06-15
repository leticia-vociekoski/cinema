import { Eye, EyeSlash } from "phosphor-react";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName?: string;
}

export function Input({
  className,
  type,
  placeholder,
  id,
  labelName,
  ...props
}: InputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full ">
      {labelName && (
        <label className="text-sm font-medium text-slate-600" htmlFor={id}>
          {labelName}
        </label>
      )}

      {type === "password" ? (
        <div className="w-full relative ">
          <input
            {...props}
            id={id}
            className={`w-full py-2 px-4 border border-l-8 border-gray-300 rounded-l-none rounded-md ${className} focus:border-sky-400 invalid:border-red-400 `}
            type={isShowPassword ? "text" : "password"}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => {
              setIsShowPassword((state) => !state);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {isShowPassword ? <EyeSlash size={24} /> : <Eye size={24} />}
          </button>
        </div>
      ) : (
        <input
          {...props}
          id={id}
          className={`w-full py-2 px-4 border border-l-8 border-gray-300 rounded-l-none rounded-md ${className} focus:border-sky-400 invalid:border-red-400 `}
          type={type}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
