import { supabase } from "../lib/supabase";

const productSelect = `
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
`;

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getTrendingProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) throw error;

  return data;
}

export async function getNewArrivals(limit = 4) {
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
}

export async function getRelatedProducts(product) {
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("category_id", product.category_id)
    .neq("id", product.id)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) throw error;

  return data;
}
