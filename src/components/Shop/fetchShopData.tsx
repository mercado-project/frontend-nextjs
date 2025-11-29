import { Product } from "@/types/product";

export async function fetchShopData(limit: number = 8): Promise<Product[]> {
  const res = await fetch(`http://localhost:3002/products?limit=${limit}`);
  const data = await res.json();

  return data.map((prod: any) => {
    const price = prod.prices?.length ? Number(prod.prices[0].price) : 0;

    const discounted =
      prod.promotions?.length && prod.promotions[0].promotionalPrice
        ? Number(prod.promotions[0].promotionalPrice)
        : null;

    // imagens principais e secundárias
    const mainImages =
      prod.images?.filter((img: any) => img.is_main) ?? [];

    const secondaryImages =
      prod.images?.filter((img: any) => !img.is_main) ?? [];

    return {
      id: prod.id,
      title: prod.name,
      reviews: 0, // Backend não envia reviews
      price: price,
      discountedPrice: discounted ?? price, // se não tiver promoção, mantém o preço normal
      imgs: {
        thumbnails: secondaryImages.map((img: any) => img.image_url),
        previews: mainImages.map((img: any) => img.image_url),
      },
    } as Product;
  });
}
