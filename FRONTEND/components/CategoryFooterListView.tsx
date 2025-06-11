import api from "@/lib/axios";
import { ICategories, IResponse } from "@/types";
import React from "react";
import CustomLink from "./CustomLink";

export default async function CategoryFooterListView() {
  const { data: categories } = await api.get<IResponse<ICategories[]>>(
    "/api/v1/category"
  );

  return (
    <ul className="space-y-4">
      {categories.data.map((categorie, index) => (
        <li key={index}>
          <CustomLink
            className="text-sm text-secondary block"
            href={categorie.slug ?? "#"}
          >
            <span>{categorie.category_name}</span>
          </CustomLink>
        </li>
      ))}
    </ul>
  );
}
