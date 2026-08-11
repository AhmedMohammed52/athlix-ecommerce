import { supabase } from "../lib/supabase";

export async function getBrands() {
  const { data, error } = await supabase
    .from("brands")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) throw error;

  return data;
}
