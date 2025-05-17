import { serverApi } from "@/lib/serverApi";
import { IBlog, IResponse } from "@/types";
import BlogListItem from "./BlogListItem";

interface IProps {
  keywords: string;
  current_blog_id: number;
}

export default async function RelatedBlogs({
  keywords,
  current_blog_id,
}: IProps) {
  const api = await serverApi();

  const { data: relatedBlogList } = await api.get<IResponse<IBlog[]>>(
    "/api/v1/website/blogs/related?keywords=" +
      keywords +
      "&current_blog_id=" +
      current_blog_id
  );

  if (relatedBlogList.data.length === 0)
    return (
      <h2 className="text-center text-sm text-gray-600">
        No Related Blogs Has Found
      </h2>
    );

  return (
    <ul className="grid grid-cols-4 gap-5 max-sm:grid-cols-1">
      {relatedBlogList.data.map((blog) => (
        <BlogListItem key={blog.blog_id} blog={blog} />
      ))}
    </ul>
  );
}
