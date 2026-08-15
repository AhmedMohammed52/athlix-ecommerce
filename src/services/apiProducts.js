import { supabase } from "../lib/supabase";

const productSelect = `
  *,
  
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
  ),

  product_colors (
    id,
    product_id,
    name,
    hex_code,
    created_at
  ),

  product_sizes (
    id,
    product_id,
    size,
    stock,
    created_at
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
    .select(
      `
      *,
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
      ),
      product_colors (
        id,
        product_id,
        name,
        hex_code,
        created_at
      ),
      product_sizes (
        id,
        product_id,
        size,
        stock,
        created_at
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getTrendingProducts(limit = 4) {
  const { data: trending, error: trendingError } = await supabase.rpc(
    "get_trending_products",
    {
      limit_count: limit,
    },
  );

  if (trendingError) throw trendingError;

  if (!trending?.length) {
    return [];
  }

  const productIds = trending.map((item) => item.product_id);

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select(productSelect)
    .in("id", productIds);

  if (productsError) throw productsError;

  const salesMap = new Map(
    trending.map((item) => [item.product_id, item.total_sold]),
  );

  return products
    .map((product) => ({
      ...product,
      total_sold: salesMap.get(product.id) || 0,
    }))
    .sort((a, b) => b.total_sold - a.total_sold);
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

export async function getSaleProducts(limit = 4) {
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .gt("discount_percent", 0)
    .order("discount_percent", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
}

export async function getTopSaleProducts(limit = 3) {
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .gt("discount_percent", 0)
    .order("discount_percent", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
}

export async function searchProducts(query) {
  const search = query.trim();

  if (!search) return [];

  const [
    { data: products, error: productsError },
    { data: brands, error: brandsError },
    { data: categories, error: categoriesError },
  ] = await Promise.all([
    supabase
      .from("products")
      .select(productSelect)
      .or(`name.ilike.%${search}%,slug.ilike.%${search}%`)
      .limit(6),

    supabase.from("brands").select("id").ilike("name", `%${search}%`),

    supabase.from("categories").select("id").ilike("name", `%${search}%`),
  ]);

  if (productsError) throw productsError;
  if (brandsError) throw brandsError;
  if (categoriesError) throw categoriesError;

  const brandIds = brands?.map((brand) => brand.id) || [];
  const categoryIds = categories?.map((category) => category.id) || [];

  const relatedQueries = [];

  if (brandIds.length) {
    relatedQueries.push(
      supabase
        .from("products")
        .select(productSelect)
        .in("brand_id", brandIds)
        .limit(6),
    );
  }

  if (categoryIds.length) {
    relatedQueries.push(
      supabase
        .from("products")
        .select(productSelect)
        .in("category_id", categoryIds)
        .limit(6),
    );
  }

  const relatedResults = await Promise.all(relatedQueries);

  for (const result of relatedResults) {
    if (result.error) throw result.error;
  }

  const allProducts = [
    ...(products || []),
    ...relatedResults.flatMap((result) => result.data || []),
  ];

  const uniqueProducts = Array.from(
    new Map(allProducts.map((product) => [product.id, product])).values(),
  );

  return uniqueProducts.slice(0, 6);
}
