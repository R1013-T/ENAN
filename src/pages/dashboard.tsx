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
    // keyword=keyword&tag=tag

    document.location.href = "/scan/?" + urlSearchParam;
  };

  return (
    <div>
      <h1>#dashboard</h1>
      <Link href={{ pathname: "/story", query: { id: id } }}>dashboard</Link>
      <br />
      <button onClick={changeScan}>scan</button>
      <br />
    </div>
  );
};

export default Dashboard;
