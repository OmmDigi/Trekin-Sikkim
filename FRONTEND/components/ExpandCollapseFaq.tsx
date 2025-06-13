import { HOME_FAQS } from "@/constant";
import { Collapsible } from "./Utils/Collapsible";
import { CollapsibleItem } from "./Utils/CollapsibleItem";
import ViewFromHtml from "./ViewFromHtml";

function ExpandCollapseFaq() {
  return (
    <Collapsible className="flex items-center justify-center flex-col font-primary max-w-[60rem] mx-auto space-y-4">
      {HOME_FAQS.map((faq, index) => (
        <CollapsibleItem key={faq.id} index={index} heading={faq.question}>
          <div key={faq.id} className="flex items-start gap-4 w-full">
            <ViewFromHtml
              className="prose max-w-none w-full"
              html={faq.answer}
            />
          </div>
        </CollapsibleItem>
      ))}
    </Collapsible>
  );
}

export default ExpandCollapseFaq;
