import { supabase } from "@/libs/supabase";

export const fetchRanking = async () => {
  const { data, error } = await supabase
    .from("play_times")
    .select("*")
    .order("started_at");
  if (error) throw error;
  return data;
};
