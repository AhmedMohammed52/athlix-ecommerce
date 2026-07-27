import { supabase } from "../lib/supabase";

export async function signUp({ firstName, lastName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
      },
    },
  });

  if (error) throw error;

  return data;
}
