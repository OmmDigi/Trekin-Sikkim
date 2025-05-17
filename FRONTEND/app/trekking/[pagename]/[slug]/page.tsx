import ExpandCollapseFaq from "@/components/ExpandCollapseFaq";
import PackageDetailsCard from "@/components/Overview/PackageDetailsCard";
// import TimeLine from "@/components/Overview/TimeLine";
import CheckBox from "@/components/Utils/CheckBox";
// import ImageSlider from "@/components/Utils/ImageSlider";
import React from "react";

// interface IProps {
//   params: Promise<{ slug: string }>;
// }

// const post_images = [
//   "/overview/image1.webp",
//   "/overview/image2.webp",
//   "/overview/image3.webp",
//   "/overview/image4.webp",
//   "/overview/image2.webp",
// ];

const inclusion = [
  "Accommodation at base camp with dinner and Breakfast",
  "Meals provide from company initial dinner to till last dinner and breakfast at Sri Khola",
  "Accomdation during on trek, Quard,Dormitory, (for the double and triple sharing bed room we can provide as for the situation during on big season we can&apos;t give assure provide of double sharing room,  this is alwasys depend upon the season)",
  "Meals on the trek will be freshly prepared are mix of Indian, Chinese & Continental.",
  "Professional trekking main guide and Assistent guide",
  "National Park fees etc",
];

const exclusion = [
  "Transportation pick and drop, ( On the request we can manage) and local sharing cab also available in the limit.",
  "Any domestic and international flight ticket.",
  "Any charges for personal carrying luggage and still/video cameras etc.",
  "Alcohol, soft drinks, bottled water, beverages, etc.",
];

export default function EachTrekking() {
  return (
    <main className="wrapper mx-auto pb-10 pt-5 space-y-3 overflow-visible">
      <section className="w-full flex gap-x-20 gap-y-3.5 overflow-visible flex-wrap">
        {/* Left Side */}
        <div className="flex-1">
          {/* <ul className="grid grid-cols-3 h-96 max-sm:grid-cols-2">
            {post_images.map((image, index) => (
              <li
                className={`${
                  index === 0 ? "row-span-3 max-sm:row-span-2" : ""
                } overflow-hidden p-1.5`}
                key={index}
              >
                <Image
                  className="size-full object-cover rounded-2xl"
                  src={image}
                  alt="Image"
                  width={1200}
                  height={1200}
                />
              </li>
            ))}
          </ul> */}
          {/* <ImageSlider images={post_images} sliderPreview={1} /> */}

          <section className="font-primary py-6 leading-7">
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
            {/* <TimeLine /> */}

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
          </section>
        </div>

        {/* Right Side */}
        <div className="p-1.5 sticky top-[4.3rem] z-10 h-fit overflow-visible max-sm:top-0">
          <PackageDetailsCard />
        </div>
      </section>
    </main>
  );
}
