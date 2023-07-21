import { Layout } from "@/components/Layout";
import Title from "@/components/panel/Title";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Frame } from "@/components/panel/downShadowFrame";
import { useUserStore } from "@/libs/store";
import { User } from "@/types/tableType";
import { useRouter } from "next/router";
import { getUser } from "@/hooks/supabase/useUserFunctions";

const Hints = () => {
  const storeUser = useUserStore((state) => state.user);
  const updateStoreUser = useUserStore((state) => state.updateUser);

  const router = useRouter();
  const { id } = router.query;

  const [gotPeopleNum, setGotPeopleNum] = useState<number>(0);
  const [gotClueNum, setGotClueNum] = useState<number>(0);

  let user: User | undefined;
  let getPeopleIds: string[] = [];
  let getClueIds: string[] = [];

  useEffect(() => {
    if (!router.isReady) return;
    if (!id) {
      alert("2階 202教室 で開催中です！");
      router.push("/result/ranking");
    }

    init();
  }, [router.isReady]);

  const init = async () => {
    await getUserInfo();
    setupPeoplePieChart();
    setupCluesPieChart();
  };

  const getUserInfo = async () => {
    // storeにuser情報があるか確認
    if (storeUser.id) {
      user = storeUser;
    } else {
      // ない場合はSPからuser情報を取得
      await getUser(router.query.id as string).then((res) => {
        if (!res.data) return;

        user = res.data[0] as User;
        // storeに保存
        updateStoreUser(res.data[0] as User);
      });
    }

    getPeopleIds = user?.get_people?.split(",") as string[];
    getClueIds = user?.get_clues?.split(",") as string[];

    if (getPeopleIds) setGotPeopleNum(getPeopleIds.length);
    if (getClueIds) setGotClueNum(getClueIds.length);
  };

  useEffect(() => {
    setupPeoplePieChart();
  }, [gotPeopleNum]);

  useEffect(() => {
    setupCluesPieChart();
  }, [gotClueNum]);

  const setupPeoplePieChart = () => {
    if (!gotPeopleNum) return;

    let ctx: any = document.getElementById("peoplePieChart");
    if (!ctx) return;
    let myDoughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["", ""], //データ項目のラベル
        datasets: [
          {
            backgroundColor: ["#ED1643", "#1D1E22"],
            data: [gotPeopleNum, 3 - gotPeopleNum], //グラフのデータ
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  };

  const setupCluesPieChart = () => {
    if (!gotClueNum) return;

    let ctx: any = document.getElementById("cluesPieChart");
    if (!ctx) return;
    let myDoughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["", ""], //データ項目のラベル
        datasets: [
          {
            backgroundColor: ["#ED1643", "#1D1E22"],
            data: [gotClueNum, 8 - gotClueNum], //グラフのデータ
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  };

  return (
    <Layout headerType="sub" title="進捗">
      <div className="h-screen w-full overflow-y-scroll pb-28">
        <Title title="進捗" />
        <Frame>
          <div className="racking-widest my-4 w-full text-center text-xs text-theme-black">
            <p className="mb-2 text-sm text-white">容疑者と話す</p>
            <p>容疑者と話し、事件を推理しよう。</p>
          </div>
          <div className="relative mx-auto mb-5 w-10/12 p-3">
            <p className="absolute right-1/2 top-1/2 -translate-y-4 translate-x-1/2 text-3xl tracking-widest">
              {gotPeopleNum}
              <span className="text-base">/3</span>
              <span className="text-xs">人</span>
            </p>
            <canvas id="peoplePieChart"></canvas>
          </div>
        </Frame>
        <Frame>
          <div className="racking-widest my-4 w-full text-center text-xs text-theme-black">
            <p className="mb-2 text-sm text-white">手がかりを見つける</p>
            <p>マーカーをスキャンし、手がかりを見つけよう。</p>
          </div>
          <div className="relative mx-auto mb-5 w-10/12 p-3">
            <p className="absolute right-1/2 top-1/2 -translate-y-4 translate-x-1/2 text-3xl tracking-widest">
              {gotClueNum}
              <span className="text-base">/8</span>
              <span className="text-xs">個</span>
            </p>
            <canvas id="cluesPieChart"></canvas>
          </div>
        </Frame>
      </div>
    </Layout>
  );
};

export default Hints;
