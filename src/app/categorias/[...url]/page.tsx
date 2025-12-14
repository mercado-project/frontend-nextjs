import ShopWithSidebar from "@/components/ShopWithSidebar";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";

export default async function CategoryPage(props: { params: Promise<{ url: string[] }> }) {

  const { url } = await props.params;

    const lastSlug = url[url.length - 1];

  // Busca a categoria pelo slug (pai ou subcategoria)
  const category = await getCategoryBySlug(lastSlug);

    console.log("➡️ Categoria encontrada:", category); // LOG 2

  if (!category) {
    return <div className="p-10 text-center text-red-500">Categoria não encontrada.</div>;
  }

  const products = await getProductsByCategory(category.id);

  console.log("📦 Produtos carregados:", products.length); // LOG 4

  return (
    <ShopWithSidebar
      category={category}
      products={products}
    />
  );
}

// METADATA DINÂMICA PARA SEO
export async function generateMetadata(props: { params: Promise<{ url: string[] }> }) {

  const { url } = await props.params;

  const lastSlug = url[url.length - 1];
  const category = await getCategoryBySlug(lastSlug);

  if (!category) return {};

  return {
    title: `${category.meta_title ?? category.name} | Minha Loja`,
    description: category.meta_description ?? `Produtos da categoria ${category.name}`,
    openGraph: {
      title: category.meta_title,
      description: category.meta_description,
    }
  };
}
