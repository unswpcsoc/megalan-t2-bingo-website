/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Link from "next/link";
import Layout from "./_layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            MegaLAN Atlantis Quests 🔱
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <div className="flex max-w-md flex-col p-2 text-white">
              <h3 className="text-2xl font-bold">Hello There 👋</h3>
              <p className="pt-2 text-lg">
                If you&apos;ve heard of MegaLAN Atlantis and you are at the
                event right now, then you&apos;ve come to the right website!
                Sign Up, and play a MegaLAN quests, a stamp rally to win some
                cool prizes from our sponsors!
              </p>
            </div>
            <Link
              className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/leaderboard"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Quests Leaderboard →</h3>
              <div className="text-lg">Check out the leader boards!</div>
            </Link>
            <Link
              className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/auth/login"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Login / Sign up to Play →</h3>
              <div className="text-lg">
                Make an account with your Megalan Ticket Details Here, or Login
                if you already created an account.
              </div>
            </Link>
            <Link href="/admin/completeTask"> completeTask</Link>
            <Link
              className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/about"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">About Us →</h3>
              <div className="text-lg">
                Extra details on what MegaLAN is about, and which clubs and
                societies participate in this LAN Party.
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
