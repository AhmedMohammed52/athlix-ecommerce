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
  if (!productId) {
    throw new Error("Product is required.");
  }

  if (quantity < 1) {
    throw new Error("Quantity must be at least 1.");
  }

  const cart = await getOrCreateCart();

  // Find the exact cart variant
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

  const currentQuantity = existingItem?.quantity || 0;
  const requestedQuantity = currentQuantity + quantity;

  // If product has a selected size, validate size stock
  if (sizeId) {
    const { data: size, error: sizeError } = await supabase
      .from("product_sizes")
      .select("id, size, stock")
      .eq("id", sizeId)
      .single();

    if (sizeError) throw sizeError;

    const availableStock = Number(size.stock || 0);

    if (availableStock <= 0) {
      throw new Error(`${size.size} is currently out of stock.`);
    }

    if (requestedQuantity > availableStock) {
      throw new Error(
        `Only ${availableStock} item${
          availableStock === 1 ? "" : "s"
        } available for size ${size.size}.`,
      );
    }
  } else {
    // Product without size
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, stock")
      .eq("id", productId)
      .single();

    if (productError) throw productError;

    const availableStock = Number(product.stock || 0);

    if (availableStock <= 0) {
      throw new Error("This product is currently out of stock.");
    }

    if (requestedQuantity > availableStock) {
      throw new Error(
        `Only ${availableStock} item${
          availableStock === 1 ? "" : "s"
        } available.`,
      );
    }
  }

  // Existing variant → increase quantity
  if (existingItem) {
    const { data, error } = await supabase
      .from("cart_items")
      .update({
        quantity: requestedQuantity,
      })
      .eq("id", existingItem.id)
      .select(cartSelect)
      .single();

    if (error) throw error;

    return data;
  }

  // New variant
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

  const { data: item, error: itemError } = await supabase
    .from("cart_items")
    .select(
      `
      id,
      product_id,
      size_id,
      quantity
    `,
    )
    .eq("id", itemId)
    .single();

  if (itemError) throw itemError;

  let availableStock;

  if (item.size_id) {
    const { data: size, error: sizeError } = await supabase
      .from("product_sizes")
      .select("size, stock")
      .eq("id", item.size_id)
      .single();

    if (sizeError) throw sizeError;

    availableStock = Number(size.stock || 0);

    if (quantity > availableStock) {
      throw new Error(
        `Only ${availableStock} item${
          availableStock === 1 ? "" : "s"
        } available for size ${size.size}.`,
      );
    }
  } else {
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("stock")
      .eq("id", item.product_id)
      .single();

    if (productError) throw productError;

    availableStock = Number(product.stock || 0);

    if (quantity > availableStock) {
      throw new Error(
        `Only ${availableStock} item${
          availableStock === 1 ? "" : "s"
        } available.`,
      );
    }
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
