// "use client";

// import CustomLink from "@/components/CustomLink";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useTransition } from "react";

// export default function Home() {
//   const route = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const handleTestPage = () => {
//     startTransition(() => {
//       route.push("/test");
//     });
//   };

//   return (
//     <div className="flex items-center justify-center gap-3.5 h-svh">
//       <Button onClick={handleTestPage}>
//         {isPending ? <Loader2 className="animate-spin" /> : null}
//         Go Test Page
//       </Button>
//       <CustomLink href={"/test?step=1"}>
//         Change Search Params
//       </CustomLink>
//     </div>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>Welcome</div>
  )
}

