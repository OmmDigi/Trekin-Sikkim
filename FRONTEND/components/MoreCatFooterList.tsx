import api from "@/lib/axios";
import { ICategories, IResponse } from "@/types";
import React from "react";
import CustomLink from "./CustomLink";

export default async function MoreCatFooterList() {
  const categories: ICategories[] = [];

  try {
    const response = await (
      await api.get<IResponse<ICategories[]>>(
        "/api/v1/category?add_to_footer=true&category_type=4"
      )
    ).data;
    if (response.data) {
      categories.push(...response.data);
    }
  } catch {}
  return (
    <ul className="grid grid-cols-4 max-sm:grid-cols-2">
      {categories.map((item) => (
        <li
          key={item.category_id}
          className="max-sm:flex max-sm:items-center max-sm:justify-center"
        >
          <CustomLink
            className="text-sm underline text-white flex items-center"
            href={`/${item.slug}`}
          >
            {item.category_name}
          </CustomLink>
        </li>
      ))}
    </ul>
  );
}
