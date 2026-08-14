import { supabase } from "../lib/supabase";

const cartSelect = `
  id,
  cart_id,
  product_id,
  color_id,
  size_id,
  quantity,
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
  ),

  product_colors (
    id,
    name,
    hex_code
  ),

product_sizes (
  id,
  size,
  stock
)
`;

// Get or create the current user's cart
export async function getOrCreateCart() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user) {
    throw new Error("You must be logged in.");
  }

  let { data: cart, error } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  if (cart) {
    return cart;
  }

  const { data: newCart, error: createError } = await supabase
    .from("carts")
    .insert({
      user_id: user.id,
    })
    .select("id")
    .single();

  if (createError) throw createError;

  return newCart;
}

// Get all cart items
export async function getCart() {
  const cart = await getOrCreateCart();

  const { data, error } = await supabase
    .from("cart_items")
    .select(cartSelect)
    .eq("cart_id", cart.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data || [];
}

// Add product to cart
export async function addToCart({
  productId,
  colorId = null,
  sizeId = null,
  quantity = 1,
}) {
  const cart = await getOrCreateCart();

  // Check if the exact variant already exists
  let query = supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cart.id)
    .eq("product_id", productId);

  if (colorId) {
    query = query.eq("color_id", colorId);
  } else {
    query = query.is("color_id", null);
  }

  if (sizeId) {
    query = query.eq("size_id", sizeId);
  } else {
    query = query.is("size_id", null);
  }

  const { data: existingItem, error: findError } = await query.maybeSingle();

  if (findError) throw findError;

  // If already exists → increase quantity
  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity;

    const { data, error } = await supabase
      .from("cart_items")
      .update({
        quantity: newQuantity,
      })
      .eq("id", existingItem.id)
      .select(cartSelect)
      .single();

    if (error) throw error;

    return data;
  }

  // Otherwise create new item
  const { data, error } = await supabase
    .from("cart_items")
    .insert({
      cart_id: cart.id,
      product_id: productId,
      color_id: colorId,
      size_id: sizeId,
      quantity,
    })
    .select(cartSelect)
    .single();

  if (error) throw error;

  return data;
}

// Update quantity
export async function updateCartItemQuantity(itemId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(itemId);
  }

  const { data, error } = await supabase
    .from("cart_items")
    .update({
      quantity,
    })
    .eq("id", itemId)
    .select(cartSelect)
    .single();

  if (error) throw error;

  return data;
}

// Remove item
export async function removeFromCart(itemId) {
  const { error } = await supabase.from("cart_items").delete().eq("id", itemId);

  if (error) throw error;

  return {
    success: true,
    id: itemId,
  };
}

// Clear cart
export async function clearCart() {
  const cart = await getOrCreateCart();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cart.id);

  if (error) throw error;

  return {
    success: true,
  };
}
