import { Layout } from "@/components/Layout";
import Title from "@/components/panel/Title";
import UnderButton from "@/components/underButton/UnderButton";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import { Frame } from "@/components/panel/downShadowFrame";

const Hints = () => {
  useEffect(() => {
    setupPeoplePieChart();
    setupCluesPieChart();
  }, []);

  const setupPeoplePieChart = () => {
    let ctx: any = document.getElementById("peoplePieChart");
    if (!ctx) return;
    let myDoughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["", ""], //データ項目のラベル
        datasets: [
          {
            backgroundColor: ["#ED1643", "#1D1E22"],
            data: [70, 30], //グラフのデータ
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
    let ctx: any = document.getElementById("cluesPieChart");
    if (!ctx) return;
    let myDoughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["", ""], //データ項目のラベル
        datasets: [
          {
            backgroundColor: ["#ED1643", "#1D1E22"],
            data: [60, 40], //グラフのデータ
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
      <div className="h-screen overflow-y-scroll">
        <Title title="進捗" />
        <Frame>
          <p className="my-4 w-full text-center racking-widest text-theme-black text-xs">
            容疑者と話す
          </p>
          <div className="w-10/12 mx-auto mb-5 p-3 relative">
            <p className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-3 text-xl tracking-widest">
              2<span className="text-sm">/3</span>
            </p>
            <canvas id="peoplePieChart"></canvas>
          </div>
        </Frame>
        <Frame>
          <p className="my-4 w-full text-center racking-widest text-theme-black text-xs">
            手がかりを見つける
          </p>
          <div className="w-10/12 mx-auto mb-5 p-3 relative">
            <p className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-3 text-xl tracking-widest">
              2<span className="text-sm">/7</span>
            </p>
            <canvas id="cluesPieChart"></canvas>
          </div>
        </Frame>
      </div>
    </Layout>
  );
};

export default Hints;
