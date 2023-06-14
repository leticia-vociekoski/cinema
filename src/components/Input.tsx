import { Eye, EyeSlash } from "phosphor-react";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, type, placeholder, ...props }: InputProps) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      {type === "password" ? (
        <div className="w-full relative">
          <input
            {...props}
            className={`w-full py-2 px-4 border border-l-8 border-gray-300 rounded-l-none rounded-md ${className}`}
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
          className={`w-full py-2 px-4 border border-l-8 border-gray-300 rounded-l-none rounded-md ${className}`}
          type={type}
          placeholder={placeholder}
        />
      )}
    </>
  );
}
