import { notFound } from "next/navigation";
import Product from "@/components/Product";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ url: string }>;
}

async function getProduct(url: string) {
  try {
    const res = await fetch(`http://localhost:3002/products/url/${url}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

export async function generateMetadata({ params }): Promise<Metadata> {

  const { url } = await params; // 👍 obrigatório no Next 14/15

  const product = await getProduct(url);

  if (!product) {
    return {
      title: "Produto não encontrado",
      description: "O produto solicitado não foi encontrado.",
    };
  }

  return {
    title: product.meta_title || product.name,
    description: product.meta_description || product.description,

    // 🔥 Boas práticas para SEO
    openGraph: {
      title: product.meta_title || product.name,
      description: product.meta_description || product.description,
      images: product.images?.map((img: any) => img.image_url) || []
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { url } = await params; // 👍 obrigatório no Next 14/15

  const product = await getProduct(url);

  if (!product) {
    notFound(); // 👍 manda para /not-found automaticamente
  }

  return <Product product={product} />;
}
