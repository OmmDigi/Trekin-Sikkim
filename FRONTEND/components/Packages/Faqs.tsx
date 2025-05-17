import React from "react";
import { Collapsible } from "../Utils/Collapsible";
import api from "@/lib/axios";
import { IFaq, IResponse } from "@/types";
import { CollapsibleItem } from "../Utils/CollapsibleItem";

interface IProps {
  package_id: number;
}

export default async function Faqs({ package_id }: IProps) {
  const faqs = (
    await api.get<IResponse<IFaq[]>>(
      `/api/v1/package/faq/${package_id}?withContent=true`
    )
  ).data;

  return (
    <Collapsible className="!max-w-full">
      {faqs.data.map((faq, index) => (
        <CollapsibleItem key={faq.id} index={index} heading={faq.faq_heading}>
          <span
            dangerouslySetInnerHTML={{ __html: faq.faq_detail || "no" }}
          ></span>
        </CollapsibleItem>
      ))}
    </Collapsible>
  );
}
