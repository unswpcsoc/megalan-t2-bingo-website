import { type TaskType } from "@prisma/client";
import Layout from "../_layout";

const Prize = ({ type }: { type: TaskType }) => {
  return (
    <Layout>
      <h1 className="mt-24 text-white">{type}</h1>
    </Layout>
  );
};

export default Prize;
