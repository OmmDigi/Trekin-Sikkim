import AboutStatsCard from "@/components/About/AboutStatsCard";
import {
  Award,
  Compass,
  Leaf,
  LifeBuoy,
  MapPin,
  Mountain,
  ShieldCheck,
  User,
  Users,
  WalletMinimal,
} from "lucide-react";
import React from "react";
import * as motion from "motion/react-client";
import HeadingSubHeding from "@/components/HeadingSubHeding";
import { fadeUpVarient } from "@/utils/animations";
import ImageSlider from "@/components/Utils/ImageSlider";
import ReadMoreToggle from "@/components/Utils/ReadMoreToggle";
import Button from "@/components/Button";
import { FaCaretDown } from "react-icons/fa6";
import ReadMoreContent from "@/components/Utils/ReadMoreContent";
import ReadMore from "@/components/Utils/ReadMore";
import MissionVision from "@/components/MissionVision";

const ABOUT_US_IMAGES = [
  "/about/about-image-1.jpg",
  "/about/about-image-2.webp",
  "/about/about-image-3.webp",
  "/about/about-image-4.webp",
];

const WHY_CHOOSE_US = [
  {
    icon: <User size={18} />,
    heading: "Well-Experienced Staff",
    description:
      "Our team of professional and trained tour operators ensures a smooth and enriching trekking experience with deep knowledge of the terrain.",
  },
  {
    icon: <ShieldCheck size={18} />,
    heading: "Trustworthy & Reliable Services",
    description:
      "We value your trust and always prioritize your safety and comfort, offering dependable services every step of the way.",
  },
  {
    icon: <WalletMinimal size={18} />,
    heading: "Affordable Yet High-Quality",
    description:
      "Enjoy premium services without breaking the bank. We maintain the highest standards while keeping our rates budget-friendly.",
  },
  {
    icon: <LifeBuoy size={18} />,
    heading: "Safety-First Approach",
    description:
      "We never compromise on safety. Treks only begin under favorable weather and temperature conditions to ensure a secure journey.",
  },
  {
    icon: <MapPin size={18} />,
    heading: "Thorough Pre-Survey of Routes",
    description:
      "Each route is carefully inspected by our team beforehand to eliminate surprises and ensure smooth navigation throughout the trek.",
  },
  {
    icon: <Leaf size={18} />,
    heading: "Environmental & Social Responsibility",
    description:
      "We believe in responsible tourism, keeping the environment safe while also supporting local communities and businesses.",
  },
];

export default function page() {
  return (
    <main className="wrapper mx-auto pt-16 space-y-3 overflow-visible">
      <section className="wrapper font-primary rounded-4xl p-10 pb-10 max-sm:pb-8 max-sm:space-y-8 max-sm:px-2.5">
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
                    Glacier Treks And Adventure is the most diverse, creative,
                    and realistic tour trekking adventure service provider in
                    India
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
                      Let me introduce you to about the Glacier Treks &
                      Adventure company, This our company was run from since 15
                      years and founded by Mr. Kiran Gurung who was born in the
                      remote places in Sikkim and he has already his life mostly
                      spend in the mountain trekking and expedition, and this
                      company was run by a well dedicated mountain trekkers who
                      has still work as a mountain and trekking guide all over
                      the Indian Himalaya.
                    </p>

                    <ReadMoreContent className="space-y-2.5 leading-6 tracking-wide">
                      <p>So what is the aim of Glacier treks and Adventure? </p>
                      <p>
                        Our main aim is truly deliver the high quality service
                        with affordable price, and to share the mountain
                        experience to our valuable client or trekkers, and our
                        main aims to take to our client with safely summit the
                        top and bring back safely home,
                      </p>

                      <p>
                        What Glacier Treks and Adventure company is affiliated
                        with any govt and organisation
                      </p>
                      <p>
                        Yes Glacier Treks and Adventure company already
                        affiliated with department of Sikkim Tourism and
                        affiliated with other Organisation like TAAS, YTDC,
                        SAMA, IMF.
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
                images={ABOUT_US_IMAGES.map(item => ({url : item, alt_tag : "About Us Images"}))}
                sliderPreview={1}
                className="h-full w-full overflow-hidden rounded-bl-[4rem] rounded-tr-[4rem] max-sm:rounded-none"
              />
            </div>
          </ReadMore>
        </section>

        <div id="why_choose_us" className="space-y-8 mt-10">
          <HeadingSubHeding
            heading="Why To Choose Us"
            subheading="Embark on unforgettable adventures with confidence"
          />

          <ul className="grid grid-cols-3 font-montserrat gap-10 max-sm:grid-cols-1">
            {WHY_CHOOSE_US.map((item, index) => (
              <li key={index} className="space-y-2">
                <div className="size-10 bg-accent text-white flex items-center justify-center rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h2 className="font-semibold">{item.heading}</h2>
                  <h3 className="text-sm">{item.description}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="grid grid-cols-2 gap-12 font-montserrat max-sm:grid-cols-1 mt-16">
          <div className="space-y-2.5">
            <h4 className="font-display text-lg font-semibold max-sm:text-center bg-accent text-white p-1.5 px-5">
              Our Mission
            </h4>

            <p className="text-gray-600 text-sm max-sm:text-center">
              To continuously enhance our trekking services through the
              dedication of our experienced team, aiming to deliver high levels
              of customer satisfaction. We strive to create memorable
              experiences for our clients while also empowering our staff and
              uplifting local communities by involving them in our services.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-display text-lg font-semibold max-sm:text-center bg-accent text-white p-1.5 px-5">
              Our Vision
            </h4>
            <p className="text-gray-600 text-sm max-sm:text-center">
              To become a trusted name in trekking experiences by offering
              valuable, unforgettable journeys that support local economies and
              encourage sustainable tourism. We envision every trek as an
              opportunity to create cherished memories and promote community
              growth through simple gestures like buying local souvenirs.
            </p>
          </div>
        </div> */}

        <div id="mission_vision"></div>
        <MissionVision />
      </section>

      <h5 className="text-center text-gray-600 text-xs pb-10 font-montserrat">
        Glacier Treks & Adventure company it was established in 2012,
      </h5>
    </main>
  );
}
