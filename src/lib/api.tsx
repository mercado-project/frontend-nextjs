export async function getCategoryBySlug(slug: string) {
  const res = await fetch(`http://localhost:3002/categories/url/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function getProductsByCategory(categoryId: number) {
  const res = await fetch(`http://localhost:3002/products/category/${categoryId}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function searchProducts(query: string) {
  const res = await fetch(
    `http://localhost:3002/products/search?w=${query}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return res.json();
}

export async function getBanners() {
  const res = await fetch("http://localhost:3002/cms/banners/active", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}
