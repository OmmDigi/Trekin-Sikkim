import React from "react";
import Image from "next/image";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

import * as motion from "motion/react-client";
import { childVariant, parentVariant } from "@/utils/animations";
import { cn } from "@/lib/utils";

const destinations = [
  {
    id: 1,
    img: "/videos/image3.jpg",
    css: "",
    heading: "Serengeti Ikoma",
  },
  {
    id: 2,
    img: "/videos/image2.jpg",
    css: "row-span-2",
    heading: "Serengeti National Park",
  },
  {
    id: 3,
    img: "/videos/image4.jpg",
    css: "",
    heading: "Seronera Basecamp",
  },
  {
    id: 4,
    img: "/videos/image1.jpg",
    css: "",
    heading: "Destination 4",
  },
  {
    id: 5,
    img: "/videos/image5.jpg",
    css: "",
    heading: "Destination 5",
  },
  // {
  //   id: 6,
  //   img: "/videos/image5.jpg",
  //   css: "",
  //   heading: "Destination 5",
  // },
  // {
  //   id: 7,
  //   img: "/videos/image2.jpg",
  //   css: "",
  //   heading: "Destination 4",
  // },
];

function TrekkerVideos() {
  return (
    <motion.ul
      variants={parentVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="w-full grid grid-cols-3 gap-6 max-sm:grid-cols-2"
    >
      {destinations.map((item) => (
        <motion.li
          variants={childVariant}
          key={item.id}
          className={cn("relative overflow-hidden rounded-xl", item.css)}
        >
          <Image
            className="size-full object-cover"
            src={item.img}
            alt=""
            height={1200}
            width={1200}
          />
          <div className="w-full cursor-pointer fade-gradient-bottom absolute inset-0 flex items-center justify-center">
            <MdOutlinePlayCircleFilled size={35} className="text-white" />
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default TrekkerVideos;
