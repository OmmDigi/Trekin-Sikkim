// import Button from "@/components/Button";
import Tabs from "@/components/Tabs";
import ImageSlider from "@/components/Utils/ImageSlider";
// import Link from "next/link";
import React, { cache } from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import {
  DollarSign,
  Hourglass,
  LandPlot,
  MapPinned,
  Mountain,
  PersonStanding,
  Watch,
  Calendar,
  Users,
  Star,
  Clock,
  Shield,
  CheckCircle,
  ChevronUp,
  MoveRight,
} from "lucide-react";
import api from "@/lib/axios";
import { IPackage, IResponse } from "@/types";
import Overview from "@/components/Packages/Overview";
import TripItinerary from "@/components/Packages/TripItinerary";
import Loading from "@/components/Loading";
import Faqs from "@/components/Packages/Faqs";
import PhotoGallery from "@/components/Packages/PhotoGallery";
import OtherOptions from "@/components/Packages/OtherOptions";
import AdditionalCheckbox from "@/components/Packages/AdditionalCheckbox";
import PackageBookNowBtn from "@/components/Packages/PackageBookNowBtn";
import { Metadata } from "next";
import AiAvilableDatesSection from "@/components/AiComponents/AiAvilableDatesSection";
import ReadMore from "@/components/Utils/ReadMore";
import ReadMoreContent from "@/components/Utils/ReadMoreContent";
import ReadMoreToggle from "@/components/Utils/ReadMoreToggle";
import { cn } from "@/lib/utils";
// import AiAvilableDatesSectionV2 from "@/components/AiComponents/AiAvilableDatesSectionV2";

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
    icon: <MapPinned size={18} />,
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Best Time",
    value: "September to June",
    icon: <Watch size={18} />,
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Trek Duration",
    value: "6 days",
    icon: <Hourglass size={18} />,
    color: "bg-purple-500",
  },
  {
    id: "4",
    title: "Highest Altitude",
    value: "12,516 ft",
    icon: <Mountain size={18} />,
    color: "bg-orange-500",
  },
  {
    id: "5",
    title: "Suitable For",
    value: "11 to 62 years",
    icon: <PersonStanding size={18} />,
    color: "bg-pink-500",
  },
  {
    id: "6",
    title: "Trek Distance",
    value: "22 kms",
    icon: <LandPlot size={18} />,
    color: "bg-teal-500",
  },
  {
    id: "7",
    title: "Price INR",
    value: "₹2000",
    other: "₹15000",
    icon: <BsCurrencyRupee size={18} />,
    color: "bg-red-500",
  },
  {
    id: "8",
    title: "Price USD",
    value: "$500",
    other: "$1000",
    icon: <DollarSign size={18} />,
    color: "bg-emerald-500",
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

  const isBtnDisable = (await searchParams).date_id === undefined;

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

  const totalPrices = {
    offerPriceInr: parseInt(data.data.offer_price_inr),
    originalPriceInr: parseInt(data.data.original_price_inr),
    offerPriceUsd: parseInt(data.data.offer_price_usd),
    originalPriceUsd: parseInt(data.data.original_price_usd),
  };

  //calculate the inr price of selected addition price
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

  const discountPercentageINR = Math.round(
    ((totalPrices.originalPriceInr - totalPrices.offerPriceInr) /
      totalPrices.originalPriceInr) *
      100
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative">
          <div className="relative h-[70vh] max-sm:h-[30vh] overflow-hidden">
            {data.data.banner_info && data.data.banner_info.length !== 0 ? (
              <ImageSlider
                wrapperCss="static size-full"
                images={data.data.banner_info.map((item) => ({
                  url: item.item_link,
                  alt_tag: item.alt_tag || "",
                }))}
                sliderPreview={1}
                className="h-full w-full !object-cover"
                controllerClassName="z-30"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#0000005e] z-10 max-sm:hidden"></div>
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex items-end max-sm:static max-sm:mt-6">
            <div className="container mx-auto px-4 pb-12 md:pb-16">
              <div className="max-w-4xl">
                {/* <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    Featured Trek
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm max-sm:text-black">
                      4.8 (124 reviews)
                    </span>
                  </div>
                </div> */}

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight max-sm:text-black">
                  {data.data.package_name}
                </h1>

                <p className="text-xl text-gray-200 mb-6 max-w-2xl max-sm:text-black">
                  {data.data.short_description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-white max-sm:text-black">
                    <MapPinned className="w-5 h-5" />
                    <span className="font-medium">{data.data.region}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white max-sm:text-black">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{data.data.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white max-sm:text-black">
                    <Mountain className="w-5 h-5" />
                    <span className="font-medium">
                      {data.data.highest_altitude}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {OVERVIEW_POINTS.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className={cn(
                      item.color,
                      "w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3"
                    )}
                  >
                    {item.icon}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {item.title}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Available Dates */}
            <ReadMore initIsOpen={true}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <ReadMoreToggle type="OPEN">
                  <div className="flex items-center justify-between cursor-pointer">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      Available Dates
                    </h3>

                    <ChevronUp className="rotate-180 cursor-pointer" />
                  </div>
                </ReadMoreToggle>
                <ReadMoreToggle type="CLOSE">
                  <div className="flex items-center justify-between cursor-pointer">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      Available Dates
                    </h3>

                    <ChevronUp className="cursor-pointer" />
                  </div>
                </ReadMoreToggle>
                <ReadMoreContent className="mt-6">
                  <React.Suspense fallback={<Loading />}>
                    {/* <AvilableDatesSection
                  package_id={data.data.id}
                  searchParams={urlSearchParams}
                /> */}
                    <AiAvilableDatesSection
                      package_id={data.data.id}
                      searchParams={urlSearchParams}
                    />
                  </React.Suspense>
                </ReadMoreContent>
              </div>
            </ReadMore>

            {/* Additional Services */}
            {data.data.additional.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  Additional Services
                </h3>
                <div className="space-y-4">
                  {data.data.additional.map((additionlInfo, index) => (
                    <div
                      key={additionlInfo.additional_id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {additionlInfo.additional_name}
                          </h4>
                          <p className="text-green-600 font-bold">
                            ₹{additionlInfo.price_inr} / $
                            {additionlInfo.price_usd}
                          </p>
                        </div>
                      </div>
                      <AdditionalCheckbox
                        additional_id={additionlInfo.additional_id}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
              <Tabs
                scroll={true}
                options={[
                  { id: "overview", text: "Overview", slug: "#Overview" },
                  {
                    id: "trip-itinerary",
                    text: "Trip Itinerary",
                    slug: "#TripItinerary",
                  },
                  { id: "faq", text: "FAQ", slug: "#faq" },
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

            {/* Content Sections */}
            <div className="space-y-12">
              {/* Overview */}
              <section
                id="Overview"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  Overview
                </h3>
                <React.Suspense
                  fallback={
                    <Loading
                      className="py-6"
                      loadertext="Loading Overview..."
                    />
                  }
                >
                  <Overview package_id={data.data.id} />
                </React.Suspense>
              </section>

              {/* Trip Itinerary */}
              <section
                id="TripItinerary"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  Trip Itinerary
                </h3>
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
              </section>

              {/* Photo Gallery */}
              <section
                id="photo-gallery"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-white" />
                  </div>
                  Photo Gallery
                </h3>
                <React.Suspense
                  fallback={
                    <Loading
                      className="py-6"
                      loadertext="Loading Photo Gallery..."
                    />
                  }
                >
                  <PhotoGallery package_id={data.data.id} />
                </React.Suspense>
              </section>

              {/* FAQ */}
              <section
                id="faq"
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-8 gap-3">
                  <span className="float-left mr-4 mb-1.5 w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </span>
                  <span className="inline-block">
                    Frequently Asked Questions
                  </span>
                </h3>
                <React.Suspense
                  fallback={
                    <Loading className="py-6" loadertext="Loading FAQ..." />
                  }
                >
                  <Faqs package_id={data.data.id} />
                </React.Suspense>
              </section>

              {/* Other Options */}
              <OtherOptions package_id={data.data.id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{totalPrices.offerPriceInr.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{totalPrices.originalPriceInr.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xl font-bold text-gray-700">
                      ${totalPrices.offerPriceUsd}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${totalPrices.originalPriceUsd}
                    </span>
                  </div>
                  {discountPercentageINR > 0 && (
                    <div className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                      Save {discountPercentageINR}%
                    </div>
                  )}
                </div>

                {/* <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Free Cancellation</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Expert Guide Included</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>All Meals Included</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Safety Equipment</span>
                  </div>
                </div> */}

                <PackageBookNowBtn package_id={data.data.id} />

                {/* Book Now Mobile Popup Btn */}
                <div
                  className={cn(
                    "hidden max-sm:block fixed bottom-20 z-40 left-2.5 right-2.5",
                    "transition-transform duration-500",
                    isBtnDisable ? "translate-y-[150%]" : "translate-y-0"
                  )}
                >
                  <PackageBookNowBtn
                    className="!rounded-md !py-5 !shadow-2xl flex items-center gap-2.5 !text-lg"
                    package_id={data.data.id}
                  >
                    <MoveRight />
                  </PackageBookNowBtn>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Secure booking • No hidden fees
                </p>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4">
                  Trek Highlights
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mountain className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      Altitude: {data.data.highest_altitude}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <LandPlot className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Distance: {data.data.trek_distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Watch className="w-5 h-5 text-purple-500" />
                    <span className="text-sm text-gray-600">
                      Duration: {data.data.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PersonStanding className="w-5 h-5 text-orange-500" />
                    <span className="text-sm text-gray-600">
                      Age: {data.data.suitable_for}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                <h4 className="font-bold mb-3">Need Help?</h4>
                <p className="text-sm mb-4 text-blue-100">
                  Our travel experts are here to help you plan your perfect
                  adventure.
                </p>
                <button className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors">
                  Contact Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
