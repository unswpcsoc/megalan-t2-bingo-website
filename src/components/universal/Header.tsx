import { Bars3Icon } from "@heroicons/react/24/solid";
import { type NextComponentType } from "next";
import Image from "next/image";
import Link from "next/link";
import megalan_logo from "public/images/megalan_logo.png";
import { useState } from "react";

const Header: NextComponentType = () => {
  const [displayNav, setDisplayNav] = useState(false);

  return (
    <div
      className={`absolute z-50 flex h-fit w-full flex-col ${
        displayNav ? "bg-sky-800" : "bg-transparent"
      }`}
    >
      <div className="flex flex-row justify-between py-4 pl-4 pr-8">
        <Image
          src={megalan_logo}
          alt="logo"
          className="h-16 w-fit object-contain"
        />

        <button className="h-full" onClick={() => setDisplayNav(!displayNav)}>
          <Bars3Icon className="h-8 w-8 text-white/80" />
        </button>
      </div>
      <div>
        {displayNav && (
          <nav className="z-50 flex h-fit w-full flex-col space-y-8 rounded-b-2xl bg-sky-800 px-8 pb-8 pt-2 text-center text-lg text-white/80">
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/about">About</Link>
            <Link href="/bingo">Bingo</Link>
            <Link href="/logout">Log Out</Link>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
