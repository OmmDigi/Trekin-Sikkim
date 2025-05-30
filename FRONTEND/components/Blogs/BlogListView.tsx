import { serverApi } from "@/lib/serverApi";
import { IBlog, IResponse } from "@/types";
import React from "react";
import BlogListItem from "./BlogListItem";
import Pagination from "../Pagination";

interface IProps {
  searchParams: { page?: string };
}

export default async function BlogListView({ searchParams }: IProps) {
  const api = await serverApi();

  const blogList = (
    await api.get<IResponse<IBlog[]>>(
      `/api/v1/website/blogs?page=${parseInt(searchParams?.page || "1")}&limit=12`
    )
  ).data;

  return (
    <>
      <ul className="grid grid-cols-4 gap-5 gap-y-10 max-sm:grid-cols-1">
        {blogList.data.map((blog) => (
          <BlogListItem key={blog.blog_id} blog={blog} />
        ))}
      </ul>

      <Pagination
        page={parseInt(searchParams?.page || "1")}
        totalPage={blogList.totalPage}
      />
    </>
  );
}
