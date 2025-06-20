import AboutStatsCard from "@/components/About/AboutStatsCard";
import Banner2 from "@/components/Banner2";
import Button from "@/components/Button";
import ExpandCollapseFaq from "@/components/ExpandCollapseFaq";
import HeadingSubHeding from "@/components/HeadingSubHeding";
import LatestBlogs from "@/components/Home/LatestBlogs";
import TrekkerVideos from "@/components/Home/TrekkerVideos";
import Loading from "@/components/Loading";
import OurPackages from "@/components/Overview/OurPackages";
import UpcommingPackages from "@/components/Packages/UpcommingPackages";

import ReadMore from "@/components/Utils/ReadMore";
import ReadMoreContent from "@/components/Utils/ReadMoreContent";
import ReadMoreToggle from "@/components/Utils/ReadMoreToggle";

import { Award, Compass, Mountain, Users } from "lucide-react";

import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { BiBookContent } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa6";

const TestimonialSection = dynamic(
  () => import("@/components/TempComp/TestimonialSection"),
  {
    loading: () => <Loading />,
  }
);

const ImageSlider = dynamic(() => import("@/components/Utils/ImageSlider"));

const ABOUT_US_IMAGES = [
  "/about/about-new-1.webp",
  "/about/about-new-2.webp",
  "/about/about-new-3.avif",
];

const HOW_WE_WORK = [
  "Find Your Trek",
  "Fillup The Form",
  "Get Ready For Adventure",
];

interface IProps {
  searchParams: Promise<{ category: string }>;
}

export default function Home({ searchParams }: IProps) {
  return (
    <main className="space-y-2.5">
      {/* <Banner /> */}
      <Banner2 />

      {/* gap */}
      <div className="h-10 max-sm:h-7" />

      {/* About Section */}
      <section className="wrapper space-y-10 font-primary rounded-4xl pt-0 pb-10 max-sm:pb-8 max-sm:space-y-8 max-sm:px-2.5">
        <HeadingSubHeding
          heading="Glacier Treks & Adventure"
          subheading="Welcome to Glacier Treks And Adventure"
        />

        <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2 max-sm:gap-y-10">
          <AboutStatsCard
            number="150+"
            text="Guided Treks"
            icon={<Mountain className="w-5 h-5" />}
            className="border-r border-gray-300"
          />
          <AboutStatsCard
            number="12K+"
            text="Happy Trekkers"
            icon={<Users className="w-5 h-5" />}
            className="border-r border-gray-300 max-sm:border-none"
          />
          <AboutStatsCard
            number="25+"
            text="Unique Routes"
            icon={<Compass className="w-5 h-5" />}
            className="border-r border-gray-300"
          />
          <AboutStatsCard
            number="15+"
            text="Years Experience"
            icon={<Award className="w-5 h-5" />}
          />
        </div>

        <ReadMore>
          <div className="grid grid-cols-2 gap-14 max-sm:grid-cols-1">
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-2.5">
                <h2 className="text-2xl font-semibold max-sm:text-xl">
                  Glacier Treks And Adventure is the most diverse, creative, and
                  realistic tour trekking adventure service provider in India
                </h2>

                <div className="space-y-2.5 text-justify text-sm leading-6 tracking-wide">
                  <p>Welcome to Glacier Treks And Adventure</p>
                  <p>
                    Let me introduce you to about the Glacier Treks & Adventure
                    company, This our company was run from since 15 years and
                    founded by Mr. Kiran Gurung who was born in the remote
                    places in Sikkim and he has already his life mostly spend in
                    the mountain trekking and expedition, and this company was
                    run by a well dedicated mountain trekkers who has still work
                    as a mountain and trekking guide all over the Indian
                    Himalaya.
                  </p>

                  <ReadMoreContent className="space-y-2.5 leading-6 tracking-wide">
                    <p>So what is the aim of Glacier treks and Adventure? </p>
                    <p>
                      Our main aim is truly deliver the high quality service
                      with affordable price, and to share the mountain
                      experience to our valuable client or trekkers, and our
                      main aims to take to our client with safely summit the top
                      and bring back safely home,
                    </p>

                    <p>
                      What Glacier Treks and Adventure company is affiliated
                      with any govt and organisation
                    </p>
                    <p>
                      Yes Glacier Treks and Adventure company already affiliated
                      with department of Sikkim Tourism and affiliated with
                      other Organisation like TAAS, YTDC, SAMA, IMF.
                    </p>
                  </ReadMoreContent>
                </div>
              </div>
              <div>
                <ReadMoreToggle type="OPEN" key="open">
                  <Button className="space-x-3.5 !bg-accent text-white">
                    Read More
                    <FaCaretDown />
                  </Button>
                </ReadMoreToggle>
                <ReadMoreToggle type="CLOSE" key="close">
                  <Button className="space-x-3.5 !bg-accent text-white">
                    Read Less
                    <FaCaretDown className="rotate-180" />
                  </Button>
                </ReadMoreToggle>
              </div>
            </div>

            <ImageSlider
              wrapperCss="max-h-[20rem] max-sm:max-h-60 max-sm:min-h-60"
              images={ABOUT_US_IMAGES.map((item) => ({
                url: item,
                alt_tag: "About US Image",
              }))}
              sliderPreview={1}
              className="h-full w-full overflow-hidden rounded-tl-2xl rounded-br-2xl max-sm:rounded-none"
            />
          </div>
        </ReadMore>
      </section>

      <React.Suspense fallback={<Loading />}>
        <UpcommingPackages />
      </React.Suspense>

      <div className="h-20 max-sm:h-7" />

      {/* Promo Section */}
      <section className="w-full relative h-[28rem] overflow-hidden pimg">
        <div className="size-full fade-gradient-left absolute inset-0 flex items-center justify-start z-10">
          <div className="!font-primary max-w-[90%] mx-auto w-full">
            <div className="space-y-5">
              <span className="inline-block bg-accent text-white text-sm uppercase font-semibold px-3 py-1 rounded-full mb-4">
                HOW WE WORK
              </span>
              <span className="text-4xl block font-medium text-white max-w-[40rem] max-sm:text-2xl">
                Book a trek easily with just a few steps
              </span>

              <ul className="flex items-center gap-7 flex-wrap">
                {HOW_WE_WORK.map((item, index) => (
                  <li
                    key={index}
                    className="px-5 py-2 border space-x-1.5 border-emerald-500 rounded-full text-sm font-medium hover:bg-emerald-500 text-white"
                  >
                    <span>{index + 1} .</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-dashed border-gray-400 w-[40%]"></div>

              <div>
                <Link href="#our-packages-section">
                  <Button className="min-w-[10rem] transition-all duration-1000 max-sm:min-[8rem] max-sm:pl-3 !bg-accent !text-white">
                    <BiBookContent />
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 max-sm:h-7" />

      {/* Our Packages */}
      <React.Suspense fallback={<Loading />}>
        <OurPackages searchParams={searchParams} />
      </React.Suspense>

      <div className="h-16 max-sm:h-7" />

      {/* Our Stories */}
      <section className="wrapper space-y-5">
        <div className="grid grid-cols-2 max-sm:grid-cols-1">
          <div className="space-y-1.5">
            <h2 className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2">
              Our Latest Stories
            </h2>
            <p className="text-sm text-accent-2">
              Discover the experiences of our Trekkers
            </p>
          </div>
        </div>

        <TrekkerVideos />
      </section>

      <div className="h-16 max-sm:h-7" />

      <TestimonialSection />

      <div className="h-16 max-sm:h-7" />

      {/* Blogs */}
      <section className="wrapper space-y-5">
        <div className="grid grid-cols-2 font-primary max-sm:grid-cols-1">
          <div className="space-y-1.5">
            <h2 className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2">
              Our Latest Articles
            </h2>
            <p className="text-sm text-accent-2">
              Our latest articles and guides to help you plan your next trek.
            </p>
          </div>
        </div>

        <React.Suspense fallback={<Loading />}>
          <LatestBlogs />
        </React.Suspense>
      </section>

      <div className="h-16 max-sm:h-7" />

      <section className="w-full bg-light-gray p-12 max-sm:px-3">
        <section className="wrapper space-y-10">
          <HeadingSubHeding heading="Frequently Asked Questions" />

          <ExpandCollapseFaq />
        </section>
      </section>
    </main>
  );
}
