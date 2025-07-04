// import { serverApi } from "@/lib/serverApi";
// import { IBlog, IResponse } from "@/types";
import BlogListItem from "./BlogListItem";
import { wordpressApi } from "@/lib/wordpressApi";

interface IProps {
  // keywords: string;
  current_blog_id: number;
  categories: number[];
}

export default async function RelatedBlogs({
  // keywords,
  current_blog_id,
  categories,
}: IProps) {
  // const api = await serverApi();

  // const { data: relatedBlogList } = await api.get<IResponse<IBlog[]>>(
  //   "/api/v1/website/blogs/related?keywords=" +
  //     keywords +
  //     "&current_blog_id=" +
  //     current_blog_id
  // );

  const api = await wordpressApi();

  const response = await api.get(
    `/wp-json/wp/v2/posts?categories=${categories.join(
      ","
    )}&_fields=id,title,slug,excerpt,date,yoast_head_json&exclude=${current_blog_id}&per_page=12`
  );

  if (response.data.length === 0)
    return (
      <h2 className="text-center text-sm text-gray-600">
        No Related Blogs Has Found
      </h2>
    );

  return (
    <ul className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
      {response.data.map((blog: any) => (
        <BlogListItem key={blog.id} blog={blog} />
      ))}
    </ul>
  );
}
