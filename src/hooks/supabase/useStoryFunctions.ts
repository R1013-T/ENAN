import { supabase } from "@/libs/supabase";
import { Story } from "@/types/tableType";

export const getStories = async (ids: number[]) => {
  const stories: Story[] = [];

  //! store を 確認する

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