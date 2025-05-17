"use client";

import CustomLink from "@/components/CustomLink";
import { Button } from "@/components/ui/button";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { usePathname } from "next/navigation";

interface IProps {
  error: AxiosError<IResponse>;
  // reset: () => void;
}

export default function error({ error }: IProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-1.5">
      <h2>Something Went Wrong Try Again</h2>
      <p className="text-gray-500">
        {error.isAxiosError ? error.response?.data.message : error.message}
      </p>
      <CustomLink href={pathname}>
        <Button>Reload</Button>
      </CustomLink>
    </div>
  );
}

// 'use client';

// import { Button } from "@/components/ui/button";

// export default function Error({ error, reset }: { error: Error; reset: () => void }) {
//   return (
//     <div>
//       <h2>Something went wrong!</h2>
//       <p>{error.message}</p>
//       <Button onClick={reset}>Try again</Button>
//     </div>
//   );
// }
