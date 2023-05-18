import { Layout } from "@/components/Layout";
import Clues from "@/components/home/clues/Clues";
import People from "@/components/home/people/People";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log(id);

    //! ユーザー情報取得

    //! 容疑者情報取得

    //! 手がかり情報取得
  }, [id]);

  return (
    <Layout headerType="sub" title="ホーム">
      <div className="w-full h-screen overflow-y-scroll">
        <People />
        <Clues />
      </div>
    </Layout>
  );
};

export default Dashboard;
