import { api } from "~/utils/api";
import Layout from "../_layout";
import LoadingSpinner from "~/components/universal/LoadingSpinner";

const Test = () => {
  const { data: winner } = api.prize.getWinner.useQuery({
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



/* 
{ "completeTasks": [ { "taskID": "clia1ozod0000tnrqq25tbjd5", "userID": "cli9x2bng0000tnlo1mt4ua1a", "completedAt": "2023-06-01T01:41:51.205Z", "authorisedBy": "hari", "task": { "points": 100 } }, { "taskID": "cli9xxgfj0001tnkm9d5fqlgm", "userID": "cli9x2bng0000tnlo1mt4ua1a", "completedAt": "2023-06-01T01:41:06.130Z", "authorisedBy": "hari", "task": { "points": 100 } } ] }*/