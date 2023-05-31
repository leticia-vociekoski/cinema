import React from "react"
import Image from "next/image"
import {  User } from "phosphor-react"
export function Header() {
    return <header className="flex w-full py-4 justify-between px-10 items-center bg-blue-50 " >
        <Image width={125} height={125}  src={"/icons/Logo.svg"} alt="Logo" />
        <User size={30} />
    </header>
}