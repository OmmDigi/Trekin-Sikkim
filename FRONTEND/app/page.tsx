import AboutStatsCard from "@/components/About/AboutStatsCard";
import Button from "@/components/Button";
import ExpandCollapseFaq from "@/components/ExpandCollapseFaq";
import HeadingSubHeding from "@/components/HeadingSubHeding";
import LatestBlogs from "@/components/Home/LatestBlogs";
import TrekkerVideos from "@/components/Home/TrekkerVideos";
import Loading from "@/components/Loading";
import OurPackages from "@/components/Overview/OurPackages";
import UpcommingPackages from "@/components/Packages/UpcommingPackages";
import ImageSlider from "@/components/Utils/ImageSlider";
import ReadMore from "@/components/Utils/ReadMore";
import ReadMoreContent from "@/components/Utils/ReadMoreContent";
import ReadMoreToggle from "@/components/Utils/ReadMoreToggle";
import { childVariant, fadeUpVarient } from "@/utils/animations";
import { Award, Compass, Mountain, Users } from "lucide-react";

import * as motion from "motion/react-client";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { BiBookContent } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa6";

const Banner = dynamic(() => import("@/components/Banner"), {
  loading: () => <Loading />,
});

const TestimonialSection = dynamic(
  () => import("@/components/TempComp/TestimonialSection"),
  {
    loading: () => <Loading />,
  }
);

const ABOUT_US_IMAGES = [
  "/about/about-image-1.jpg",
  "/about/about-image-2.webp",
  "/about/about-image-3.webp",
  "/about/about-image-4.webp",
];

const HOW_WE_WORK = [
  "Find Your Trek",
  "Fillup The Form",
  "Get Ready For Adventure",
];

interface IProps {
  searchParams: Promise<{ category: string }>;
}

export const metadata: Metadata = {
  title: "Glacier Treks and Adventure | Himalayan Trekking & Guided Tours",
  description:
    "Discover unforgettable trekking experiences with Glacier Treks and Adventure – your trusted guide for exploring the majestic Himalayas and breathtaking mountain trails with safety, expertise, and passion.",
};

export default function Home({ searchParams }: IProps) {
  return (
    <main className="space-y-2.5">
      <Banner />

      {/* gap */}
      <div className="h-10 max-sm:h-7" />

      {/* About Section */}
      <section className="wrapper space-y-10 font-primary rounded-4xl pt-0 pb-10 max-sm:pb-8 max-sm:space-y-8 max-sm:px-2.5">
        <HeadingSubHeding
          heading="Glacier Treks & Adventure"
          subheading="Welcome to Glacier Treks And Adventure"
        />

        <motion.div
          variants={fadeUpVarient(0.0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-6 max-sm:grid-cols-2 max-sm:gap-y-10"
        >
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
        </motion.div>

        <ReadMore>
          <div className="grid grid-cols-2 gap-14 max-sm:grid-cols-1">
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-2.5">
                <motion.h2
                  variants={fadeUpVarient(0.05)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-2xl font-semibold max-sm:text-xl"
                >
                  Glacier Treks And Adventure is the most diverse, creative, and
                  realistic tour trekking adventure service provider in India
                </motion.h2>

                <motion.div
                  variants={fadeUpVarient(0.15)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2.5 text-justify text-sm leading-6 tracking-wide"
                >
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
                </motion.div>
              </div>
              <motion.div
                variants={fadeUpVarient(0.2)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
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
              </motion.div>
            </div>

            <ImageSlider
              wrapperCss="max-h-[20rem] max-sm:max-h-60"
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
              <motion.span
                variants={fadeUpVarient(0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline-block bg-accent text-white text-sm uppercase font-semibold px-3 py-1 rounded-full mb-4"
                // className="bg-accent inline-block bg-fixed text-white text-xs px-3 py-1.5 tracking-widest"
              >
                HOW WE WORK
              </motion.span>
              <motion.h3
                variants={fadeUpVarient(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl font-medium text-white max-w-[40rem] max-sm:text-2xl"
              >
                Book a trek easily with just a few steps
              </motion.h3>

              <motion.ul
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.3, // Delay between each child animation
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex items-center gap-7 flex-wrap"
              >
                {HOW_WE_WORK.map((item, index) => (
                  <motion.li
                    variants={childVariant}
                    key={index}
                    className="px-5 py-2 border space-x-1.5 border-emerald-500 rounded-full text-sm font-medium hover:bg-emerald-500 text-white"
                    // className="border-accent border rounded-tr-2xl rounded-bl-2xl space-x-1.5 inline-block bg-fixed text-white text-xs py-1.5 px-5 tracking-widest"
                  >
                    <span>{index + 1} .</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={fadeUpVarient(0.14)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border-t border-dashed border-gray-400 w-[40%]"
              ></motion.div>

              <motion.div
                variants={fadeUpVarient(0.17)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link href="#our-packages-section">
                  <Button className="min-w-[10rem] transition-all duration-1000 max-sm:min-[8rem] max-sm:pl-3 !bg-accent !text-white">
                    <BiBookContent />
                    Book Now
                  </Button>
                </Link>
              </motion.div>
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

      {/* <div className="h-10 max-sm:h-7" /> */}

      {/* Our Stories */}
      <section className="wrapper space-y-5">
        <div className="grid grid-cols-2 max-sm:grid-cols-1">
          <div className="space-y-1.5">
            <motion.h2
              variants={fadeUpVarient(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2"
            >
              Our Latest Stories
            </motion.h2>
            <motion.p
              variants={fadeUpVarient(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-accent-2"
            >
              Discover the experiences of our Trekkers
            </motion.p>
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
            <motion.h2
              variants={fadeUpVarient(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2"
            >
              Our Latest Articles
            </motion.h2>
            <motion.p
              variants={fadeUpVarient(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-accent-2"
            >
              Our latest articles and guides to help you plan your next trek.
            </motion.p>
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
