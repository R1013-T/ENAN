import { Layout } from "@/components/Layout";
import Link from "next/link";

const Story = () => {
  return (
    <Layout headerType="sub" title="名探偵エナン - ストーリー">
      <h1>#story</h1>
      <Link href={"/dashboard"}>dashboard</Link>
    </Layout>
  );
};

export default Story;
