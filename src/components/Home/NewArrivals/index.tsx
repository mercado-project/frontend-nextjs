"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SingleGridItem from "../../Shop/SingleGridItem";

const NewArrival = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("http://localhost:3002/products?limit=8");
      const data = await res.json();
      setProducts(data);
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
              Produtos
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Novidades
            </h2>
          </div>

          <Link
            href="/novidades"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            Ver Todos
          </Link>
        </div>

        {/* Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {products.map((item) => (
            <SingleGridItem key={item.id} item={item} />
          ))}
        </div>

      </div>
      <br />
    </section>
  );
};

export default NewArrival;
