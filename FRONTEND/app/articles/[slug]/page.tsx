import RelatedBlogs from "@/components/Blogs/RelatedBlogs";
import HeadingSubHeding from "@/components/HeadingSubHeding";
import Loading from "@/components/Loading";
import { serverApi } from "@/lib/serverApi";
import { IResponse, ISingleBlog } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import React, { cache } from "react";

const getSingleBlogInfo = cache(async (slug: string) => {
  const api = await serverApi();
  return (
    await api.get<IResponse<ISingleBlog>>(`/api/v1/website/blogs/${slug}`)
  ).data;
});

interface IProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ["slug"]: string }>;
}): Promise<Metadata> {
  const blogSlug = (await params)["slug"];
  const categoryPageInfo = await getSingleBlogInfo(blogSlug);
  return {
    title: categoryPageInfo.data.meta_title,
    description: categoryPageInfo.data.meta_description,
    keywords: categoryPageInfo.data.meta_keywords,
    alternates: {
      canonical: categoryPageInfo.data.meta_canonical_url,
    },
    openGraph: {
      title: categoryPageInfo.data.meta_title,
      description: categoryPageInfo.data.meta_description,
      images: [
        categoryPageInfo?.data?.thumbnail || "/placeholder_background.jpg",
      ],
      url: `/articles/${blogSlug}`,
      type: "website",
      locale: "en_US",
      siteName: "Glacier Treks And Adventure",
    },
  };
}

export default async function page({ params }: IProps) {
  const { slug } = await params;

  const singleBlog = await getSingleBlogInfo(slug);

  return (
    <main className="wrapper space-y-10 py-10 pt-28">
      <div className="aspect-[3.17/1] font-montserrat w-full overflow-hidden max-sm:aspect-video rounded-3xl relative">
        <Image
          className="size-full object-cover"
          src={singleBlog.data.thumbnail}
          alt="Blog 1"
          height={1200}
          width={1200}
        />
        <span className="hidden">{slug}</span>
        <div className="absolute inset-0 fade-gradient-bottom flex flex-col justify-end p-10">
          <h1 className="font-semibold text-2xl text-white">
            {singleBlog.data.heading}
          </h1>
          <h2 className="text-sm text-gray-200 line-clamp-2">
            {singleBlog.data.meta_description}
          </h2>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: singleBlog.data.blog_content }}
        className="leading-8 tracking-wider text-sm font-primary space-y-8 bg-light-gray rounded-4xl p-10 pt-10 pb-10 max-sm:pb-8 max-sm:space-y-8 max-sm:px-2.5 max-sm:bg-transparent max-sm:pt-3.5"
      >
        {/* <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
          accusamus suscipit. Nemo earum necessitatibus reprehenderit dicta nam
          distinctio, quo iste tempore, perspiciatis laudantium libero
          blanditiis neque molestiae veritatis harum rem!Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Aliquid, accusamus suscipit. Nemo
          earum necessitatibus reprehenderit dicta nam distinctio, quo iste
          tempore, perspiciatis laudantium libero blanditiis neque molestiae
          veritatis harum rem!Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Aliquid, accusamus suscipit. harum rem!
        </p>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
          accusamus suscipit. Nemo earum necessitatibus reprehenderit dicta nam
          distinctio, quo iste tempore, perspiciatis laudantium libero
          blanditiis neque molestiae veritatis harum rem!Lorem ipsum dolor, sit
          amet consectetur adipisicing elit.
        </p>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
          accusamus suscipit. Nemo earum necessitatibus reprehenderit dicta nam
          distinctio, quo iste tempore, perspiciatis laudantium libero
          blanditiis neque molestiae veritatis harum rem!Lorem ipsum dolor, sit
          amet consectetur adipisicing elit. Aliquid, accusamus suscipit. Nemo
          earum necessitatibus reprehenderit dicta nam distinctio, quo iste
          tempore, perspiciatis laudantium libero blanditiis neque molestiae
          veritatis harum rem!Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Aliquid, accusamus suscipit. harum rem!
        </p>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid,
          accusamus suscipit. Nemo earum necessitatibus reprehenderit dicta nam
          distinctio, quo iste tempore, perspiciatis laudantium libero
          blanditiis neque molestiae veritatis harum rem!Lorem ipsum dolor, sit
          amet consectetur adipisicing elit.
        </p> */}
      </div>

      {/* <div className="flex items-center justify-between">
        <button className="flex items-center gap-2.5 hover:bg-[#ffd2308c] px-3 cursor-pointer">
          <Image
            className="-rotate-90"
            src={"/icons/back_btn.svg"}
            alt="Back Btn Icons"
            height={40}
            width={40}
          />
          <span className="font-semibold text-sm">Previous Article</span>
        </button>

        <button className="flex items-center gap-2.5 hover:bg-[#ffd2308c] px-3 cursor-pointer">
          <span className="font-semibold text-sm">Next Article</span>
          <Image
            className="rotate-90"
            src={"/icons/back_btn.svg"}
            alt="Back Btn Icons"
            height={40}
            width={40}
          />
        </button>
      </div> */}

      {/* <BlogComments /> */}

      <div className="font-primary space-y-8">
        <HeadingSubHeding heading="Related Articles" />

        <React.Suspense fallback={<Loading />}>
          <RelatedBlogs
            keywords={singleBlog.data.meta_keywords}
            current_blog_id={singleBlog.data.blog_id}
          />
        </React.Suspense>
      </div>

      {/* <div className="font-primary space-y-8">
        <HeadingSubHeding heading="Our Upcoming Trek" />

        <UpcommingPackages />
      </div> */}
    </main>
  );
}
