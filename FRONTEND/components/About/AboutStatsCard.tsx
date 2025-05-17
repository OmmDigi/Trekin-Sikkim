import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AboutStatsCardProps {
  number: string;
  text: string;
  icon?: ReactNode;
  className?: string;
}

//bg-[#ffd23071]
const AboutStatsCard = ({
  number,
  text,
  icon,
  className,
}: AboutStatsCardProps) => {
  return (
    <div
      className={cn(
        "p-6 flex items-center gap-4 max-sm:flex-col bg-accent rounded-lg text-white card-shdow max-sm:justify-center max-sm:items-center max-sm:px-2.5",
        className
      )}
    >
      {icon ? (
        <div className="p-3 bg-transparent rounded-lg ">{icon}</div>
      ) : null}

      <div>
        <h4 className="font-display text-lg font-semibold max-sm:text-center">
          {number}
        </h4>
        <p className=" text-sm max-sm:text-center">{text}</p>
      </div>
    </div>
  );
};

export default AboutStatsCard;
