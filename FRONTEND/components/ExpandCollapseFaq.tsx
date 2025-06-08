import React from "react";
import * as motion from "motion/react-client";
import { fadeUpVarient } from "@/utils/animations";
import { HOME_FAQS } from "@/constant";
import { Collapsible } from "./Utils/Collapsible";
import { CollapsibleItem } from "./Utils/CollapsibleItem";

function ExpandCollapseFaq() {
  return (
    <Collapsible className="flex items-center justify-center flex-col font-primary max-w-[60rem] mx-auto space-y-4">
      {HOME_FAQS.map((faq, index) => (
        <CollapsibleItem key={faq.id} index={index} heading={faq.question}>
          <motion.div
            variants={fadeUpVarient(0.05 * index)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            key={faq.id}
            className="flex items-start gap-4 w-full"
          >
            <p
              dangerouslySetInnerHTML={{
                __html: faq.answer,
              }}
              className="prose max-w-none w-full"
            ></p>
          </motion.div>
        </CollapsibleItem>
      ))}
    </Collapsible>
  );
}

export default ExpandCollapseFaq;
