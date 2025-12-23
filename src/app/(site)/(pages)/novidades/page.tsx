import React from "react";
import NovidadesPageContent from "@/components/Novidades/NovidadesPageContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novidades | Loja",
  description: "Confira os produtos mais recentes",
};

const NovidadesPage = () => {
  return (
    <main>
      <NovidadesPageContent />
    </main>
  );
};

export default NovidadesPage;