"use client";

import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CustomSelect from "./CustomSelect";
import CategoryDropdown from "./CategoryDropdown";
import GenderDropdown from "./GenderDropdown";
import SizeDropdown from "./SizeDropdown";
import ColorsDropdwon from "./ColorsDropdwon";
import PriceDropdown from "./PriceDropdown";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";

export default function ShopWithSidebar({ category, products }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productStyle, setProductStyle] = useState<"grid" | "list">("grid");

  // Exemplo de categorias, genders, etc. — substitua depois pelos dados reais  
  const categories = [
    { id: 1, name: "Roupas" },
    { id: 2, name: "Tênis" },
    { id: 3, name: "Acessórios" },
  ];

  const genders = ["Male", "Female", "Unisex"];

  const options = [
    { label: "Sort by Latest", value: "latest" },
    { label: "Sort by Price (Low to High)", value: "low" },
    { label: "Sort by Price (High to Low)", value: "high" },
  ];

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <>
      <Breadcrumb
        title={category?.name ?? "Explore Products"}
        pages={[category?.name]}
      />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">

            {/* SIDEBAR */}
            <div
              className={`fixed xl:static left-0 top-0 z-50 xl:z-auto max-w-[300px] w-full bg-white shadow-xl xl:shadow-none p-5 xl:p-0 h-full xl:h-auto
                transform xl:transform-none transition-transform duration-300 
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}`}
            >
              {/* Botão fechar mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="xl:hidden mb-4 text-sm text-blue"
              >
                Close Filters ✕
              </button>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-6">
                  {/* Filter top box */}
                  <div className="bg-white shadow rounded-lg py-4 px-5">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Filters</p>
                      <button
                        className="text-blue text-sm"
                        onClick={() => setFilteredProducts(products)}
                      >
                        Clean All
                      </button>
                    </div>
                  </div>

                  {/* Dropdowns */}
                  <CategoryDropdown categories={categories} />
                  {/* <GenderDropdown genders={genders} />
                  <SizeDropdown />
                  <ColorsDropdwon /> */}
                  <PriceDropdown />
                </div>
              </form>
            </div>

            {/* CONTEÚDO PRINCIPAL */}
            <div className="flex-1">

              {/* Botão abrir sidebar no mobile */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="xl:hidden mb-6 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Filters
              </button>

              <div className="rounded-lg bg-white shadow pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">

                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <CustomSelect options={options} />
                    <p className="text-sm">
                      Showing <span className="text-dark">{filteredProducts.length}</span> Products
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setProductStyle("grid")}
                      className={`px-3 py-2 rounded border ${
                        productStyle === "grid" ? "bg-blue text-white" : "bg-gray-200"
                      }`}
                    >
                      Grade
                    </button>

                    <button
                      onClick={() => setProductStyle("list")}
                      className={`px-3 py-2 rounded border ${
                        productStyle === "list" ? "bg-blue text-white" : "bg-gray-200"
                      }`}
                    >
                      Lista
                    </button>
                  </div>
                </div>
              </div>

              {/* GRID / LIST PRODUCTS */}
              <div>
                {productStyle === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* {products.map((product) => (
                      <SingleGridItem key={product.id} item={product} />
                    ))} */}

                    {filteredProducts.map((product) => (
                      <SingleGridItem key={product.id} item={product} />
                    ))}
                    
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {filteredProducts.map((product) => (
                      <SingleListItem key={product.id} item={product} />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
