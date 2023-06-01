import { api } from "~/utils/api";
import Layout from "../_layout";
import LoadingSpinner from "~/components/universal/LoadingSpinner";
import { space } from "postcss/lib/list";

const Test = () => {
  const { data: winner } = api.prize.getPrizeWinner.useQuery({
    category: "SOCIETY",
  });
  if (!winner) return <LoadingSpinner />;
  return (
    <Layout>
      <main className="flex h-full w-full flex-col justify-center text-white">
        <h1>Hello</h1>
        <h1>{JSON.stringify(winner, null, 4)}</h1>
      </main>
    </Layout>
  );
};
export default Test;
