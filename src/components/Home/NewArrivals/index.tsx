"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type ProductCard = {
  id: number;
  title: string;
  url: string;
  image: string;
  discountedPrice: number;
  reviews: number;
  price: number;
};

const NewArrival = () => {
  const [products, setProducts] = useState<ProductCard[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:3002/products?limit=8");
      const data = await res.json();

      const mapped = data.map((prod: any) => {
        const mainImg =
          prod.images?.find((img: any) => img.is_main)?.image_url ??
          prod.images?.[0]?.image_url ??
          "/images/no-image.png";

        return {
          id: prod.id,
          title: prod.name,
          url: prod.url, // rota dinâmica!
          image: mainImg,
          discountedPrice: prod.promo,
          reviews: 0,
          price: prod.price
        };
      });

      setProducts(mapped);
    }

    load();
  }, []);

  return (
    <section className="overflow-hidden pt-15 bg-[#F6F7FB]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

        {/* Cabeçalho */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11826 15.4622C4.11794 16.6668 5.97853 16.6668 9.69971 16.6668H10.3007C14.0219 16.6668 15.8825 16.6668 16.8821 15.4622M3.11826 15.4622C2.11857 14.2577 2.46146 12.429 3.14723 8.77153C3.63491 6.17055 3.87875 4.87006 4.8045 4.10175M3.11826 15.4622C3.11826 15.4622 3.11826 15.4622 3.11826 15.4622ZM16.8821 15.4622C17.8818 14.2577 17.5389 12.429 16.8532 8.77153C16.3655 6.17055 16.1216 4.87006 15.1959 4.10175M16.8821 15.4622C16.8821 15.4622 16.8821 15.4622 16.8821 15.4622ZM15.1959 4.10175C14.2701 3.33345 12.947 3.33345 10.3007 3.33345H9.69971C7.0534 3.33345 5.73025 3.33345 4.8045 4.10175M15.1959 4.10175C15.1959 4.10175 15.1959 4.10175 15.1959 4.10175ZM4.8045 4.10175C4.8045 4.10175 4.8045 4.10175 4.8045 4.10175Z"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.64258 6.66678C7.98578 7.63778 8.91181 8.33345 10.0003 8.33345C11.0888 8.33345 12.0149 7.63778 12.3581 6.66678"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Produtos
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Novidades
            </h2>
          </div>

          <Link
            href="/shop-with-sidebar"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            Ver Todos
          </Link>
        </div>

        {/* Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {products.map((item) => (
            <Link
              key={item.id}
              href={`/${item.url}`}
              className="block"
            >
              <div className="shadow-testimonial bg-white text-center p-3 hover:shadow-lg transition">
                
                {/* Wrapper com altura fixa */}
                <div className="w-full h-[200px] relative overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-3 text-dark font-medium text-sm">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewArrival;
