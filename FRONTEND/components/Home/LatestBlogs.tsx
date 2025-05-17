import React from "react";
import BlogListItem from "../Blogs/BlogListItem";
import { serverApi } from "@/lib/serverApi";
import { IBlog, IResponse } from "@/types";

export default async function LatestBlogs() {
  const api = await serverApi();

  const { data: blogs } = await api.get<IResponse<IBlog[]>>(
    "/api/v1/website/blogs?limit=4"
  );

  return (
    <ul className="grid grid-cols-4 gap-5 max-sm:grid-cols-1">
      {blogs.data.map((blog) => (
        <BlogListItem key={blog.blog_id} blog={blog} />
      ))}
    </ul>
  );
}
