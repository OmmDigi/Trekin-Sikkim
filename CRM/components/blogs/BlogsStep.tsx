"use client";

import { TSteps } from "@/types";
import { Stepper } from "../Stepper";
import BlogBasicInfo from "./BlogBasicInfo";

interface IProps {
  blog_id: number;
  step: number;
}

const STEPS: TSteps[] = [
  { id: 1, label: "Basic Information" },
  { id: 3, label: "Images" },
];

export default function BlogsStep({ blog_id, step }: IProps) {
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
        <BlogBasicInfo blog_id={blog_id} currentStep={step} />
      ) : null}
    </div>
  );
}
