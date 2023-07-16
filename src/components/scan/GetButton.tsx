import React from "react";
import { useUserStore } from "@/libs/store";
import {getUser, updateUserGetClues} from "@/hooks/supabase/useUserFunctions";
import { User } from "@/types/tableType";
import { useRouter } from "next/router";

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
  | "water";

const ClUES = {
  lock: { id: 1, name: "玄関の鍵" },
  knife: { id: 2, name: "包丁" },
  controller: { id: 3, name: "エアコンのリモコン" },
  water: { id: 4, name: "濡れた床" },
  dent: { id: 5, name: "へこんだ床" },
  chair: { id: 6, name: "椅子" },
  earrings: { id: 7, name: "イヤリング" },
};

const GetButton = (props: Props) => {
  const router = useRouter();
  const updateStoreUser = useUserStore((state) => state.updateUser);

  const handleGetClue = async () => {
    let user: User | undefined;

    await getUser(router.query.id as string).then((res) => {
      if (!res.data) return;

      user = res.data[0] as User;
      // storeに保存
      updateStoreUser(res.data[0] as User);
    });

    console.log("user:", user);

    // userのget_cluesにprops.currentModelが既に存在するか確認
    const currentModel = ClUES[props.currentModel as ModelKeys ];
    const getClueIds = user?.get_clues?.split(",") as string[];

    if (getClueIds.includes(currentModel.id.toString())) {
      console.log("get_cluesに存在する");
      return;
    } else {
      console.log("get_cluesに存在しない");
      // 存在しない場合

      const newGetClues = user?.get_clues + "," + currentModel.id;

      // Supabaseのuserテーブルのget_cluesにprops.currentModelのidを追加
      await updateUserGetClues(user?.id as string, newGetClues);
      // storeのuser情報を更新
      await getUser(router.query.id as string).then((res) => {
        if (!res.data) return;
        updateStoreUser(res.data[0] as User);
        user = res.data[0] as User;
      });
    }

    // 画面遷移
    router.push({
      pathname: "/clue/" + currentModel.id,
      query: {
        id: router.query.id,
        story: currentModel.id,
        title: currentModel.name,
      }
    })
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
