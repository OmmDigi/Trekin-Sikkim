"use client";

import BasicInfo from "./BasicInfo";
import { Stepper } from "../Stepper";
import DepartureDate from "./DepartureDate";
import FaqEditor from "./FaqEditor";
import Itinerary from "./Itinerary";
import { useRouter, useSearchParams } from "next/navigation";
import OtherSteps from "./OtherSteps";
import Overview from "./Overview";
import AddGalleryItem from "./AddGalleryItem";
import MangeSeoItem from "./MangeSeoItem";

const STEPS = [
  { id: 1, label: "Basic Information", comp: <BasicInfo currentStep={1} /> },
  { id: 2, label: "Departure Date", comp: <DepartureDate currentStep={2} /> },
  { id: 3, label: "Overview", comp: <Overview currentStep={3} /> },
  { id: 4, label: "Trip Itinerary", comp: <Itinerary currentStep={4} /> },
  {
    id: 5,
    label: "FAQ",
    comp: (
      <FaqEditor
        currentStep={5}
        keyName="package_id"
        getEndpoint="/api/v1/package/faq/"
        deleteEndPoint="/api/v1/package/faq"
        getSingleItemEndPoint="/api/v1/package/faq-one/"
        putEndPoint="/api/v1/package/faq"
        postEndPoint="/api/v1/package/faq"
      />
    ),
  },
  {
    id: 6,
    label: "Gallery",
    comp: (
      <AddGalleryItem
        currentStep={6}
        keyName="package_id"
        heading="Add Package Gallery"
        getEndpoint="/api/v1/package/gallery/"
        deleteEndPoint="/api/v1/package/gallery"
        getSingleItemEndPoint="/api/v1/package/gallery-one/"
        putEndPoint="/api/v1/package/gallery"
        postEndPoint="/api/v1/package/gallery"
      />
    ),
  },
  {
    id: 7,
    label: "SEO",
    comp: <MangeSeoItem currentStep={7} />,
  },
  { id: 8, label: "Other Options", comp: <OtherSteps currentStep={8} /> },
];

export default function SinglePackageInfoHolder() {
  const searchParams = useSearchParams();
  const route = useRouter();
  const currentStep = parseInt(searchParams.get("step") || "1");

  return (
    <div className="space-y-10 relative">
      <Stepper
        currentStep={currentStep}
        onClick={(clickedStep) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("step", clickedStep.toString());
          route.push(`?${newSearchParams.toString()}`);
        }}
        steps={STEPS.map((item) => ({
          id: item.id,
          label: item.label,
        }))}
      />

      {STEPS[currentStep - 1].comp}
    </div>
  );
}
