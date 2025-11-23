"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";

const Product = () => {
  const product = {
    name: "Super Smartphone X Ultra Max 2025",
    description:
      "Um smartphone de última geração com câmera quádrupla, bateria de 6000mAh e processador de alto desempenho.",
    image: "/images/products/sample-big.jpg",
    price: 2599.9,
  };

  return (
    <>
      <Breadcrumb title={product.name} pages={["Home", "Categoria", product.name]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Imagem do produto */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-[10px] shadow-1 p-6 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full rounded-md"
                />
              </div>
            </div>

            {/* Informações do produto */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl sm:text-4xl font-semibold text-dark mb-4">
                {product.name}
              </h1>

              <p className="text-dark-4 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              <p className="text-3xl font-bold text-blue mb-8">R$ {product.price}</p>

              <button className="w-full max-w-[250px] font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>

          {/* Descrição detalhada */}
          <div className="mt-16 bg-white rounded-[10px] shadow-1 p-6 sm:p-10">
            <h2 className="text-2xl font-medium text-dark mb-4">Descrição Completa</h2>
            <p className="text-dark-4 leading-relaxed text-base">
              Este é um texto fictício apenas para demonstração do layout da página
              de produto. Aqui você pode colocar detalhes completos, especificações,
              tabela técnica, reviews ou qualquer outro conteúdo relevante.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;

