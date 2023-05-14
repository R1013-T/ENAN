import { supabase } from "@/libs/supabase";
import { Story } from "@/types/tableType";

export const getStories = async (ids: number[]) => {
  const stories: Story[] = [];

  // https://zenn.dev/sora_kumo/articles/612ca66c68ff52

  let p = Promise.resolve();
  ids.forEach(async (id) => {
    p = p.then(async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("id", id);

      if (!data || error) return;
      stories.push(data[0] as Story);
    });
  });
  await p;

  return stories;
};