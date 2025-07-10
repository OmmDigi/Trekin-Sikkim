import React from "react";
import BlogListItem from "../Blogs/BlogListItem";
// import { serverApi } from "@/lib/serverApi";
// import { IBlog, IResponse } from "@/types";
import { wordpressApi } from "@/lib/wordpressApi";
import { IBlogList } from "@/types";

export default async function LatestBlogs() {
  // const api = await serverApi();

  const api = await wordpressApi();

  // const { data: blogs } = await api.get<IResponse<IBlog[]>>(
  //   "/api/v1/website/blogs?limit=4"
  // );

  const response = await api.get<IBlogList[]>(
    `/wp-json/custom/v1/posts?per_page=4`
  );
  
  return (
    <ul className="grid grid-cols-4 gap-5 max-sm:grid-cols-1">
      {response.data.map((blog) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </ul>
  );
}
