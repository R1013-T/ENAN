import { Layout } from "@/components/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "@/utils/validationSchema";
import { useRouter } from "next/router";
import { createUser } from "@/hooks/supabase/useUserFunctions";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { useUserStore } from "@/libs/store";
import { User } from "@/types/tableType";
import { createPlayTime } from "@/hooks/supabase/usePlayTimeFunctions";
import { RankingProps } from "@/pages/result/ranking";
import { useSounds } from "@/hooks/useSounds";

interface TopForm {
  name: string;
}

const Index = () => {
  const updateUser = useUserStore((state) => state.updateUser);

  const { playStart, playClick, storyStart } = useSounds();

  const router = useRouter();
  const { id } = router.query;

  const [isStart, setIsStart] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (id) {
      router.push({
        pathname: "/home",
        query: { id: id },
      });
    }
  }, [router.isReady]);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopForm>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: TopForm) => {
    if (errors.name || isLoading) return;
    playClick();

    setIsLoading(true);

    const id = uuidv4();

    await createUser(id, data.name)
      .then((res) => {
        if (!res.data) return;

        const currentDateTime = new Date().toISOString().slice(0, 19);

        const params: RankingProps = {
          id: res.data[0].id.toString(),
          started_at: currentDateTime,
          finished_at: null,
          user_id: res.data[0].id.toString(),
          user_name: res.data[0].name.toString(),
        };

        (async () => {
          await createPlayTime(params);
        })();

        setIsLoading(false);

        updateUser(res.data[0] as User);

        storyStart();
        router.push({
          pathname: "/story",
          query: { id: id, story: "1,4" },
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Layout headerType="top" title="">
      {!isStart && (
        <div
          className="fixed left-0 top-0 z-50 grid h-screen w-screen place-items-center bg-bg-black/80 backdrop-blur"
          onClick={() => {
            setIsStart(true);
            playStart();
          }}
        >
          <div className="rounded border border-theme-black/60 bg-bg-black/80 p-7">
            <p className="text-center text-base">タップしてスタート！</p>
          </div>
        </div>
      )}
      <div className="relative h-full">
        <form
          className="absolute bottom-0 w-full p-6"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <label
            htmlFor="name"
            className="mb-1 block py-2 text-xs text-theme-black"
          >
            ユーザーネーム
          </label>
          <input
            id="name"
            type="text"
            className="boxShadow w-full rounded border border-theme-black bg-transparent px-3 py-3 text-base tracking-wider outline-none placeholder:text-sm placeholder:tracking-wider"
            placeholder="User Name"
            {...register("name")}
          />
          <p className="mb-3 h-1 py-3 text-xs text-red-300">
            {errors.name?.message}
          </p>
          <button
            className={`boxShadow flex w-full items-center justify-center rounded bg-theme-red py-2.5 text-lg tracking-widest transition-all ${
              errors.name?.message ? "opacity-40" : ""
            } ${isLoading ? "opacity-40" : ""}`}
            type="submit"
          >
            <div className="grid h-6 w-6 place-items-center">
              <div className="rotationInfinite">
                {isLoading ? <BiLoader size={20} /> : ""}
              </div>
            </div>
            <p className="px-3">START</p>
            <div className="w-6"></div>
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Index;
