// "use client";
// import { cn } from "@/lib/utils";
// import { Calendar } from "lucide-react";
// import { useRef, useState } from "react";

// export default function DateInput({
//   className,
//   ...props
// }: React.ComponentProps<"input">) {
//   //   const inputRef = useRef<HTMLInputElement>(null);
//   const [selected, setSelected] = useState<Date>();

//   return (
//     <div
//       className={cn(
//         "relative flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition outline-none md:text-sm",
//         "border-input file:text-foreground placeholder:text-muted-foreground",
//         "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/50",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
//       )}
//     >
//       {/* <input
//         type="date"
//         className={cn("flex-1 bg-transparent outline-none", className)}
//         {...props}
//       /> */}

// <Calendar
//                     mode="single"
//                     selected={selected}
//                     onSelect={(date) => setSelected(date.currentTarget.va)}
//                     disabled={(date) =>
//                       date > new Date() || date < new Date("1900-01-01")
//                     }
//                     initialFocus
//                   />

//       <button
//         type="button"
//         // onClick={() => {
//         //   inputRef.current?.showPicker?.(); // Safe method
//         // }}
//         className="absolute right-3 top-0 bottom-0 flex items-center"
//       >
//         <Calendar size={15} />
//       </button>
//     </div>
//   );
// }
