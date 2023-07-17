import { supabase } from "@/libs/supabase";

export const fetchRanking = async () => {
  const { data, error } = await supabase
    .from("play_times")
    .select("*")
    .order("started_at")
    .limit(10);
  if (error) throw error;
  return data;
};
