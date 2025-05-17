import Banner from "@/components/Banner";
import Button from "@/components/Button";
import ExpandCollapseFaq from "@/components/ExpandCollapseFaq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeadingSubHeding from "@/components/HeadingSubHeding";
import TrekkerVideos from "@/components/Home/TrekkerVideos";
import Slider from "@/components/Slider";
import Tabs from "@/components/Tabs";
import { POPULER_PACKAGES, TOP_VALUES } from "@/constant";
import { childVariant, fadeUpVarient, parentVariant } from "@/utils/animations";

import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function test() {
  return (
    <main className="space-y-2.5">
      <Header />
      <Banner />

      {/* gap */}
      <div className="h-20" />

      {/* Top Values For You */}
      <section className="wrapper space-y-10 font-primary bg-light-gray rounded-4xl p-10 pb-20">
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
          className="flex items-center gap-5"
        >
          {TOP_VALUES.map((value) => (
            <motion.li
              variants={childVariant}
              key={value.id}
              className="flex items-center justify-center flex-col gap-1"
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
      </section>

      <div className="h-16" />

      {/* Our Packages */}
      <section className="wrapper space-y-10">
        <HeadingSubHeding
          withIcon
          heading="Affordable Packages"
          subheading="Explore The Most Popular & Affordable Packages"
        />
        {/* Category */}
        <Tabs
          options={[
            { id: 1, text: "Trekking in Sikkim" },
            { id: 2, text: "Trekking in Ladakh" },
            { id: 3, text: "Winter Treks In India" },
          ]}
        />

        <motion.ul
          variants={parentVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center gap-10 w-full flex-wrap"
        >
          {POPULER_PACKAGES.map((item) => (
            <motion.li
              variants={childVariant}
              key={item.id}
              className="w-full basis-56 h-80 overflow-hidden rounded-[.8rem] relative shadow-2xl group/item"
            >
              <Image
                className="size-full object-cover absolute inset-0 opacity-100 group-hover/item:opacity-0 group-hover/item:backdrop-blur-2xl transition-all duration-500"
                alt="Popular Places Of Treking"
                src={item.images[0]}
                height={1200}
                width={1200}
              />
              <Image
                className="size-full object-cover absolute inset-0 opacity-0 group-hover/item:scale-105 group-hover/item:s group-hover/item:opacity-100 transition-all group-hover/item:backdrop-blur-[0px] duration-500"
                alt="Popular Places Of Treking"
                src={item.images[1]}
                height={1200}
                width={1200}
              />

              <div className="inset-0 fade-gradient-bottom absolute">
                <div className="size-full flex flex-col justify-end px-4 py-4 relative gap-y-2">
                  <div className="flex items-center flex-wrap gap-y-3 gap-x-2.5">
                    <span className="text-white flex items-center gap-1">
                      <FaLocationDot size={10} />
                      <span className="text-xs leading-0">
                        {/* Frey Peak Expedition Sikkim */}
                        {item.name}
                      </span>
                    </span>
                    <span className="text-white flex items-center gap-1">
                      <MdOutlineRemoveRedEye size={10} />
                      <span className="text-xs leading-0">5.5K</span>
                    </span>
                  </div>

                  <Link
                    href={item.link}
                    className="flex items-center gap-2 text-accent text-xs font-primary font-[400] tracking-widest"
                  >
                    <span>View details</span>
                    <FaLongArrowAltDown className="-rotate-90" />
                  </Link>

                  {/* Price Floating Value */}
                  <span className="absolute top-2 right-2 font-montserrat font-semibold bg-accent backdrop-blur-lg px-2 py-1 text-xs rounded-full">
                    ₹2000
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex items-center justify-center">
          <Button theme="gray">Load More</Button>
        </div>
      </section>

      <div className="h-10" />

      {/* How We Work */}
      <section className="w-full bg-light-gray">
        <div className="max-w-[70rem] mx-auto grid grid-cols-2 gap-40 py-10 !font-primary">
          <div className="space-y-5">
            <motion.span
              variants={fadeUpVarient(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-primary inline-block text-secondary text-xs px-3 py-1.5 tracking-widest"
            >
              HOW WE WORK
            </motion.span>

            <motion.h3
              variants={fadeUpVarient(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-medium"
            >
              Book a trek easily with just a few steps
            </motion.h3>

            <motion.p
              variants={fadeUpVarient(0.11)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea vel,
              asperiores dolorem dolorum incidunt eos eum et
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
                theme="black"
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
                    <div className="size-10 bg-primary text-secondary rounded-full flex items-center justify-center">
                      <span>{index + 1}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-medium text-2xl">Find your trek</h2>
                    <p className="text-[0.8rem] text-gray-500 tracking-wider">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Laudantium consectetur.
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      <div className="h-10" />

      {/* Our Stories */}
      <section className="wrapper space-y-5">
        <HeadingSubHeding
          withIcon
          heading="Latest Stories"
          subheading="Discover the experiences of our Trekkers."
        />

        <TrekkerVideos />

        <div className="flex items-center justify-center">
          <Button theme="gray">Load More</Button>
        </div>
      </section>

      <div className="h-10" />

      {/* Testimonials */}
      <section className="wrapper space-y-10 font-primary">
        <HeadingSubHeding
          withIcon
          heading="Testimonials"
          subheading="Discover what our customers are saying about our services."
        />

        <Slider />
      </section>

      <div className="h-10" />

      <section className="w-full bg-light-gray p-12">
        <section className="wrapper space-y-10">
          {/* <h2 className="font-semibold font-primary text-4xl text-center">
            Frequently Asked Questions
          </h2> */}

          <HeadingSubHeding
            withIcon={false}
            heading="Frequently Asked Questions"
          />

          {/* <ExpandCollapseFaq>
            {[1, 2, 3].map((faq, index) => (
              // <li key={faq} className="flex items-start gap-4">
              //   <span className="font-semibold text-xl">0{index + 1}</span>

              //   <div>
              //     <h2 className="font-semibold text-xl">
              //       Does this travel agency offer custom travel packages?
              //       <IoAdd className="float-right top-0 cursor-pointer" />
              //     </h2>
              //     <p className="text-sm text-gray-500">
              //       Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              //       Nobis, in inventore. Fugit maxime dolores doloribus
              //       accusantium amet. ipsum dolor sit amet consectetur
              //       adipisicing elit. Nobis, in inventore. Fugit maxime dolores
              //       doloribus accusantium amet.
              //     </p>
              //   </div>
              // </li>
              <FaqItem key={faq} index={index} isExpanded={false}/>
            ))}
          </ExpandCollapseFaq> */}

          <ExpandCollapseFaq />
        </section>
      </section>

      <Footer />
    </main>
  );
}
