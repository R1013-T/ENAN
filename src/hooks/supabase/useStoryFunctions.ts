import { supabase } from "@/libs/supabase";
import { Story } from "@/types/tableType";

export const getStories = async (ids: number[]) => {
  const stories: Story[] = [];

  for (
    let current_id = ids[0];
    current_id <= ids[ids.length - 1];
    current_id++
  ) {
    if (!current_id) return;

    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("id", current_id);

    if (!data || error) return;
    stories.push(data[0] as Story);
  }

  return stories;
};
