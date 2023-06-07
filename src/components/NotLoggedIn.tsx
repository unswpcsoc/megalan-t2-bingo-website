import Link from "next/link";
import Layout from "~/pages/_layout";

/**
 * Warning screen for unauthenticated users trying to access screens which
 * need authentication
 */
const NotLoggedIn = () => {
  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {/* Create Account Header Section */}
        <div className="flex w-full flex-row justify-center sm:mx-auto sm:w-full">
          <h2 className="mt-10 text-center text-2xl font-bold leading-8 tracking-tight text-white/90">
            Oops... Looks like you aren&apos;t logged in
          </h2>
        </div>
        <div className="flex justify-center">
          <Link
            href="/auth/login"
            className="mt-10 w-fit rounded-full bg-white/10 px-10 py-3 text-2xl font-bold text-white no-underline transition hover:bg-white/20"
          >
            Login
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default NotLoggedIn;
