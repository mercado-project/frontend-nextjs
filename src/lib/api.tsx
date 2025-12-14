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
