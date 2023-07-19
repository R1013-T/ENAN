import { getStories } from "@/hooks/supabase/useStoryFunctions 2";
import {
  getUser,
  updateUserGetStories,
} from "@/hooks/supabase/useUserFunctions";
import { useGetStoriesStore, useUserStore } from "@/libs/store";
import { User } from "@/types/tableType";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useSounds } from "@/hooks/useSounds";

interface Props {
  buttonText: string;
  storyId: string;
}

const DetailUnderButton = (props: Props) => {
  const router = useRouter();
  const storeUser = useUserStore((state) => state.user);
  const updateStoreUser = useUserStore((state) => state.updateUser);
  const storeGetStories = useGetStoriesStore((state) => state.getStories);
  const updateStoreGetStories = useGetStoriesStore(
    (state) => state.updateGetStories
  );

  const { playClick, storyStart } = useSounds();

  const handlePlayStory = async () => {
    let currentStoryIds = props.storyId?.split(",");
    let getStoryIds = storeUser.get_stories?.split(",");

    let isAlreadyFlag = false;

    currentStoryIds.forEach((currentStoryId) => {
      let isAlreadyGet = false;

      getStoryIds?.forEach((getStoryId) => {
        if (currentStoryId === getStoryId) {
          isAlreadyGet = true;
          isAlreadyFlag = true;
        }
      });

      if (!isAlreadyGet) getStoryIds?.push(currentStoryId);
    });

    let storyIds = getStoryIds?.join(",");

    if (!isAlreadyFlag && storyIds) {
      await updateUserGetStories(storeUser.id, storyIds);

      await getUser(router.query.id as string).then((res) => {
        if (!res.data) return;
        updateStoreUser(res.data[0] as User);
      });
      await getStories(storyIds.split(",").map(Number)).then((res) => {
        if (!res) return;
        updateStoreGetStories(res);
      });
    }

    router.push({
      pathname: "/story",
      query: { id: router.query.id, story: props.storyId },
    });
  };

  useEffect(() => {
    if (!router.isReady) return;
    const setUserInfo = async () => {
      // ない場合はSPからuser情報を取得
      if (!storeUser.id) {
        await getUser(router.query.id as string).then((res) => {
          if (!res.data) return;
          // storeに保存
          updateStoreUser(res.data[0] as User);
        });
      }
    };
    setUserInfo();
  }, [router.isReady]);

  return (
    <div className="absolute bottom-6 left-6 right-6">
      <button
        className="boxShadow block w-full rounded bg-theme-red py-2.5 text-center text-lg tracking-widest"
        onClick={() => {
          handlePlayStory();
          storyStart();
        }}
      >
        {props.buttonText}
      </button>
      <Link
        href={{ pathname: "/home", query: { id: router.query.id } }}
        className="boxShadow mt-3 flex w-full items-center justify-center rounded bg-theme-black py-2.5 text-lg tracking-widest"
        onClick={() => {
          playClick();
        }}
      >
        <div className="grid h-6 w-6 place-items-center">
          <VscArrowLeft size={20} />
        </div>
        <p className="px-3">戻る</p>
        <div className="w-6"></div>
      </Link>
    </div>
  );
};

export default DetailUnderButton;
