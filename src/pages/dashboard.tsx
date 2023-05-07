import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  const changeScan = () => {
    document.location.href = "/scan";
  };

  return (
    <div>
      <h1>#dashboard</h1>
      <Link href={"/story"} className="block">
        story
      </Link>
      <button onClick={changeScan}>scan</button>
    </div>
  );
};

export default Dashboard;
