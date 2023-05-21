import { supabase } from "@/libs/supabase";
import { Clue } from "@/types/tableType";

export const getClues = async (ids: string[]) => {
  let clues: Clue[] = [];

  const { data, error } = await supabase.from("clues").select("*");

  if (!data || error || !data[0]) return;
  clues = data as Clue[];

  return clues;
};
