import ShopWithSidebar from "@/components/ShopWithSidebar";
import { searchProducts } from "@/lib/api";

interface SearchPageProps {
  searchParams: Promise<{
    w?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.w ?? "";

  if (!query) {
    return (
      <div className="p-10 text-center">
        Digite algo para buscar produtos.
      </div>
    );
  }

  const products = await searchProducts(query);

  return (
    <ShopWithSidebar
      category={{ name: `Resultados para "${query}"` }}
      products={products}
    />
  );
}

