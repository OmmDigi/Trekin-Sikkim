// import RelatedBlogs from "@/components/Blogs/RelatedBlogs";
// import HeadingSubHeding from "@/components/HeadingSubHeding";
// import Loading from "@/components/Loading";
// import { serverApi } from "@/lib/serverApi";
// import { IResponse, ISingleBlog } from "@/types";
import { Metadata } from "next";
import Image from "next/image";
import React, { cache } from "react";
import "@/app/rich-text-content.css";
// import axios from "axios";
import { wordpressApi } from "@/lib/wordpressApi";
import HeadingSubHeding from "@/components/HeadingSubHeding";
import Loading from "@/components/Loading";
import RelatedBlogs from "@/components/Blogs/RelatedBlogs";
import BlogComments from "@/components/Blogs/BlogComments";
import { IBlogSearchParams } from "@/types";

const getSingleBlogInfo = cache(async (slug: string) => {
  // const api = await serverApi();
  // return (
  //   await api.get<IResponse<ISingleBlog>>(`/api/v1/website/blogs/${slug}`)
  // ).data;

  const api = await wordpressApi();
  return (await api.get(`/wp-json/wp/v2/posts?_embed&slug=${slug}`)).data[0];
});

interface IProps {
  params: Promise<{ slug: string }>;
  searchParams : Promise<IBlogSearchParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ["slug"]: string }>;
}): Promise<Metadata> {
  const blogSlug = (await params)["slug"];
  const categoryPageInfo = await getSingleBlogInfo(blogSlug);
  return {
    title: categoryPageInfo.yoast_head_json.title,
    description: categoryPageInfo.yoast_head_json.description,
    openGraph: {
      title: categoryPageInfo.yoast_head_json.og_title,
      description: categoryPageInfo.yoast_head_json.og_description,
      images: [
        categoryPageInfo?.yoast_head_json?.og_image[0]?.url ||
          "/placeholder_background.jpg",
      ],
      url: `/article/${blogSlug}`,
      type: categoryPageInfo.yoast_head_json.og_type,
      locale: "en_US",
      siteName: "Glacier Treks And Adventure",
    },
  };
  // return {
  //   title: categoryPageInfo.data.meta_title,
  //   description: categoryPageInfo.data.meta_description,
  //   keywords: categoryPageInfo.data.meta_keywords,
  //   alternates: {
  //     canonical: categoryPageInfo.data.meta_canonical_url,
  //   },
  //   openGraph: {
  //     title: categoryPageInfo.data.meta_title,
  //     description: categoryPageInfo.data.meta_description,
  //     images: [
  //       categoryPageInfo?.data?.thumbnail || "/placeholder_background.jpg",
  //     ],
  //     url: `/article/${blogSlug}`,
  //     type: "website",
  //     locale: "en_US",
  //     siteName: "Glacier Treks And Adventure",
  //   },
  // };
}

export default async function page({ params, searchParams }: IProps) {
  const { slug } = await params;

  const newSearchParams = (await searchParams);

  const singleBlog = await getSingleBlogInfo(slug);

  return (
    // <main className="wrapper py-10 space-y-5 pt-3.5">
    //   <div>
    //     <h1 className="font-semibold text-2xl">{singleBlog.data.heading}</h1>
    //     <h2 className="text-sm text-gray-600 line-clamp-2">
    //       {singleBlog.data?.sub_heading}
    //     </h2>
    //   </div>
    //   <div>
    //     <Image
    //       className="aspect-[4/1.8] object-cover rounded-3xl"
    //       src={singleBlog.data.thumbnail}
    //       alt="Blog 1"
    //       height={1200}
    //       width={1200}
    //     />
    //   </div>
    //   {/* <div className="aspect-[3.17/1] font-montserrat w-full overflow-hidden max-sm:aspect-video rounded-3xl relative">
    //     <Image
    //       className="size-full object-cover"
    //       src={singleBlog.data.thumbnail}
    //       alt="Blog 1"
    //       height={1200}
    //       width={1200}
    //     />
    //     <span className="hidden">{slug}</span>
    //     <div className="absolute inset-0 fade-gradient-bottom flex flex-col justify-end p-10">
    //       <h1 className="font-semibold text-2xl text-white">
    //         {singleBlog.data.heading}
    //       </h1>
    //       <h2 className="text-sm text-gray-200 line-clamp-2">
    //         {singleBlog.data.meta_description}
    //       </h2>
    //     </div>
    //   </div> */}

    //   <article
    //     className="rich-text-content"
    //     dangerouslySetInnerHTML={{ __html: singleBlog.data.blog_content }}
    //     // className="!prose leading-8 tracking-wider text-sm font-primary space-y-8 bg-light-gray rounded-4xl p-10 pt-10 pb-10 max-sm:pb-8 max-sm:space-y-8 max-sm:px-2.5 max-sm:bg-transparent max-sm:pt-3.5"
    //   ></article>

    //   {/* <div className="flex items-center justify-between">
    //     <button className="flex items-center gap-2.5 hover:bg-[#ffd2308c] px-3 cursor-pointer">
    //       <Image
    //         className="-rotate-90"
    //         src={"/icons/back_btn.svg"}
    //         alt="Back Btn Icons"
    //         height={40}
    //         width={40}
    //       />
    //       <span className="font-semibold text-sm">Previous Article</span>
    //     </button>

    //     <button className="flex items-center gap-2.5 hover:bg-[#ffd2308c] px-3 cursor-pointer">
    //       <span className="font-semibold text-sm">Next Article</span>
    //       <Image
    //         className="rotate-90"
    //         src={"/icons/back_btn.svg"}
    //         alt="Back Btn Icons"
    //         height={40}
    //         width={40}
    //       />
    //     </button>
    //   </div> */}

    //   {/* <BlogComments /> */}

    //   <div className="font-primary space-y-8">
    //     <HeadingSubHeding heading="Related Articles" />

    //     <React.Suspense fallback={<Loading />}>
    //       <RelatedBlogs
    //         keywords={singleBlog.data.meta_keywords}
    //         current_blog_id={singleBlog.data.blog_id}
    //       />
    //     </React.Suspense>
    //   </div>

    //   {/* <div className="font-primary space-y-8">
    //     <HeadingSubHeding heading="Our Upcoming Trek" />

    //     <UpcommingPackages />
    //   </div> */}
    // </main>
    <main className="max-w-4xl mx-auto py-10 space-y-5 pt-3.5">
      <div>
        <h1 className="font-semibold text-2xl">{singleBlog.title.rendered}</h1>
        <span
          dangerouslySetInnerHTML={{ __html: singleBlog.excerpt.rendered }}
          className="text-sm text-gray-600 line-clamp-2"
        ></span>
      </div>
      <div>
        <Image
          className="aspect-video object-cover rounded-3xl"
          src={
            singleBlog._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null
          }
          alt="Blog 1"
          height={1200}
          width={1200}
        />
      </div>

      <article
        className="rich-text-content"
        dangerouslySetInnerHTML={{ __html: singleBlog.content.rendered }}
        // className="!prose leading-8 tracking-wider text-sm font-primary space-y-8 bg-light-gray rounded-4xl p-10 pt-10 pb-10 max-sm:pb-8 max-sm:space-y-8 max-sm:px-2.5 max-sm:bg-transparent max-sm:pt-3.5"
      ></article>

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

      <React.Suspense fallback={<Loading />}>
        <BlogComments key={newSearchParams.comment_id} blog_id={singleBlog.id} searchParams={newSearchParams}/>
      </React.Suspense>

      <div className="font-primary space-y-8">
        <HeadingSubHeding heading="Related Articles" />

        <React.Suspense fallback={<Loading />}>
          <RelatedBlogs
            categories={singleBlog.categories}
            current_blog_id={singleBlog.id}
            // keywords={singleBlog.data.meta_keywords}
            // current_blog_id={singleBlog.data.blog_id}
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
