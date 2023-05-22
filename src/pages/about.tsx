import { type NextPage } from "next";
import Image from "next/image";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import Layout from "~/pages/_layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="min-h-full px-6 py-12 lg:px-8">
        <div className="mx-auto w-full md:max-w-md lg:max-w-4xl">
          <h2 className="mt-14 text-left text-4xl font-extrabold tracking-tight text-white/90 sm:text-5xl">
            ✨ About MegaLAN
          </h2>
          <p className="py-2 text-white/90">
            MegaLAN is the biggest LAN and console party in Sydney. Held at UNSW
            three times a year, MegaLAN is exclusively an event catered to
            gamers and tech fans from all backgrounds and of all interests, with
            initiatives that strive to actively include attendees of minority
            demographics.
          </p>
          <p className="py-2 text-white/90">
            MegaLAN is held across two floors of the Science and Engineering
            Building, occupying 8 different rooms and halls. Our ever-expanding
            offerings currently include a classic BYO PC/laptop LAN section with
            an Esports Stage, BYO console gaming, arcade games, fighting games,
            cosplay and Virtual Reality.
          </p>
          <p className="py-2 text-white/90">
            We are extremely proud to be able to not only keep the tradition of
            LANs alive, but thriving and growing by providing state-of-the-art
            internet access, power and security for all attendees to bring their
            own computer, console or mobile device. For those who aren&#39;t
            able to bring their own devices for gaming, we have a vast range of
            freeplay PCs, consoles and VR headsets that we encourage everyone to
            try out and have fun!
          </p>
          <p className="py-2 text-white/90">
            There are so many things to love about MegaLAN - some have likened
            it to a gaming and tech convention, but at a more grassroots level,
            and others say it&#39;s a showcase of the most exciting things in
            gaming and tech. But no matter where you&#39;re from, MegaLAN is
            made for gamers, by gamers - a place where the magic of gaming comes
            to life!
          </p>
          <h2 className="mt-4 text-left text-4xl font-extrabold tracking-tight text-white/90 sm:text-5xl">
            🎮 Clubs and Societies at MegaLAN
          </h2>
          <div className="py-2 text-white/90">
            <li>PCSoc: Computers and Tech</li>
            <li>Esports Club</li>
            <li>Riot Games Society</li>
            <li>Mechanical Keyboards Society</li>
            <li>Fighting Games Society</li>
            <li>Rhythm Games Society</li>
            <li>Virtual Reality Society</li>
            <li>Genshin Impact Society</li>
            <li>Minecraft Society</li>
            <li>Pokemon Society</li>
            <li>Smash Brothers Society</li>
            <li>Game Development Society</li>
          </div>
          <h2 className="mt-4 text-left text-4xl font-extrabold tracking-tight text-white/90 sm:text-5xl">
            🚀 Supported by
          </h2>
          <p className="py-2 text-white/90">
            MegaLAN is proudly supported by Arc @ UNSW & Gigabyte AORUS since
            its founding, and acknowledge GXS Studios as a key collaborator
          </p>
          <p className="py-2 text-sm text-white/90">
            MegaLAN will always make free tickets available for UNSW students
          </p>
          <h2 className="mt-4 text-left text-4xl font-extrabold tracking-tight text-white/90 sm:text-5xl">
            💻 Website Developer
          </h2>
          <div className="my-4 flex h-fit flex-row space-x-4 rounded-lg bg-white/20 px-4 py-4 drop-shadow-md sm:space-x-6 sm:px-6">
            <Image
              src="https://avatars.githubusercontent.com/u/100102134?s=400&u=d97f6a0bbbe82cd89eb1e889d8563014ae724081&v=4"
              alt="hehe-logo"
              height={80}
              width={80}
              className=" my-auto flex-shrink-0 rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1 py-2 text-white/90">
              <h1 className="text-lg font-bold">Hari Pramod B</h1>
              <a
                href="https://github.com/HARI-PRMD"
                className="flex flex-row space-x-2"
              >
                <BsGithub className="h-5 w-5" />
                <p className="font-medium">Github</p>
              </a>
              <a
                href="https://www.linkedin.com/in/hari-pramod-b-2b316b244/"
                className="flex flex-row space-x-2"
              >
                <BsLinkedin className="h-5 w-5" />
                <p className="font-medium">Linkedin</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
