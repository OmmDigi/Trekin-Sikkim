import { cn } from "@/lib/utils";
import { TSteps } from "@/types";

interface StepperProps {
  currentStep: number;
  steps: TSteps[];
  onClick?: (clickedStep: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  steps,
  onClick,
}) => {
  return (
    <div className="relative flex w-full items-center justify-between">
      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => {
            onClick?.(step.id);
          }}
          className={cn(
            "relative flex flex-col items-center text-sm cursor-pointer",
            currentStep > step.id && "text-primary",
            currentStep === step.id && "font-semibold text-yellow-500"
          )}
        >
          {/* <div
            className={cn(
              'absolute top-1/2 left-1/2 z-0 h-0.5 w-full -translate-x-1/2 -translate-y-1/2 bg-border',
              index < steps.length - 1 && 'block',
              currentStep > step.id && 'bg-green-500' // Green line for completed sections
            )}
          /> */}
          <div
            className={cn(
              "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border",
              currentStep > step.id &&
                "bg-primary text-primary-foreground border-primary",
              currentStep === step.id &&
                "bg-yellow-500 text-primary-foreground border-yellow-500"
            )}
          >
            {currentStep > step.id ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.97 3.97 7.473-9.848a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              step.id
            )}
          </div>
          <div className="mt-2">{step.label}</div>
        </button>
      ))}
      {/* <div className="h-0.5 left-10 w-[60%] bg-primary absolute top-4"></div> */}
    </div>
  );
};
