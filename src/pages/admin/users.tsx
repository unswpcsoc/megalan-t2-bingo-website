import { type NextPage } from "next";
import Layout from "../_layout";

const manageAdmins: NextPage = () => {
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Manage Admins 🔱
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            <h1>Manage Admins Lmao</h1>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default manageAdmins;
