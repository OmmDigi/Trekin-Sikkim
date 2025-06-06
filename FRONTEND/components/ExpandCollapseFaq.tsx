"use client";

import React, { useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";
import * as motion from "motion/react-client";
import { fadeUpVarient } from "@/utils/animations";
import { cn } from "@/lib/utils";

function ExpandCollapseFaq() {
  const [expandIndex, setExpandIndex] = useState(-1);

  const onToggle = (index: number) => {
    setExpandIndex((prev) => (prev === index ? -1 : index)); // Toggle logic
  };

  return (
    <ul className="flex items-center justify-center flex-col font-primary max-w-[60rem] mx-auto space-y-4">
      {[1, 2, 3, 4, 5].map((faq, index) => (
        <motion.li
          variants={fadeUpVarient(0.05 * index)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={faq}
          className="flex items-start gap-4 border-b pb-4 w-full"
        >
          <span className="font-semibold text-xl">0{index + 1}</span>
          <div className="w-full">
            <h2
              className="font-semibold text-xl flex justify-between items-center cursor-pointer max-sm:text-sm"
              onClick={() => onToggle(index)}
            >
              Does this travel agency offer custom travel packages?
              {expandIndex === index ? <IoRemove /> : <IoAdd />}
            </h2>

            <div
              className={cn(
                "overflow-hidden",
                "transition-all duration-300",
                expandIndex === index ? "max-h-[500px]" : "max-h-0"
              )}
            >
              <p className="text-sm text-gray-700 mt-2 leading-7">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatem debitis assumenda inventore provident aut. Ipsum
                rerum soluta adipisci natus nam quasi, nulla, nihil ex iure
                animi repudiandae illum asperiores ratione. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Obcaecati, voluptas vel
                provident quia nobis ipsa? In, blanditiis? Porro, non, quibusdam
                est ad deleniti facere dolor eaque, rem animi nisi illo.
              </p>
            </div>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

export default ExpandCollapseFaq;
