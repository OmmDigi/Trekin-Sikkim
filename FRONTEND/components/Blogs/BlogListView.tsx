// import { serverApi } from "@/lib/serverApi";
// import { IBlog, IResponse } from "@/types";
import React from "react";
import BlogListItem from "./BlogListItem";
// import Pagination from "../Pagination";
import Pagination from "../Pagination";
import { wordpressApi } from "@/lib/wordpressApi";

interface IProps {
  searchParams: { page?: string };
}

export default async function BlogListView({ searchParams }: IProps) {
  const api = await wordpressApi();

  // const blogList = (
  //   await api.get<IResponse<IBlog[]>>(
  //     `/api/v1/website/blogs?page=${parseInt(searchParams?.page || "1")}&limit=12`
  //   )
  // ).data;

  const currentPage = parseInt(searchParams?.page || "1");

  const response = await api.get(
    `/wp-json/wp/v2/posts?_fields=id,title,slug,excerpt,date,yoast_head_json,meta&per_page=12&page=${currentPage}`
  );
  const blogList = response.data;
  const totlaPages = Number(response.headers["x-wp-totalpages"]);

  return (
    <>
      <ul className="grid grid-cols-4 gap-5 gap-y-10 max-sm:grid-cols-1">
        {/* {blogList.data.map((blog: any) => (
          <BlogListItem key={blog.blog_id} blog={blog} />
        ))} */}

        {blogList.map((blog: any) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </ul>

      <Pagination page={currentPage} totalPage={totlaPages} />
    </>
  );
}
