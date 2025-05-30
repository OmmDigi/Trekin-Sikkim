import { LayoutDashboard, SquareArrowDown } from "lucide-react";
import PackagesListingPage from "@/components/Pages/PackagesListingPage";
import Button from "@/components/Button";
import Link from "next/link";
import ImageSlider from "@/components/Utils/ImageSlider";
import api from "@/lib/axios";
import { IMediaItem, IResponse } from "@/types";
import React from "react";
import Loading from "@/components/Loading";
import HeadingSubHeding from "@/components/HeadingSubHeding";
import { Collapsible } from "@/components/Utils/Collapsible";
import { CollapsibleItem } from "@/components/Utils/CollapsibleItem";
import { cache } from "react";
import type { Metadata } from "next";

const getCategoryPageInfo = cache(async (slug: string) => {
  return (
    await api.get<IResponse<ICategoryPageInfo>>(
      `/api/v1/category/page-info/${slug}`
    )
  ).data;
});

interface IProps {
  params: Promise<{ ["page-name"]: string }>;
  searchParams: Promise<{ page: string | undefined }>;
}

interface ICategoryPageInfo {
  category_id: number;
  category_name: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical: string | null;
  page_content: string | null;
  media_items: IMediaItem[];
  faqs: {
    id: number;
    category_id: number;
    faq_heading: string;
    faq_detail: string;
    created_at: string;
  }[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ["page-name"]: string }>;
}): Promise<Metadata> {
  const categorySlug = (await params)["page-name"];
  const categoryPageInfo = await getCategoryPageInfo(categorySlug);
  return {
    title: categoryPageInfo.data.meta_title,
    description: categoryPageInfo.data.meta_description,
    keywords: categoryPageInfo.data.meta_keywords,
    alternates: {
      canonical: categoryPageInfo.data.canonical,
    },
    openGraph: {
      title: categoryPageInfo.data.meta_title,
      description: categoryPageInfo.data.meta_description,
      images: [
        categoryPageInfo.data.media_items?.[0]?.item_link ||
          "/placeholder_background.jpg",
      ],
      url: `/${categorySlug}`,
      type: "website",
      locale: "en_US",
      siteName: "Glacier Treks And Adventure",
    },
  };
}

export default async function CategoryPage({ params, searchParams }: IProps) {
  const categorySlug = (await params)["page-name"];
  const currentPage = (await searchParams).page;

  const categoryPageInfo = await getCategoryPageInfo(categorySlug);

  return (
    <main className="space-y-5 pt-3.5">
      <div className="wrapper space-y-10 max-sm:space-y-5">
        <section className="relative overflow-hidden object-cover rounded-tl-4xl rounded-br-4xl">
          <ImageSlider
            controllerPosition="bottom"
            className="aspect-[2.8/1] max-sm:aspect-video"
            images={categoryPageInfo.data.media_items.map((media) => ({
              alt_tag: media.alt_tag || "",
              url: media.item_link,
            }))}
            sliderPreview={1}
          />

          <div className="absolute inset-0 fade-gradient-left font-primary z-10">
            <div className="size-full relative flex flex-col justify-center max-w-[90%] mx-auto gap-1.5 max-sm:items-center">
              <h1 className="text-3xl font-semibold text-white tracking-widest mt-2.5 max-sm:text-center max-sm:text-2xl">
                {/* Trekking In Sikkim */}
                {categoryPageInfo.data.category_name}
              </h1>
              {/* <p className="text-white text-sm font-montserrat max-sm:text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p> */}

              <Link href="#packages-list" className="mt-2.5 max-sm:hidden">
                <Button
                  theme="accent"
                  className="px-4 !text-xs !py-2.5 !font-semibold text-white"
                >
                  <SquareArrowDown color="#fff" strokeWidth={1.5} size={15} />
                  Explore Our Packages
                </Button>
              </Link>

              {/* <button className="absolute z-20 text-white flex items-center gap-2 right-0 bottom-9 bg-[#ffffff7e] p-2.5 px-6 rounded-full backdrop-blur-3xl max-sm:hidden">
                <LayoutDashboard color="#ffffff" size={20} />
                <span className="!font-montserrat text-sm">See All Photos</span>
              </button> */}
            </div>
          </div>
        </section>

        <section className="space-y-2.5 font-primary relative">
          <div className="items-start justify-center gap-2.5 flex-col hidden max-sm:flex pb-2">
            <Link href="#packages-list">
              <Button
                theme="accent"
                className="px-4 !text-xs !py-2.5 !font-semibold text-white"
              >
                <SquareArrowDown color="#fff" strokeWidth={1.5} size={15} />
                Explore Our Packages
              </Button>
            </Link>

            <button className="z-20 text-white flex items-center gap-2 right-0 bottom-9 bg-[#000] p-2.5 px-6 rounded-full backdrop-blur-3xl">
              <LayoutDashboard color="#ffffff" size={20} />
              <span className="!font-montserrat text-sm">See All Photos</span>
            </button>
          </div>
          {categoryPageInfo.data.page_content ? (
            <article
              // className="!font-primary"
              className="prose min-w-full"
              dangerouslySetInnerHTML={{
                __html: categoryPageInfo.data.page_content,
              }}
            ></article>
          ) : null}
        </section>
      </div>

      {/* Packages */}
      <section className="space-y-2.5 font-primary">
        <React.Suspense
          fallback={
            <Loading
              loadersize="25px"
              className="py-20"
              loadertext="Loading Packages.."
            />
          }
        >
          <PackagesListingPage
            category_slug={categorySlug}
            current_page={parseInt(currentPage || "1")}
          />
        </React.Suspense>
      </section>

      {/* FAQS */}
      <section className="w-full bg-light-gray p-12 max-sm:px-3">
        <section className="wrapper space-y-10">
          <HeadingSubHeding heading="Frequently Asked Questions" />

          {/* <ExpandCollapseFaq /> */}
          {/* <CategoryFaq category_id={categoryPageInfo.data.data.category_id}/> */}
          <Collapsible>
            {categoryPageInfo.data.faqs.map((faq, index) => (
              <CollapsibleItem
                key={index}
                heading={faq.faq_heading}
                index={index}
              >
                <span
                  className="prose min-w-full"
                  dangerouslySetInnerHTML={{ __html: faq.faq_detail }}
                ></span>
              </CollapsibleItem>
            ))}
          </Collapsible>
        </section>
      </section>
    </main>
  );
}
