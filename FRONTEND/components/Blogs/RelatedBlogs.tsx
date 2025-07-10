// import { serverApi } from "@/lib/serverApi";
// import { IBlog, IResponse } from "@/types";
import { IBlogList } from "@/types";
import BlogListItem from "./BlogListItem";
import { wordpressApi } from "@/lib/wordpressApi";
import Carousel from "../Utils/Carousel";
import { ChevronRight } from "lucide-react";

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

  // const response = await api.get(
  //   `/wp-json/wp/v2/posts?categories=${categories.join(
  //     ","
  //   )}&_fields=id,title,slug,excerpt,date,yoast_head_json,meta&exclude=${current_blog_id}&per_page=12`
  // );

  const response = await api.get<IBlogList[]>(
    `/wp-json/custom/v1/posts?categories=${categories.join(
      ", "
    )}&exclude=${current_blog_id}&per_page=12`
  );

  if (response.data.length === 0)
    return (
      <h2 className="text-center text-sm text-gray-600">
        No Related Blogs Has Found
      </h2>
    );

  return (
    <section className="relative">
      <Carousel
        className="pb-60"
        item={{
          className: "pb-9",
          itemToRender: response.data.map((item) => ({
            id: item.id,
            content: <BlogListItem blog={item} />,
          })),
        }}
        buttons={{
          next: {
            component: (
              <span className="inline-flex size-10 bg-green-200 items-center justify-center">
                <ChevronRight />
              </span>
            ),
            className:
              "absolute cursor-pointer top-0 bottom-0 -right-14 flex items-center justify-center",
          },

          prev: {
            component: (
              <span className="inline-flex size-10 bg-green-200 items-center justify-center">
                <ChevronRight className="rotate-180" />
              </span>
            ),
            className:
              "absolute cursor-pointer top-0 bottom-0 -left-14 flex items-center justify-center",
          },
        }}
      />
    </section>
  );
}
