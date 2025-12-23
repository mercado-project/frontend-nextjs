"use client";

import React, { useEffect, useState } from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

export default function NovidadesPageContent() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("http://localhost:3002/products?limit=12");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar novidades", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1170px] mx-auto px-4 py-20 text-center">
        Carregando produtos...
      </div>
    );
  }

  return (
    <ShopWithSidebar
      category={{ name: "Novidades" }}
      products={products}
    />
  );
}
