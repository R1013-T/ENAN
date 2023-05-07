import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  return (
    <div>
      <h1>#dashboard</h1>
      <Link href={"/story"} className="block">
        story
      </Link>
      <Link href={"/scan"}>scan</Link>
    </div>
  );
};

export default Dashboard;
