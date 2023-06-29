import { Layout } from "@/components/Layout";
import Title from "@/components/panel/Title";
import confetti from "canvas-confetti";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GrTechnology } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";

const Result = () => {
  const router = useRouter();

  useEffect(() => {
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    let i = 0;
    const playConfetti = setInterval(function () {
      i += 1;
      if (i > 7) clearInterval(playConfetti);
      if (window.location.pathname === "/result") {
        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          origin: { y: 0.6 },
        });
      } else {
        clearInterval(playConfetti);
      }
    }, 100);

    const playConfettiInfinite = setInterval(function () {
      if (window.location.pathname === "/result") {
        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(50, 100),
          origin: { y: 0.6 },
        });
      } else {
        clearInterval(playConfettiInfinite);
      }
    }, 1000);
  }, []);

  return (
    <Layout headerType="sub" title="結果" hideUnderButton={true}>
      <div className="relative h-screen overflow-y-scroll">
        <Title title="最終結果" />
        <div className="absolute top-0 grid h-4/5 w-full place-items-center">
          <div className="">
            <h2 className="my-6 text-center text-3xl tracking-widest">
              正解！
            </h2>
            <p className="mb-4 text-center text-base leading-7 tracking-wider">
              おめでとうございます！正解です！
              <br />
              ご参加いただきありがとうございました！
            </p>
          </div>
        </div>
        <div className="absolute bottom-6 w-full px-6">
          <Link
            href={{
              pathname: "/story",
              query: { id: router.query.id, story: "" },
            }}
            className="boxShadow mb-5 flex w-full items-center justify-center rounded bg-theme-red py-2.5 text-lg tracking-widest text-white"
          >
            <p className="px-3">最終ストーリーを見る</p>
          </Link>
          <Link
            href={{
              pathname: "/result/ranking",
              query: { id: router.query.id, story: "" },
            }}
            className="boxShadow mt-3 flex w-full items-center justify-center rounded bg-theme-black py-2.5 text-lg tracking-widest text-black"
          >
            <div className="grid h-6 w-6 place-items-center">
              <FaUsers size={20} />
            </div>
            <p className="px-3">ランキング</p>
            <div className="w-6"></div>
          </Link>
          <Link
            href={{
              pathname: "/result/technology",
              query: { id: router.query.id, story: "" },
            }}
            className="boxShadow mt-3 flex w-full items-center justify-center rounded bg-theme-black py-2.5 text-lg tracking-widest text-black"
          >
            <div className="grid h-6 w-6 place-items-center">
              <GrTechnology size={20} />
            </div>
            <p className="px-3">使用技術</p>
            <div className="w-6"></div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Result;
