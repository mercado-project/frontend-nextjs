// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Breadcrumb from "../../components/Common/Breadcrumb";

// export default function ProductPage() {
//   const { url } = useParams(); // pega /samsung-tv da rota
//   const [product, setProduct] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadProduct() {
//       try {
//         const res = await fetch(`http://localhost:3002/products/url/${url}`);
//         const data = await res.json();

//         setProduct(data);
//       } catch (err) {
//         console.error("Erro ao carregar produto:", err);
//       } finally {
//         setLoading(true);
//       }
//     }

//     loadProduct();
//   }, [url]);

//   if (!product) {
//     return <p className="p-10 text-lg">Carregando produto...</p>;
//   }

//   return (
//     <>
//       <Breadcrumb
//         title={product.name}
//         pages={["Home", product.category?.name || "Produto", product.name]}
//       />

//       <section className="overflow-hidden py-20 bg-gray-2">
//         <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
//           <div className="flex flex-col lg:flex-row gap-10">
//             {/* Imagem */}
//             <div className="w-full lg:w-1/2">
//               <div className="bg-white rounded-[10px] shadow-1 p-6 flex items-center justify-center">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="max-w-full rounded-md"
//                 />
//               </div>
//             </div>

//             {/* Informações */}
//             <div className="w-full lg:w-1/2">
//               <h1 className="text-3xl sm:text-4xl font-semibold text-dark mb-4">
//                 {product.name}
//               </h1>

//               <p className="text-dark-4 text-lg leading-relaxed mb-6">
//                 {product.description}
//               </p>

//               <p className="text-3xl font-bold text-blue mb-8">
//                 R$ {product.price}
//               </p>

//               <button className="w-full max-w-[250px] font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark">
//                 Adicionar ao Carrinho
//               </button>
//             </div>
//           </div>

//           {/* Descrição Completa */}
//           <div className="mt-16 bg-white rounded-[10px] shadow-1 p-6 sm:p-10">
//             <h2 className="text-2xl font-medium text-dark mb-4">
//               Descrição Completa
//             </h2>

//             <p className="text-dark-4 leading-relaxed text-base">
//               {product.longDescription ||
//                 "Este produto ainda não possui uma descrição completa."}
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


import Product from "@/components/Product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextCommerce | Nextjs E-commerce template",
  description: "This is Home for NextCommerce Template",
  // other metadata
};

export default function ProductPage() {
  return (
    <>
      <Product />
    </>
  );
}




