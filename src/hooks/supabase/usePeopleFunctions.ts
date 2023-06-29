import { supabase } from "@/libs/supabase";
import { Person } from "@/types/tableType";

export const getPeople = async () => {
  let people: Person[] = [];

  const { data, error } = await supabase.from("people").select("*");

  if (!data || error || !data[0]) return;
  people = data as Person[];

  return people;
};
