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

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,

      email: shippingData.email,
      phone: shippingData.phone,
      first_name: shippingData.firstName,
      last_name: shippingData.lastName,
      address: shippingData.address,
      city: shippingData.city,
      postal_code: shippingData.postalCode,

      subtotal,
      shipping,
      total,

      status: "pending",
    })
    .select()
    .single();

  if (orderError) {
    throw orderError;
  }

  const orderItems = cartItems.map((item) => ({
    order_id: order.id,

    product_id: item.product_id,
    color_id: item.color_id || null,
    size_id: item.size_id || null,

    quantity: item.quantity,

    price: Number(item.products?.price || 0),
  }));

  const { data: createdItems, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems)
    .select();

  if (itemsError) {
    throw itemsError;
  }

  const { error: clearCartError } = await supabase
    .from("cart_items")
    .delete()
    .eq("cart_id", cartItems[0].cart_id);

  if (clearCartError) {
    throw clearCartError;
  }

  return {
    order,
    items: createdItems,
    subtotal,
    shipping,
    total,
  };
}
