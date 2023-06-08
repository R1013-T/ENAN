import { useUserStore } from "@/libs/store";
import { supabase } from "@/libs/supabase";
import { User } from "@/types/tableType";

// const user = useUserStore((state) => state.user)

export const createUser = async (id: string, name: string) => {
  // ユーザーをSPに登録
  await supabase.from("users").insert({ id, name });
  const user = await supabase.from("users").select("*").eq("id", id);

  return user;
};

export const getUser = async (id: string) => {
  const user = await supabase.from("users").select("*").eq("id", id);
  return user;
};

export const updateUserGetStories = async (
  userId: string,
  storyIds: string
) => {
  const { error } = await supabase
    .from("users")
    .update({ get_stories: storyIds })
    .eq("id", userId);
};
