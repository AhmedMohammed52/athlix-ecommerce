import { supabase } from "../lib/supabase";

export async function getAccountOrders() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      email,
      phone,
      first_name,
      last_name,
      address,
      city,
      postal_code,
      subtotal,
      shipping,
      total,
      status,
      created_at,
      order_items (
        id,
        product_id,
        color_id,
        size_id,
        quantity,
        price
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function getOrderById(orderId) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      email,
      phone,
      first_name,
      last_name,
      address,
      city,
      postal_code,
      subtotal,
      shipping,
      total,
      status,
      created_at,

      order_items (
        id,
        product_id,
        color_id,
        size_id,
        quantity,
        price,

        products (
          id,
          name,
          price,

          brands (
            id,
            name
          ),

          categories (
            id,
            name
          ),

          product_images (
            id,
            image_url,
            is_primary,
            sort_order
          )
        ),

        product_colors (
          id,
          name,
          hex_code
        ),

        product_sizes (
          id,
          size
        )
      )
      `,
    )
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
