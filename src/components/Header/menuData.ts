import { Menu } from "@/types/Menu";

export async function menuData(): Promise<Menu[]> {
  const url = "http://localhost:3002/categories/menu"; // sua API

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar categorias do menu.");
  }

  const apiData = await res.json();

  const formatted: Menu[] = apiData.map((cat: any) => ({
    id: cat.id,
    title: cat.name,
    newTab: false,
    path: cat.url ? `/categorias/${cat.url}` : "/",
    submenu:
      cat.children?.map((sub: any) => ({
        id: sub.id,
        title: sub.name,
        newTab: false,
        path: sub.url ? `/categorias/${cat.url}/${sub.url}` : "/",
      })) || [],
  }));

  return formatted;
}
