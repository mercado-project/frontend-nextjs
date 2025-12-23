"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";

type ImageType = {
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
  images?: ImageType[];
  promotions?: Promotion[];
  prices?: Price[];
};

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  const dispatch = useDispatch<AppDispatch>();
  const images = product.images ?? [];

  /* ==========================
   * IMAGEM PRINCIPAL (SEGURA)
   * ========================== */
  const initialMainImage =
    images.find((img) => img.is_main)?.image_url ||
    images[0]?.image_url ||
    "";

  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    setActiveImage(initialMainImage);
  }, [initialMainImage]);

  const thumbnails = images.filter(
    (img) => img.image_url !== activeImage
  );

  /* ==========================
   * PREÇOS
   * ========================== */
  const basePrice = Number(product.prices?.[0]?.price ?? 0);
  const promo = product.promotions?.find((p) => p.active);
  const finalPrice = promo ? Number(promo.promotionalPrice) : basePrice;

  /* ---------------- ADD TO CART ---------------- */
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...product,
        price: finalPrice,
        discountedPrice: promo ? finalPrice : 0,
        quantity: 1,
      })
    );
  };

  return (
    <>
      <Breadcrumb
        title={product.name}
        pages={[product.category?.name ?? "Categoria", product.name]}
      />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ==========================
              GALERIA
              ========================== */}
            <div className="w-full lg:w-1/2">
              <div className="flex gap-4">

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex flex-col gap-3">
                    {images.map((img, index) => {
                      const isActive = img.image_url === activeImage;

                      return (
                        <button
                          key={index}
                          onClick={() => setActiveImage(img.image_url)}
                          className={`border rounded-md p-1 transition
                            ${isActive
                              ? "border-blue ring-2 ring-blue/40"
                              : "border-gray-300 hover:border-blue"
                            }`}
                        >
                          <img
                            src={img.image_url}
                            alt="thumbnail"
                            className="w-[70px] h-[70px] object-contain"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Imagem principal */}
                <div className="flex-1 bg-white rounded-[10px] shadow-1 p-6 flex items-center justify-center">
                  {activeImage ? (
                    <img
                      src={activeImage}
                      alt={product.name}
                      className="w-full h-[450px] object-contain"
                    />
                  ) : (
                    <div className="w-full h-[450px] flex items-center justify-center text-gray-400">
                      Imagem indisponível
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ==========================
               INFORMAÇÕES
               ========================== */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl sm:text-4xl font-semibold text-dark mb-4">
                {product.name}
              </h1>

              <p className="text-dark-4 text-lg leading-relaxed mb-6">
                <b>Marca:</b> {product.brand} <br />
                <b>SKU:</b> {product.sku}
              </p>

              <div className="mb-8">
                {promo && (
                  <p className="text-xl font-medium text-red-500 line-through">
                    R$ {basePrice.toFixed(2)}
                  </p>
                )}

                <p className="text-3xl font-bold text-blue">
                  R$ {finalPrice.toFixed(2)}
                </p>
              </div>
              {/* BOTÃO ADD TO CART */}
              <button
                onClick={handleAddToCart}
                className="w-full max-w-[250px] font-medium text-white bg-blue py-3 px-6 rounded-md hover:bg-blue-dark"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>

          {/* ==========================
             DESCRIÇÃO
             ========================== */}
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
