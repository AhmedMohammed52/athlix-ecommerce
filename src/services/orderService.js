import { supabase } from "../lib/supabase";

export async function createOrder({ shippingData, cartItems }) {
  if (!cartItems?.length) {
    throw new Error("Cart is empty.");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("You must be logged in to place an order.");
  }

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.products?.price || 0);

    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal >= 120 ? 0 : 10;
  const total = subtotal + shipping;

  const items = cartItems.map((item) => ({
    product_id: item.product_id,
    color_id: item.color_id || null,
    size_id: item.size_id || null,
    quantity: item.quantity,
    price: Number(item.products?.price || 0),
  }));

  const { data, error } = await supabase.rpc("create_order_with_stock", {
    p_user_id: user.id,

    p_email: shippingData.email,
    p_phone: shippingData.phone,
    p_first_name: shippingData.firstName,
    p_last_name: shippingData.lastName,
    p_address: shippingData.address,
    p_city: shippingData.city,
    p_postal_code: shippingData.postalCode,

    p_subtotal: subtotal,
    p_shipping: shipping,
    p_total: total,

    p_items: items,
  });

  if (error) {
    throw error;
  }

  const { error: clearCartError } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartItems[0].cart_id);

  if (clearCartError) {
    console.error("Cart clearing failed:", clearCartError);
  }

  return {
    order: data.order,
    items,
    subtotal,
    shipping,
    total,
  };
}
