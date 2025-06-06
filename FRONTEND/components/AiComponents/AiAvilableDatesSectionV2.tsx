// import React from "react";
// import Tabs from "../Tabs";
// import { IPackageInfoSearchParams, IResponse } from "@/types";
// import api from "@/lib/axios";
// import { formatDateToReadable } from "../Utils/formatDateToReadable";
// import { cn } from "@/lib/utils";
// import {
//   Calendar,
//   Clock,
//   Users,
//   CheckCircle,
//   AlertCircle,
//   XCircle,
//   MapPin,
//   Star,
// } from "lucide-react";
// import AvilableDateCheckbox from "../Packages/AvilableDateCheckbox";
// import Button from "../Button";

// interface IProps {
//   package_id: number;
//   searchParams: IPackageInfoSearchParams;
// }

// interface IDepartureDate {
//   id: number;
//   package_id: number;
//   for_month: string;
//   from_date: string;
//   to_date: string;
//   max_seats: number;
//   avilibility_text: string;
//   avilibility_color: "Red" | "Green" | "Yellow";
// }

// const getAvailabilityIcon = (color: "Red" | "Green" | "Yellow") => {
//   switch (color) {
//     case "Green":
//       return <CheckCircle className="w-4 h-4 text-green-500" />;
//     case "Yellow":
//       return <AlertCircle className="w-4 h-4 text-yellow-500" />;
//     case "Red":
//       return <XCircle className="w-4 h-4 text-red-500" />;
//     default:
//       return <CheckCircle className="w-4 h-4 text-green-500" />;
//   }
// };

// const getAvailabilityStyles = (color: "Red" | "Green" | "Yellow") => {
//   switch (color) {
//     case "Green":
//       return {
//         bg: "bg-green-50 border-green-200 hover:bg-green-100",
//         text: "text-green-700",
//         badge: "bg-green-100 text-green-800 border-green-200",
//       };
//     case "Yellow":
//       return {
//         bg: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
//         text: "text-yellow-700",
//         badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
//       };
//     case "Red":
//       return {
//         bg: "bg-red-50 border-red-200 hover:bg-red-100",
//         text: "text-red-700",
//         badge: "bg-red-100 text-red-800 border-red-200",
//       };
//     default:
//       return {
//         bg: "bg-green-50 border-green-200 hover:bg-green-100",
//         text: "text-green-700",
//         badge: "bg-green-100 text-green-800 border-green-200",
//       };
//   }
// };

// interface IServerResponse {
//   month : string;
//   year : string;
//   departuredates : {
//     id : number;
//     package_id : number;
//     from_date : string;
//     to_date : string;
//     max_seats : number;
//     avilibility_color : string;
//     avilibility_text : string;
//   }[]
// }

// export default async function AiAvilableDatesSectionV2({
//   package_id,
//   searchParams,
// }: IProps) {
//   const newSearchParams = new URLSearchParams();
//   if (searchParams.month) {
//     newSearchParams.set("for_month", searchParams.month);
//   }

//   const dateInfo = (
//     await api.get<
//       IResponse<IServerResponse[]>
//     >(
//       `/api/v1/package/departure-date-v2/${package_id}?${newSearchParams.toString()}`
//     )
//   ).data;

//   // If no dates available, show empty state
//   if (dateInfo.data.length === 0) {
//     return (
//       <div className="text-center py-12 px-6">
//         <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <Calendar className="w-8 h-8 text-gray-400" />
//         </div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//           No Dates Available
//         </h3>
//         <p className="text-gray-600">
//           We're currently updating our schedule. Please check back soon or
//           contact us for custom dates.
//         </p>
//         <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//           Contact Us
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header with Stats */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h3 className="text-xl font-bold text-gray-900 mb-1">
//             Available Dates
//           </h3>
//           <p className="text-gray-600 text-sm">
//             Choose your preferred departure date from{" "}
//             {dateInfo.data.dates_info.length} available options
//           </p>
//         </div>

//         {/* Quick Stats */}
//         <div className="flex items-center gap-4 text-sm">
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             <span className="text-gray-600">Available</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//             <span className="text-gray-600">Limited</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//             <span className="text-gray-600">Full</span>
//           </div>
//         </div>
//       </div>

//       {/* Month Tabs */}
//       <div className="bg-gray-50 rounded-xl p-1">
//         <Tabs
//           selectedTabCss="bg-white shadow-sm !text-blue-600 !font-semibold border border-gray-200"
//           scroll={false}
//           selectedItemId={searchParams.month}
//           options={dateInfo.data.months.map((avilableMonth) => ({
//             id: avilableMonth,
//             text: avilableMonth,
//             slug: `?month=${avilableMonth}`,
//           }))}
//         />
//       </div>

//       {/* Dates Grid */}
//       <div className="grid gap-4">
//         {dateInfo.data.dates_info.map((item, index) => {
//           const styles = getAvailabilityStyles(item.avilibility_color);
//           const isDisabled = item.avilibility_color === "Red";

//           return (
//             <div
//               key={item.id}
//               className={cn(
//                 "relative rounded-xl border-2 p-6 transition-all duration-200",
//                 styles.bg,
//                 !isDisabled && "hover:shadow-md cursor-pointer",
//                 isDisabled && "opacity-60 cursor-not-allowed"
//               )}
//             >
//               {/* Popular Badge */}
//               {/* {index === 0 && item.avilibility_color === "Green" && (
//                 <div className="absolute -top-2 left-6">
//                   <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//                     <Star className="w-3 h-3 fill-current" />
//                     Most Popular
//                   </div>
//                 </div>
//               )} */}

//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                 {/* Date Information */}
//                 <div className="flex-1">
//                   <div className="flex items-start gap-4">
//                     {/* Calendar Icon */}
//                     <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200 flex-shrink-0">
//                       <Calendar className="w-6 h-6 text-blue-600" />
//                     </div>

//                     {/* Date Details */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 mb-2">
//                         <h4 className="text-lg font-semibold text-gray-900">
//                           {formatDateToReadable(item.from_date)} -{" "}
//                           {formatDateToReadable(item.to_date)}
//                         </h4>
//                         {getAvailabilityIcon(item.avilibility_color)}
//                       </div>

//                       <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           <span>{item.for_month}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Users className="w-4 h-4" />
//                           <span>Max {item.max_seats} seats</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Availability Status and Action */}
//                 <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                   {/* Status Badge */}
//                   <div
//                     className={cn(
//                       "inline-flex items-center gap-2 px-3 py-2 rounded-lg border font-medium text-sm",
//                       styles.badge
//                     )}
//                   >
//                     {getAvailabilityIcon(item.avilibility_color)}
//                     <span className={styles.text}>{item.avilibility_text}</span>
//                   </div>

//                   {/* Action Button */}
//                   <div className="flex items-center gap-3">
//                     {isDisabled ? null : (
//                       <>
//                         <AvilableDateCheckbox
//                           key={searchParams.date_id}
//                           date_id={item.id}
//                         />
//                         <span className="text-sm font-medium text-gray-700 hidden sm:block">
//                           Choose
//                         </span>
//                       </>
//                     )}

//                     {/* <AvilableDateCheckbox date_id={item.id} /> */}
//                     {/* {!isDisabled ? (
//                       <Button className="!bg-red-600 !text-white">
//                         Choose Date
//                       </Button>
//                     ) : null} */}

//                     {/* {!isDisabled && (
//                       <span className="text-sm font-medium text-gray-700 hidden sm:block">
//                         Select Date
//                       </span>
//                     )} */}
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Info for Popular Dates */}
//               {/* {index === 0 && item.avilibility_color === "Green" && (
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <MapPin className="w-4 h-4 text-blue-500" />
//                     <span>
//                       Perfect weather conditions • Experienced guide included
//                     </span>
//                   </div>
//                 </div>
//               )} */}
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer Note */}
//       <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//         <div className="flex items-start gap-3">
//           <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//             <Calendar className="w-4 h-4 text-blue-600" />
//           </div>
//           <div>
//             <h4 className="font-semibold text-blue-900 mb-1">
//               Booking Information
//             </h4>
//             <p className="text-blue-700 text-sm">
//               Dates are subject to weather conditions and minimum group
//               requirements. We recommend booking early as popular dates fill up
//               quickly.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
