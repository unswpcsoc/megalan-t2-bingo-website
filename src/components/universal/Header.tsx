/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { type NextComponentType } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import megalan_logo from "public/images/megalan_logo.png";
import { useState } from "react";

/**
 * Header Component with logo and navigation links
 */
const Header: NextComponentType = () => {
  const [displayNav, setDisplayNav] = useState(false);
  const { data: session } = useSession();
  return (
    <div
      className={`fixed z-50 flex h-fit w-full flex-col rounded-b-2xl duration-150 ${
        displayNav ? "backdrop-blur-2xl" : "backdrop-blur-md"
      }`}
    >
      <div className="flex flex-row justify-between py-1 pl-4 pr-8 sm:py-2">
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
          <nav className="z-50 flex h-fit w-full flex-col space-y-8 px-8 pb-8 pt-2 text-center text-xl font-semibold text-white/80">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>

            {session ? (
              <>
                <Link href="/quests">Quests</Link>
                <h1>Logged in as {session.user?.name}</h1>
                <Link href="/" onClick={() => signOut()}>
                  Log Out
                  <ArrowRightOnRectangleIcon className="mb-1 ml-2 inline-block h-5 w-5 text-white" />
                </Link>
              </>
            ) : (
              <Link href="/auth/login">
                Log In / Sign Up
                <ArrowLeftOnRectangleIcon className="mb-1 ml-2 inline-block h-5 w-5 text-white" />
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
