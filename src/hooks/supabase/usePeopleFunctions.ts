import { supabase } from "@/libs/supabase";
import { Person } from "@/types/tableType";

export const getPeople = async (ids: string[]) => {
  let people:Person[] = []

  let p = Promise.resolve();
  ids.forEach(async (id) => {
    p = p.then(async () => {
      const { data, error } = await supabase
        .from("people")
        .select("*")
        .eq("id", id);

      if (!data || error || !data[0]) return;
      people.push(data[0] as Person);
    });
  });
  await p;
  
  return people;
}