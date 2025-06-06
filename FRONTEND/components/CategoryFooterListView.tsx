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
        <CustomLink
          key={index}
          className="text-sm text-secondary block"
          href={categorie.slug ?? "#"}
        >
          {/* {categorie.icon ? (
                          <span className="float-left mr-2 mt-[1px]">
                            {categorie.icon}
                          </span>
                        ) : null} */}

          <span>{categorie.category_name}</span>
        </CustomLink>
      ))}
    </ul>
  );
}
