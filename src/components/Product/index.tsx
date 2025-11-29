"use client";

import Breadcrumb from "../Common/Breadcrumb";

type Image = {
  image_url: string;
  is_main: boolean;
};

type Promotion = {
  active: boolean;
  promotionalPrice: number;
};

type Price = {
  price: number;
};

export type ProductType = {
  name: string;
  sku: string;
  brand: string;
  description?: string;
  category?: { name: string };
  images?: Image[];
  promotions?: Promotion[];
  prices?: Price[];
};

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {

    const mock = {
    info:
      "Produto Congelado Produto Sensivel"
  };

  const mainImage =
    product.images?.find((img) => img.is_main)?.image_url ||
    product.images?.[0]?.image_url ||
    "/images/products/sample-big.jpg";

  const basePrice = product.prices?.[0]?.price ?? 0;

  const promo = product.promotions?.find((p) => p.active);
  const finalPrice = promo ? promo.promotionalPrice : basePrice;

  return (
    <>
      <Breadcrumb
        title={product.name}
        pages={["Home", product.category?.name ?? "Categoria", product.name]}
      />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* Imagem */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-[10px] shadow-1 p-6 flex items-center justify-center">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="max-w-full rounded-md"
                />
              </div>
            </div>

            {/* Infos */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl sm:text-4xl font-semibold text-dark mb-4">
                {product.name}
              </h1>

              <p className="text-dark-4 text-lg leading-relaxed mb-6">
                Marca: {product.brand} <br />
                SKU: {product.sku} <br />
                {mock.info}
              </p>

              <div className="mb-8">
                {promo && (
                  <p className="text-xl font-medium text-red-500 line-through">
                    R$ {Number(basePrice).toFixed(2)}
                  </p>
                )}

                <p className="text-3xl font-bold text-blue">
                  R$ {Number(finalPrice).toFixed(2)}
                </p>
              </div>

              <button className="w-full max-w-[250px] font-medium text-white bg-blue py-3 px-6 rounded-md hover:bg-blue-dark">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-[10px] shadow-1 p-6 sm:p-10">
            <h2 className="text-2xl font-medium text-dark mb-4">
              Descrição Completa
            </h2>

            <p className="text-dark-4 leading-relaxed text-base">
              {product.description || "Sem descrição disponível."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
