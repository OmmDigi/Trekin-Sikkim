// import { serverApi } from "@/lib/serverApi";
// import { IBlog, IResponse } from "@/types";
import React from "react";
import BlogListItem from "./BlogListItem";
// import Pagination from "../Pagination";
import Pagination from "../Pagination";
import { wordpressApi } from "@/lib/wordpressApi";
import { IBlogList } from "@/types";

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
  const response = await api.get<IBlogList[]>(
    `/wp-json/custom/v1/posts?page=${currentPage}&per_page=12`
  );
  const blogList = response.data;
  const totlaPages = Number(response.headers["x-wp-totalpages"]);

  return (
    <>
      <ul className="grid grid-cols-4 gap-5 gap-y-10 max-sm:grid-cols-1">
        {/* {blogList.data.map((blog: any) => (
          <BlogListItem key={blog.blog_id} blog={blog} />
        ))} */}

        {blogList.map((blog) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </ul>

      <Pagination page={currentPage} totalPage={totlaPages} />
    </>
  );
}
