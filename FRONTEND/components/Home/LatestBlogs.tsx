import React from "react";
import BlogListItem from "../Blogs/BlogListItem";
// import { serverApi } from "@/lib/serverApi";
// import { IBlog, IResponse } from "@/types";
import { wordpressApi } from "@/lib/wordpressApi";

export default async function LatestBlogs() {
  // const api = await serverApi();

  const api = await wordpressApi();

  // const { data: blogs } = await api.get<IResponse<IBlog[]>>(
  //   "/api/v1/website/blogs?limit=4"
  // );

  const response = await api.get(
    `/wp-json/wp/v2/posts?_fields=id,title,slug,excerpt,date,yoast_head_json,meta&per_page=4`
  );
  const blogs = response.data;
  // const totlaPages = Number(response.headers["x-wp-totalpages"]);

  return (
    <ul className="grid grid-cols-4 gap-5 max-sm:grid-cols-1">
      {blogs.map((blog: any) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </ul>
  );
}
