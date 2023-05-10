import { type NextPage } from "next";
import Layout from "./_layout";
import Image from "next/image";
import atlantis from "public/images/atlantis1.jpg";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-white/90">
            🤔 What is Megalan?
          </h2>
          <p className="py-2 text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            aliquet, eros in malesuada efficitur, ligula sapien congue neque, at
            mollis tellus neque at massa. Suspendisse consectetur tempus leo at
            semper. Ut mi metus, varius a lorem eu, ultrices ullamcorper est.
            Sed et porta augue.
          </p>
          <h2 className="mt-4 text-left text-2xl font-bold leading-9 tracking-tight text-white/90">
            ✨ Clubs and Societies at Megalan
          </h2>
          <p className="py-2 text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            aliquet, eros in malesuada efficitur, ligula sapien congue neque, at
            mollis tellus neque at massa. Suspendisse consectetur tempus leo at
            semper. Ut mi metus, varius a lorem eu, ultrices ullamcorper est.
            Sed et porta augue.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
