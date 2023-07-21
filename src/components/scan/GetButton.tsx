import React from "react";
import { useUserStore } from "@/libs/store";
import {
  getUser,
  updateUserGetClues,
  updateUserGetPeople,
} from "@/hooks/supabase/useUserFunctions";
import { User } from "@/types/tableType";
import { useRouter } from "next/router";
import { useSounds } from "@/hooks/useSounds";

type Props = {
  currentModel: string;
};

type ModelKeys =
  | "lock"
  | "dent"
  | "chair"
  | "controller"
  | "earrings"
  | "knife"
  | "water"
  | "document";

const ClUES = {
  lock: { id: 1, name: "玄関の鍵", storyId: "22,23" },
  knife: { id: 2, name: "包丁", storyId: "24,25" },
  controller: { id: 3, name: "エアコンのリモコン", storyId: "26,28" },
  water: { id: 4, name: "濡れた床", storyId: "29,30" },
  dent: { id: 5, name: "へこんだ床", storyId: "31" },
  chair: { id: 6, name: "椅子", storyId: "32" },
  earrings: { id: 7, name: "イヤリング", storyId: "33,41" },
  document: { id: 8, name: "被害者の情報", storyId: "61,68" },
};

const GetButton = (props: Props) => {
  const router = useRouter();
  const updateStoreUser = useUserStore((state) => state.updateUser);
  const { clue_detail } = useSounds();

  const handleGetClue = async () => {
    let user: User | undefined;

    await getUser(router.query.id as string).then((res) => {
      if (!res.data) return;

      user = res.data[0] as User;
      // storeに保存
      updateStoreUser(res.data[0] as User);
    });

    // userのget_cluesにprops.currentModelが既に存在するか確認
    const currentModel = ClUES[props.currentModel as ModelKeys ];
    const getClueIds = user?.get_clues?.split(",") as string[];

    if (getClueIds && getClueIds.includes(currentModel.id.toString())) {
    } else {
      // 存在しない場合

      let newGetClues;
      if (!getClueIds) {
        newGetClues = currentModel.id.toString();
      } else {
        newGetClues = user?.get_clues + "," + currentModel.id;
      }

      // Supabaseのuserテーブルのget_cluesにprops.currentModelのidを追加
      await updateUserGetClues(user?.id as string, newGetClues);

      // イヤリングの場合はget_peopleに1,2,3を追加
      if (currentModel.id === 7) {
        await updateUserGetPeople(user?.id as string, "1,2,3");
      }

      // storeのuser情報を更新
      await getUser(router.query.id as string).then((res) => {
        if (!res.data) return;
        updateStoreUser(res.data[0] as User);
        user = res.data[0] as User;
      });
    }

    clue_detail();
    // 画面遷移
    router.push({
      pathname: "/clue/" + currentModel.id,
      query: {
        id: router.query.id,
        story: currentModel.storyId,
        title: currentModel.name,
      },
    });
  };

  return (
    <div>
      <button
        onClick={handleGetClue}
        className="boxShadow mb-3 flex w-full items-center justify-center rounded bg-theme-red py-2.5 text-lg tracking-widest"
      >
        取得する
      </button>
    </div>
  );
};

export default GetButton;
