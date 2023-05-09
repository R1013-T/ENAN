import { supabase } from "@/libs/supabase";

export const createUser = async (id: string, name: string) => {
  await supabase.from("users").insert({ id, name });
};
