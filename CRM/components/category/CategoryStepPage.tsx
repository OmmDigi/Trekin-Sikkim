"use client";

import { TSteps } from "@/types";
import FaqEditor from "../package/FaqEditor";
import { Stepper } from "../Stepper";
import { CategoryBasicInfo } from "./CategoryBasicInfo";
import AddGalleryItem from "../package/AddGalleryItem";
import EditCategoryPageContent from "./EditCategoryPageContent";

interface IProps {
  category_id: number;
  step: number;
}
const STEPS: TSteps[] = [
  { id: 1, label: "Basic Information" },
  { id: 2, label: "FAQ" },
  { id: 3, label: "Banner Info" },
  { id: 4, label: "Page Content" },
];

export default function CategoryStepPage({ category_id, step }: IProps) {
  return (
    <div className="space-y-10 relative">
      <Stepper
        currentStep={step}
        steps={STEPS.map((item) => ({
          id: item.id,
          label: item.label,
        }))}
      />

      {step === 1 ? (
        <CategoryBasicInfo category_id={category_id} currentStep={step} />
      ) : step === 2 ? (
        <FaqEditor
          currentStep={step}
          keyName="category_id"
          getEndpoint="/api/v1/category/faq/"
          deleteEndPoint="/api/v1/category/faq"
          getSingleItemEndPoint="/api/v1/category/faq-one/"
          putEndPoint="/api/v1/category/faq"
          postEndPoint="/api/v1/category/faq"
        />
      ) : step === 3 ? (
        <AddGalleryItem
          currentStep={step}
          keyName="category_id"
          heading="Add Banner Items"
          getEndpoint="/api/v1/category/gallery/"
          deleteEndPoint="/api/v1/category/gallery"
          getSingleItemEndPoint="/api/v1/category/gallery-one/"
          putEndPoint="/api/v1/category/gallery"
          postEndPoint="/api/v1/category/gallery"
        />
      ) : step === 4 ? (
        <EditCategoryPageContent currentStep={step} />
      ) : null}
    </div>
  );
}
