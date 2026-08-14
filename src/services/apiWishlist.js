import { supabase } from "../lib/supabase";

export async function getWishlist() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("You must be logged in.");
  }

  let { data: wishlist, error: wishlistError } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (wishlistError) throw wishlistError;

  if (!wishlist) {
    const { data, error } = await supabase
      .from("wishlists")
      .insert({
        user_id: user.id,
      })
      .select("id")
      .single();

    if (error) throw error;

    wishlist = data;
  }

  const { data, error } = await supabase
    .from("wishlist_items")
    .select(
      `
      id,
      wishlist_id,
      product_id,
      created_at,
      products (
        *,
        brands (
          id,
          name
        ),
        product_images (
          id,
          image_url,
          is_primary,
          sort_order
        )
      )
    `,
    )
    .eq("wishlist_id", wishlist.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addToWishlist(productId) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("You must be logged in.");
  }

  let { data: wishlist, error: wishlistError } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (wishlistError) throw wishlistError;

  if (!wishlist) {
    const { data, error } = await supabase
      .from("wishlists")
      .insert({
        user_id: user.id,
      })
      .select("id")
      .single();

    if (error) throw error;

    wishlist = data;
  }

  const { data, error } = await supabase
    .from("wishlist_items")
    .insert({
      wishlist_id: wishlist.id,
      product_id: productId,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function removeFromWishlist(productId) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data: wishlist, error: wishlistError } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (wishlistError) throw wishlistError;

  if (!wishlist) {
    return;
  }

  const { error } = await supabase
    .from("wishlist_items")
    .delete()
    .eq("wishlist_id", wishlist.id)
    .eq("product_id", productId);

  if (error) throw error;
}

export async function isProductInWishlist(productId) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) return false;

  const { data: wishlist, error: wishlistError } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (wishlistError) throw wishlistError;

  if (!wishlist) return false;

  const { data, error } = await supabase
    .from("wishlist_items")
    .select("id")
    .eq("wishlist_id", wishlist.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) throw error;

  return !!data;
}
