import { Layout } from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Story = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <Layout headerType="sub" title="名探偵エナン - ストーリー">
      <h1>#story</h1>
      <Link href={{ pathname: "/dashboard", query: { id: id } }}>
        dashboard
      </Link>
    </Layout>
  );
};

export default Story;
