import { supabase } from "@/libs/supabase";
import { Clue } from "@/types/tableType";

export const getClues = async (ids: string[]) => {
  let clues:Clue[] = []

  let p = Promise.resolve();
  ids.forEach(async (id) => {
    p = p.then(async () => {
      const { data, error } = await supabase
        .from("clues")
        .select("*")
        .eq("id", id);

      if (!data || error || !data[0]) return;
      clues.push(data[0] as Clue);
    });
  });
  await p;
  
  return clues;
}