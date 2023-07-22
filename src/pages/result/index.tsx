import { Layout } from "@/components/Layout";
import Title from "@/components/panel/Title";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUsers } from "react-icons/fa";
import { useSounds } from "@/hooks/useSounds";
import CreatedBy from "@/components/result/CreatedBy";
import Resources from "@/components/result/Resources";
import TechnicalStack from "@/components/result/TechnicalStack";

const Result = () => {
  const router = useRouter();
  const { playClick, storyStart } = useSounds();

  return (
    <Layout headerType="sub" title="結果" hideUnderButton={true}>
      <div className="h-screen w-full overflow-y-scroll">
        <div className="relative h-[90%] border border-theme-black/0">
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
                query: { id: router.query.id, story: "45,60" },
              }}
              className="boxShadow mb-5 flex w-full items-center justify-center rounded bg-theme-red py-2.5 text-lg tracking-widest text-white"
              onClick={() => {
                storyStart();
              }}
            >
              <p className="px-3">事件の真相を見る</p>
            </Link>
            <Link
              href={{
                pathname: "/result/ranking",
                query: { id: router.query.id, story: "" },
              }}
              className="boxShadow mt-3 flex w-full items-center justify-center rounded bg-theme-black py-2.5 text-lg tracking-widest text-black"
              onClick={() => {
                playClick();
              }}
            >
              <div className="grid h-6 w-6 place-items-center">
                <FaUsers size={20} />
              </div>
              <p className="px-3">ランキング</p>
              <div className="w-6"></div>
            </Link>
          </div>
        </div>
        <div>
          <CreatedBy />
          <TechnicalStack />
          <Resources />
        </div>
      </div>
    </Layout>
  );
};

export default Result;
