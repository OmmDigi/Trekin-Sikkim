import AboutStatsCard from "@/components/About/AboutStatsCard";
import Banner from "@/components/Banner";
// import BlogListItem from "@/components/Blogs/BlogListItem";
import Button from "@/components/Button";
import ExpandCollapseFaq from "@/components/ExpandCollapseFaq";
import HeadingSubHeding from "@/components/HeadingSubHeding";
import LatestBlogs from "@/components/Home/LatestBlogs";
import TrekkerVideos from "@/components/Home/TrekkerVideos";
import Loading from "@/components/Loading";
import OurPackages from "@/components/Overview/OurPackages";
// import PackageItem from "@/components/PackageItem";
import UpcommingPackages from "@/components/Packages/UpcommingPackages";
// import Tabs from "@/components/Tabs";
import TestimonialSection from "@/components/TempComp/TestimonialSection";
import ImageSlider from "@/components/Utils/ImageSlider";
import ReadMore from "@/components/Utils/ReadMore";
import ReadMoreContent from "@/components/Utils/ReadMoreContent";
import ReadMoreToggle from "@/components/Utils/ReadMoreToggle";
// import { POPULER_PACKAGES } from "@/constant";
import { childVariant, fadeUpVarient } from "@/utils/animations";
import { Award, Compass, Mountain, Users } from "lucide-react";

import * as motion from "motion/react-client";
import React from "react";
import { BiBookContent } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa6";

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

        {/* <div className="grid grid-cols-2 max-sm:grid-cols-1">
          <div>
            <motion.h2
              variants={fadeUpVarient(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2"
            >
              Glacier Treks & Adventure
            </motion.h2>
            <motion.p
              variants={fadeUpVarient(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-accent-2"
            >
              Welcome to Glacier Treks And Adventure
            </motion.p>
          </div>
        </div> */}

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

      {/* Top Values For You */}
      {/* <section className="wrapper space-y-10 font-primary bg-light-gray rounded-4xl p-10 pb-20 max-sm:pb-8">
        <HeadingSubHeding
          withIcon
          heading="Top values for you"
          subheading="Try variety of benefits when using our services"
        />

        <motion.ul
          variants={parentVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex items-center justify-center flex-wrap gap-5"
        >
          {TOP_VALUES.map((value) => (
            <motion.li
              variants={childVariant}
              key={value.id}
              className="flex items-center justify-center flex-col gap-1 basis-[18rem]"
            >
              <div className="size-10 border border-gray-500 flex items-center justify-center rounded-full">
                <Image
                  className="w-5"
                  alt="Value Icons"
                  src={value.icon}
                  height={1200}
                  width={1200}
                />
              </div>

              <h2 className="font-medium text-center">{value.name}</h2>
              <p className="text-xs text-center">{value.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section> */}

      {/* How We Work */}
      {/* <section className="w-full relative h-[30rem] overflow-hidden">
        <Image
          className="size-full object-cover z-0 bg-fixed"
          src={"/new-images/banner.jpg"}
          alt="Promo Section"
          width={1200}
          height={800}
        />
        <div className="size-full absolute inset-0 flex items-center justify-center  z-10 backdrop-blur-md">
          <div className="wrapper grid grid-cols-2 gap-40 py-10 !font-primary max-sm:grid-cols-1 max-sm:gap-5 max-sm:max-w-[90%]">
            <div className="space-y-5">
              <motion.span
                variants={fadeUpVarient(0.05)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-accent inline-block bg-fixed text-white text-xs px-3 py-1.5 tracking-widest"
              >
                HOW WE WORK
              </motion.span>

              <motion.h3
                variants={fadeUpVarient(0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl font-medium text-white"
              >
                Book a trek easily with just a few steps
              </motion.h3>

              <motion.p
                variants={fadeUpVarient(0.11)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm text-white"
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea
                vel, asperiores dolorem dolorum incidunt eos eum et
              </motion.p>

              <motion.div
                variants={fadeUpVarient(0.14)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border-t border-dashed border-gray-400 w-full"
              ></motion.div>

              <motion.div
                variants={fadeUpVarient(0.17)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Button
                  theme="accent"
                  className="min-w-40 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] !rounded-lg"
                >
                  Book Now
                </Button>
              </motion.div>
            </div>

            <div>
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
                className="space-y-7"
              >
                {[1, 2, 3].map((_, index) => (
                  <motion.li
                    variants={childVariant}
                    key={index}
                    className="flex items-start gap-6"
                  >
                    <div className="size-12">
                      <div className="size-10 bg-accent text-white rounded-full flex items-center justify-center">
                        <span>{index + 1}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h2 className="font-medium text-2xl text-white">
                        Find your trek
                      </h2>
                      <p className="text-[0.8rem] text-gray-500 tracking-wider text-white">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Laudantium consectetur.
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </div>
      </section> */}

      {/* Promo Section */}
      <section className="w-full relative h-[28rem] overflow-hidden pimg">
        {/* <Image
          className="size-full object-cover z-0 bg-fixed"
          src={"/new-images/banner.jpg"}
          alt="Promo Section"
          width={1200}
          height={800}
        /> */}
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

              {/* <motion.p
                variants={fadeUpVarient(0.11)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm text-white"
              >
                Find your trek {"->"} Choose Your Desired Date {"->"} Fillup
                Form {"->"} Get Ready for Adventure
              </motion.p> */}

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
                {/* <Button
                  theme="accent"
                  className="min-w-40 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] !rounded-lg"
                >
                  Book Now
                </Button> */}
                {/* <button className="bg-emerald-500 min-w-40 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg transition">
                  Book Now
                </button> */}
                <Button
                  className={`min-w-[10rem] transition-all duration-1000 max-sm:min-[8rem] max-sm:pl-3 !bg-accent !text-white`}
                >
                  <BiBookContent />
                  Book Now
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* <PromoSection /> */}

      <div className="h-16 max-sm:h-7" />

      {/* Our Packages */}
      <React.Suspense fallback={<Loading />}>
        <OurPackages searchParams={searchParams} />
      </React.Suspense>

      <div className="h-16 max-sm:h-7" />

      {/* <div className="h-10 max-sm:h-7" /> */}

      {/* Our Stories */}
      <section className="wrapper space-y-5">
        {/* <HeadingSubHeding
          withIcon
          heading="Latest Stories"
          subheading="Discover the experiences of our Trekkers."
        /> */}

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

          {/* <div className="flex items-center justify-end text-accent-2">
            <Link
              href={"/trekking-in-sikkim"}
              className="border-b flex items-center justify-center"
            >
              Explore More
              <GoArrowDownLeft className="rotate-180 ml-1.5" />
            </Link>
          </div> */}
        </div>

        <TrekkerVideos />

        {/* <div className="flex items-center justify-center">
         
          <Button theme="accent">
            Load More
            <FaCaretDown />
          </Button>
        </div> */}
      </section>

      <div className="h-16 max-sm:h-7" />

      {/* Testimonials */}
      {/* <section className="wrapper space-y-10 font-primary">

        <div className="grid grid-cols-2 font-primary max-sm:grid-cols-1">
          <div className="space-y-1.5">
            <motion.h2
              variants={fadeUpVarient(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-semibold font-primary text-4xl max-sm:text-3xl text-accent-2"
            >
              Testimonials
            </motion.h2>
            <motion.p
              variants={fadeUpVarient(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-accent-2"
            >
              Discover what our customers are saying about our services.
            </motion.p>
          </div>

          <div className="flex items-center justify-end text-accent-2">
            <Link
              href={"/trekking-in-sikkim"}
              className="border-b flex items-center justify-center"
            >
              Read More Testimonials
              <GoArrowDownLeft className="rotate-180 ml-1.5" />
            </Link>
          </div>
        </div>

        <Slider />
      </section> */}

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

          {/* <div className="flex items-center justify-end text-accent-2">
            <Link
              href={"/trekking-in-sikkim"}
              className="border-b flex items-center justify-center"
            >
              Read More Article
              <GoArrowDownLeft className="rotate-180 ml-1.5" />
            </Link>
          </div> */}
        </div>

        <React.Suspense fallback={<Loading />}>
          <LatestBlogs />
        </React.Suspense>
      </section>

      {/* <ArticleSection /> */}

      <div className="h-16 max-sm:h-7" />

      <section className="w-full bg-light-gray p-12 max-sm:px-3">
        <section className="wrapper space-y-10">
          <HeadingSubHeding
            // withIcon={false}
            heading="Frequently Asked Questions"
          />

          <ExpandCollapseFaq />
        </section>
      </section>
    </main>
  );
}
