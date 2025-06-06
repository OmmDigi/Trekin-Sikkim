// import Button from "@/components/Button";
import Tabs from "@/components/Tabs";
import ImageSlider from "@/components/Utils/ImageSlider";
// import Link from "next/link";
import React, { cache } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import {
  DollarSign,
  FileChartColumn,
  Hourglass,
  LandPlot,
  MapPinned,
  Mountain,
  PersonStanding,
  Watch,
} from "lucide-react";
import api from "@/lib/axios";
import { IPackage, IResponse } from "@/types";
import Overview from "@/components/Packages/Overview";
import TripItinerary from "@/components/Packages/TripItinerary";
import Loading from "@/components/Loading";
import Faqs from "@/components/Packages/Faqs";
import PhotoGallery from "@/components/Packages/PhotoGallery";
import OtherOptions from "@/components/Packages/OtherOptions";
import AvilableDatesSection from "@/components/Packages/AvilableDatesSection";
import AdditionalCheckbox from "@/components/Packages/AdditionalCheckbox";
import PackageBookNowBtn from "@/components/Packages/PackageBookNowBtn";
import { Metadata } from "next";
import Button from "@/components/Button";
import Link from "next/link";

const getSinglePackagePageInfo = cache(async (slug: string) => {
  return (
    await api.get<IResponse<IPackage>>(
      `/api/v1/package/single-page-basic/${slug}`
    )
  ).data;
});

interface IProps {
  params: Promise<{ "package-slug": string }>;
  searchParams: Promise<any>;
}

const OVERVIEW_POINTS = [
  {
    id: "1",
    title: "Region",
    value: "Sikkim",
    icon: <MapPinned size={15} />,
  },
  {
    id: "2",
    title: "Best Time",
    value: "September to June",
    icon: <Watch size={15} />,
  },
  {
    id: "3",
    title: "Duration",
    value: "6 days",
    icon: <Hourglass size={13} />,
  },
  {
    id: "4",
    title: "Highest Altitude",
    value: "12,516 ft",
    icon: <Mountain size={15} />,
  },
  {
    id: "5",
    title: "Suitable For",
    value: "11 to 62 years",
    icon: <PersonStanding size={15} />,
  },
  {
    id: "6",
    title: "Distance",
    value: "22 kms",
    icon: <LandPlot size={15} />,
  },

  {
    id: "7",
    title: "Price INR",
    value: "₹2000",
    other: "₹15000",
    icon: <BsCurrencyRupee size={15} />,
  },
  {
    id: "8",
    title: "Price USD",
    value: "$500",
    other: "$1000",
    icon: <DollarSign size={15} />,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ["page-name"]: string; ["package-slug"]: string }>;
}): Promise<Metadata> {
  const categoryPageParam = (await params)["page-name"];
  const packageSlug = (await params)["package-slug"];
  const singlePackageInfo = await getSinglePackagePageInfo(packageSlug);
  return {
    title: singlePackageInfo.data.meta_title,
    description: singlePackageInfo.data.meta_description,
    keywords: singlePackageInfo.data.meta_keywords,
    alternates: {
      canonical: singlePackageInfo.data.canonical,
    },
    openGraph: {
      title: singlePackageInfo.data.meta_title,
      description: singlePackageInfo.data.meta_description,
      images: [
        singlePackageInfo.data.banner_info?.[0]?.item_link ||
          "/placeholder_background.jpg",
      ],
      url: `/${categoryPageParam}/${packageSlug}`,
      type: "website",
      locale: "en_US",
      siteName: "Glacier Treks And Adventure",
    },
  };
}

export default async function page({ params, searchParams }: IProps) {
  const packageSlug = (await params)["package-slug"];
  const urlSearchParams = await searchParams;
  const newUrlSearchParams = new URLSearchParams(urlSearchParams);

  const data = await getSinglePackagePageInfo(packageSlug);

  OVERVIEW_POINTS[0].value = data.data.region;
  OVERVIEW_POINTS[1].value = data.data.best_time;
  OVERVIEW_POINTS[2].value = data.data.duration;
  OVERVIEW_POINTS[3].value = data.data.highest_altitude;
  OVERVIEW_POINTS[4].value = data.data.suitable_for;
  OVERVIEW_POINTS[5].value = data.data.trek_distance;
  OVERVIEW_POINTS[6].value = `₹${data.data.offer_price_inr}`;
  OVERVIEW_POINTS[6].other = `₹${data.data.original_price_inr}`;
  OVERVIEW_POINTS[7].value = `$${data.data.offer_price_usd}`;
  OVERVIEW_POINTS[7].other = `$${data.data.original_price_usd}`;

  OVERVIEW_POINTS[2].title = `${data.data.trip_type} Duration`;
  OVERVIEW_POINTS[5].title = `${data.data.trip_type} Distance`;

  const totalPrices = {
    offerPriceInr: parseInt(data.data.offer_price_inr),
    originalPriceInr: parseInt(data.data.original_price_inr),

    offerPriceUsd: parseInt(data.data.offer_price_usd),
    originalPriceUsd: parseInt(data.data.original_price_usd),
  };

  //calclute the inr price of selected addition price
  newUrlSearchParams.forEach((value, key) => {
    if (key.includes("ad")) {
      const inrPrice = data.data.additional[parseInt(value)].price_inr;
      const usdPrice = data.data.additional[parseInt(value)].price_usd;
      totalPrices.offerPriceInr += inrPrice;
      totalPrices.originalPriceInr += inrPrice;
      totalPrices.offerPriceUsd += usdPrice;
      totalPrices.originalPriceUsd += usdPrice;
    }
  });

  return (
    <main className="wrapper mx-auto pb-10 space-y-3 overflow-visible pt-3.5">
      <section className="w-full flex gap-x-10 gap-y-3.5 overflow-visible max-sm:flex-col">
        {/* Left Side */}
        <div className="flex-1 overflow-hidden space-y-5">
          <div className="relative group/package_banner rounded-3xl overflow-hidden aspect-[2.8/1] max-sm:aspect-video">
            {data.data.banner_info && data.data.banner_info.length !== 0 ? (
              <ImageSlider
                // wrapperCss="relative"
                images={data.data.banner_info.map((item) => ({
                  url: item.item_link,
                  alt_tag: item.alt_tag || "",
                }))}
                sliderPreview={1}
                className="h-full w-full overflow-hidden rounded-2xl aspect-[2.8/1] max-sm:aspect-video"
                controllerClassName="z-30"
              />
            ) : null}

            <div className="absolute space-y-1 flex flex-col justify-end p-8 inset-0 z-20 opacity-100 bg-[#0000002a]">
              <h1 className="font-semibold font-primary text-white text-2xl select-none max-sm:text-lg">
                {data.data.package_name}
              </h1>

              <div className="flex items-center justify-between select-none">
                <span className="text-sm text-gray-200 font-primary max-sm:text-sm">
                  {data.data.short_description}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            <div className="space-y-5 order-2 max-sm:order-1">
              <div className="space-y-2.5">
                <h3
                  id="Overview"
                  className="text-2xl max-sm:hidden font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg"
                >
                  Details :
                </h3>
                <ul className="flex items-start gap-5 flex-wrap font-primary">
                  {OVERVIEW_POINTS.map((item) => (
                    <li key={item?.id} className="flex items-center gap-1.5">
                      <span className="size-[25px]">
                        <span className="size-[24.9px] flex items-center justify-center rounded-[50%] bg-accent text-white">
                          {item.icon}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500">
                        <span>{item.title}</span>
                        <span> : </span>
                        {item.other ? (
                          <span className="text-red-400 line-through text-xs mr-1.5">
                            {item.other}
                          </span>
                        ) : null}
                        <span
                          className={`border-b border-gray-400 ${
                            item.other ? "font-semibold text-green-700" : ""
                          }`}
                        >
                          {item.value}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3.5 order-1">
              <div className="max-sm:order-2">
                <React.Suspense fallback={<Loading />}>
                  <AvilableDatesSection
                    package_id={data.data.id}
                    searchParams={urlSearchParams}
                  />
                </React.Suspense>
              </div>

              <div className="space-y-3.5">
                <h3
                  id="Overview"
                  className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg"
                >
                  Additional :
                </h3>

                <ul>
                  {data.data.additional.map((additionlInfo, index) => (
                    <li
                      key={additionlInfo.additional_id}
                      className="text-xs py-3.5 cursor-pointer flex justify-between border px-3.5 bg-red-50 border-gray-300"
                    >
                      <div className="flex justify-between flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg max-sm:text-sm">
                            {additionlInfo.additional_name}
                          </span>
                        </div>

                        <div className="text-center block text-lg max-sm:pl-2.5 max-sm:text-sm">
                          ₹{additionlInfo.price_inr} / $
                          {additionlInfo.price_usd}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <AdditionalCheckbox
                          additional_id={additionlInfo.additional_id}
                          index={index}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* <div className="space-y-3.5 hidden max-sm:block order-3">
              <h3
                id="Overview"
                className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg"
              >
                Additional :
              </h3>

              <ul>
                {data.data.additional.map((additionlInfo, index) => (
                  <li
                    key={additionlInfo.additional_id}
                    className="text-xs py-3.5 cursor-pointer flex justify-between border px-3.5 bg-red-50 border-gray-300"
                  >
                    <div className="flex justify-between flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg max-sm:text-sm">
                          {additionlInfo.additional_name}
                        </span>
                      </div>

                      <div className="text-center block text-lg max-sm:pl-2.5 max-sm:text-sm">
                        ₹{additionlInfo.price_inr} / ${additionlInfo.price_usd}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <AdditionalCheckbox
                        additional_id={additionlInfo.additional_id}
                        index={index}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>

          {/* <div className="w-full h-[1px] bg-gray-300"></div> */}

          {/* <React.Suspense fallback={<Loading />}>
            <AvilableDatesSection
              package_id={data.data.id}
              searchParams={urlSearchParams}
            />
          </React.Suspense> */}

          {/* <h3
            id="Overview"
            className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg"
          >
            Additional :
          </h3>

          <ul>
            {data.data.additional.map((additionlInfo, index) => (
              <li
                key={additionlInfo.additional_id}
                className="text-xs py-3.5 cursor-pointer flex justify-between border px-3.5 bg-red-50 border-gray-300"
              >
                <div className="flex justify-between flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg max-sm:text-sm">
                      {additionlInfo.additional_name}
                    </span>
                  </div>

                  <div className="text-center block text-lg max-sm:pl-2.5 max-sm:text-sm">
                    ₹{additionlInfo.price_inr} / ${additionlInfo.price_usd}
                  </div>
                </div>

                <div className="flex justify-end">
                  <AdditionalCheckbox
                    additional_id={additionlInfo.additional_id}
                    index={index}
                  />
                </div>
              </li>
            ))}
          </ul> */}

          <div className="flex items-center justify-between h-[3rem] max-sm:h-auto max-sm:flex-wrap max-sm:gap-y-4.5">
            <span className="font-semibold space-x-2.5">
              Total:
              <span className="text-red-400 line-through text-xs ml-1.5">
                ₹{totalPrices.originalPriceInr}
              </span>
              <span>₹{totalPrices.offerPriceInr}</span>
              <span>/</span>
              <span className="text-red-400 line-through text-xs ml-1.5">
                ${totalPrices.originalPriceUsd}
              </span>
              <span>${totalPrices.offerPriceUsd}</span>
            </span>
            <PackageBookNowBtn package_id={data.data.id} />
          </div>

          <div className="w-full h-[1px] bg-gray-300"></div>

          <div className="sticky top-[4.3rem] h-fit">
            <Tabs
              // selectedTabCss="bg-accent !text-black !font-semibold"
              scroll={true}
              options={[
                { id: "overview", text: "Overview", slug: "#Overview" },
                {
                  id: "trip-itinerary",
                  text: "Trip Itinerary",
                  slug: "#TripItinerary",
                },
                { id: "faq", text: "Faq", slug: "#faq" },
                {
                  id: "photo-gallery",
                  text: "Photo Gallery",
                  slug: "#photo-gallery",
                },
                ...data.data.other_option_names.map((item) => ({
                  id: item.id,
                  text: item.option_name,
                  slug: `#${item.option_name}`,
                })),
              ]}
            />
          </div>

          <section className="font-primary leading-7">
            <h3
              id="Overview"
              className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg"
            >
              Overview :
            </h3>
            <React.Suspense
              fallback={
                <Loading className="py-6" loadertext="Loading Overview..." />
              }
            >
              <Overview package_id={data.data.id} />
            </React.Suspense>

            <div className="flex items-center justify-between">
              <h3
                id="TripItinerary"
                className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block mb-5 rounded-tr-lg rounded-bl-lg"
              >
                Trip Itinerary :
              </h3>

              {data.data.itinerary_pdf_link ? (
                <Link
                  className="block"
                  href={data.data.itinerary_pdf_link}
                  target="__blank"
                >
                  <Button className="!bg-red-600 !text-white">
                    <FileChartColumn size={18} />
                    Itinerary PDF Download
                  </Button>
                </Link>
              ) : null}
            </div>
            <React.Suspense
              fallback={
                <Loading
                  className="py-6"
                  loadertext="Loading Trip Itinerary..."
                />
              }
            >
              <TripItinerary package_id={data.data.id} />
            </React.Suspense>

            <h3
              id="photo-gallery"
              className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg my-5"
            >
              Photo Gallery :
            </h3>

            {/* Gallery Categories */}
            {/* <ul className="flex items-center gap-2.5 flex-wrap">
                {GALLERY_CATEGORY.map((cat, index) => (
                  <li
                    key={index}
                    className={`${
                      index === 0 ? "bg-accent" : ""
                    } text-sm p-2 cursor-pointer border border-gray-300 text-nowrap`}
                  >
                    {cat.text}
                  </li>
                ))}
              </ul> */}
            <React.Suspense
              fallback={
                <Loading
                  className="py-6"
                  loadertext="Loading Trip Itinerary..."
                />
              }
            >
              <PhotoGallery package_id={data.data.id} />
            </React.Suspense>

            <h3
              id="faq"
              className="text-2xl font-semibold bg-accent text-white p-1.5 px-7 inline-block rounded-tr-lg rounded-bl-lg mb-5 mt-10"
            >
              Frequently Asked Question :{" "}
            </h3>
            <React.Suspense
              fallback={
                <Loading
                  className="py-6"
                  loadertext="Loading Trip Itinerary..."
                />
              }
            >
              <Faqs package_id={data.data.id} />
            </React.Suspense>
          </section>

          {/* <section className="font-primary py-6 leading-7">
              <h3 className="text-2xl font-semibold underline decoration-accent">
                Overview :{" "}
              </h3>
  
              <div>
                <p className="text-sm leading-7 mt-4">
                  Sandakphu Trek is the best option for first-timer and immature
                  trekkers which takes you to unexplored and not so known parts of
                  Nepal and Sikkim. This trail line is the highest in West Bengal.
                  And its route follows the border of Nepal and India. Trekkers
                  can also visit Singalila National Park where you will find
                  species like a red panda. Forests are full of Magnolia and
                  Rhododendrons because of which during spring, the forest turns
                  white, pink, and red. You will find many local people staying
                  there along the route of the Sandakphu Phalut trek. The trek is
                  somewhere moderate and somewhere hard giving a balance
                  experience to the hikers. While going towards Tumling you may
                  also get a view of the great Mt. Everest if the weather is
                  clear. The last part of the trek is very hard due to the fast
                  gain in height and also very rewarding because after reaching
                  the summit point you will get to see a magnificent view.
                </p>
  
                <br />
                <p className="text-sm leading-7">
                  Explore the wonders of Sandakphu Trek Package - an incredible
                  journey through the Himalayas, where you&apos;ll witness
                  panoramic views, encounter diverse wildlife, and immerse
                  yourself in the natural beauty of the Singalila ranges.
                </p>
                <br />
  
                <p className="text-sm leading-7">
                  The best time to go on a trek to Sandakphu is from April to June
                  and October to January. The person should be a minimum
                  12-year-old to do this trek.
                </p>
  
                <br />
              </div>
  
              <h3 className="text-2xl font-semibold underline decoration-accent mb-4">
                Trip Itinerary :{" "}
              </h3>
              <TimeLine />
  
              <br />
  
              <h3 className="text-2xl font-semibold underline mb-4 decoration-accent">
                Inclusion :{" "}
              </h3>
  
              <ul className="space-y-2">
                {inclusion.map((item, index) => (
                  <li key={index} className="text-sm flex items-start gap-3">
                    <CheckBox
                      checked
                      checkBoxColor="#ffd230"
                      checkIconColor="#fff"
                      className="mt-0.5"
                    />
  
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
  
              <br />
  
              <h3 className="text-2xl font-semibold underline mb-4 decoration-accent">
                Exclusion :{" "}
              </h3>
  
              <ul className="space-y-2">
                {exclusion.map((item, index) => (
                  <li key={index} className="text-sm flex items-start gap-3">
                    <CheckBox
                      checked
                      checkBoxColor="#ffd230"
                      checkIconColor="#fff"
                      className="mt-0.5"
                    />
  
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
  
              <br />
  
              <h3 className="text-2xl font-semibold underline mb-4 decoration-accent">
                Frequently Asked Question :{" "}
              </h3>
  
              <ExpandCollapseFaq />
            </section> */}

          <OtherOptions package_id={data.data.id} />
        </div>

        {/* Right Side */}
        {/* <section className="basis-[28rem] space-y-3.5 sticky top-[4.3rem] h-fit max-sm:static">
            <h3 className="text-2xl font-semibold underline decoration-accent">
              Related Packages :
            </h3>
  
            <ul className="grid grid-cols-1 gap-x-3 gap-y-3.5 w-full max-sm:grid-cols-1 max-sm:gap-2.5">
              {POPULER_PACKAGES.slice(0, 5).map((item) => (
                <li
                  key={item.id}
                  // className="w-full h-80 overflow-hidden rounded-[.8rem] relative shadow-2xl group/item max-sm:h-[17rem]"
                >
                  <PackageItem option={item} />
                </li>
              ))}
            </ul>
          </section> */}
        {/* <div className="p-1.5 z-10 h-fit basis-96 overflow-hidden max-sm:hidden">
            <h3 className="text-2xl font-semibold underline decoration-accent">
              Related Packages :
            </h3>
  
            <ul className="w-full grid grid-cols-2">
              <PackageItem
                option={{
                  id: 1,
                  images: [
                    "/traking-places/GoechalaTrek.jpg",
                    "/traking-places/LachungtoYumthangTrek.jpg",
                  ],
                  name: "Frey Peak Sikkim",
                  link: "/trekking-in-sikkim/packages/test-trek",
                }}
              />
            </ul>
          </div> */}
      </section>
    </main>
  );
}
