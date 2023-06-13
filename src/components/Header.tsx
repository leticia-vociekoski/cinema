import React from "react";
import Image from "next/image";
import { User } from "phosphor-react";
import Link from "next/link";
export function Header() {
  return (
    <header className="flex w-full py-4 justify-between px-10 items-center bg-blue-50 ">
      <Link href={"/"}>
        <Image width={125} height={125} src={"/icons/Logo.svg"} alt="Logo" />
      </Link>
      <Link className="flex justify-center items-center" href={"/auth/login"}>
        <User size={30} />
      </Link>
    </header>
  );
}
