import { supabase } from "@/libs/supabase";
import { RankingProps } from "@/pages/result/ranking";

export const createPlayTime = async (params: RankingProps) => {
  // ユーザーをSPに登録
  await supabase.from("play_times").insert({
    id: params.id,
    started_at: params.started_at,
    user_id: params.user_id,
    user_name: params.user_name,
  });
};

export const updatePlayTime = async (id: string, finished_at: string) => {
  await supabase
    .from("play_times")
    .update({
      finished_at: finished_at,
    })
    .eq("id", id);
};
