import { Layout } from "@/components/Layout";
import UnderButton from "@/components/dashboard/underButton/UnderButton";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { id } = router.query;

  const changeScan = () => {
    const params = {
      id: id as string,
    };
    const urlSearchParam = new URLSearchParams(params).toString();

    document.location.href = "/scan/?" + urlSearchParam;
  };

  return (
    <Layout headerType="sub" title="ホーム">
      <img src="/images/underButton/end_fill.png" alt="" />
      <img src="/images/underButton/end_fill.svg" alt="" />
    </Layout>
  );
};

export default Dashboard;
