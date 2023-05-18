import { supabase } from "@/libs/supabase";

export const createUser = async (id: string, name: string) => {
  await supabase.from("users").insert({ id, name });
};

export const getUser = async (id: string) => {
  const user = await supabase.from("users").select("*").eq("id", id);
  return user;
}