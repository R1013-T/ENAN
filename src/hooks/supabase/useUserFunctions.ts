import {supabase} from "@/libs/supabase";

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

export const updateUserGetClues = async (
  userId: string,
  clueIds: string
) => {
  const { error } = await supabase
    .from("users")
    .update({ get_clues: clueIds })
    .eq("id", userId);
}

export const updateUserGetPeople = async (
  userId: string,
  peopleIds: string
) => {
  const { error } = await supabase
    .from("users")
    .update({ get_people: peopleIds })
    .eq("id", userId);
};