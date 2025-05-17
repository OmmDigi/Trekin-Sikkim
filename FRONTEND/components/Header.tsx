import NavItem from "./NavItem";
import { NAV_OPTIONS } from "@/constant";
import StickyHeaderHolder from "./StickyHeaderHolder";
import MobileNavSlider from "./MobileNavSlider";
import Button from "./Button";
import { MessageCircleQuestion } from "lucide-react";
import HandleDialogBtn from "./Dialogs/HandleDialogBtn";
import api from "@/lib/axios";
import { ICategories, IResponse, NavOptions } from "@/types";

export default async function Header() {
  const { data: categoriesInfo } = await api.get<IResponse<ICategories[]>>(
    "/api/v1/category"
  );

  const trekHeadings: NavOptions[] = [];
  const tourHeadings: NavOptions[] = [];
  const expeditionHeadings: NavOptions[] = [];

  categoriesInfo.data.forEach((item) => {
    if (item.category_type === "Tour") {
      tourHeadings.push({
        id: item.category_id,
        pathname: `/${item.slug}`,
        text: item.category_name,
      });
    } else if (item.category_type === "Trek") {
      trekHeadings.push({
        id: item.category_id,
        pathname: `/${item.slug}`,
        text: item.category_name,
      });
    } else {
      expeditionHeadings.push({
        id: item.category_id,
        pathname: `/${item.slug}`,
        text: item.category_name,
      });
    }
  });

  if (trekHeadings.length !== 0) {
    NAV_OPTIONS[1].submenu = trekHeadings;
  }
  if (tourHeadings.length !== 0) {
    NAV_OPTIONS[2].submenu = tourHeadings;
  }
  if (expeditionHeadings.length !== 0) {
    NAV_OPTIONS[3].submenu = expeditionHeadings;
  }

  return (
    <StickyHeaderHolder>
      <div className="flex items-center justify-between py-5 wrapper">
        <h1 className="font-montserrat font-semibold text-subheading max-sm:text-xl transition-none">
          TrekInSikkim.
        </h1>

        <MobileNavSlider>
          <ul className="space-y-4 mt-4">
            {NAV_OPTIONS.map((option, index) => (
              <NavItem
                index={index}
                className="!text-lg"
                key={option.id}
                option={option}
              />
            ))}
          </ul>
        </MobileNavSlider>

        <nav className="max-sm:hidden">
          <ul className="max-sm:hidden flex items-center gap-0 transition-none">
            {NAV_OPTIONS.map((option, index) => (
              <NavItem index={index} key={option.id} option={option} />
            ))}
          </ul>
        </nav>

        <HandleDialogBtn id="enquiry-form" action_type="OPEN">
          <Button theme="white" className="flex items-center gap-2 text-black">
            <MessageCircleQuestion size={15} />
            <span>Enquiry</span>
          </Button>
        </HandleDialogBtn>
      </div>
    </StickyHeaderHolder>
  );
}

// `<div className="fixed wrapper left-0 right-0 z-[1000]">
//       {/* <div className="py-2.5 space-y-4 max-sm:space-y-5 z-[80]">
//         <div className="flex items-center justify-between wrapper">
//           <div className="flex items-center gap-14">
//             <h1 className="font-montserrat font-semibold text-subheading max-sm:text-xl">
//               TrekInSikkim.
//             </h1>

//             <ul className="max-sm:hidden font-primary font-[400] text-body flex items-center gap-5">
//               {POLICY_LIST.map((option) => (
//                 <li key={option.id}>
//                   <Link href={option.pathname}>{option.text}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="flex items-center gap-3.5 h-full">
//             <MobileNavSlider>
//               <ul className="space-y-4 mt-4">
//                 {NAV_OPTIONS.map((option) => (
//                   <NavItem
//                     className="!text-lg"
//                     key={option.id}
//                     option={option}
//                   />
//                 ))}
//               </ul>
//             </MobileNavSlider>
//             <TransitionLink href={"/auth/login"}>
//               <button className="text-text-primary border active:scale-90 border-gray-300 text-body py-1.5 px-5 rounded-full max-sm:bg-primary max-sm:text-secondary">
//                 Sign in
//               </button>
//             </TransitionLink>
//             <TransitionLink href={"/auth/signup"}>
//               <button className="text-primary bg-accent border active:scale-90 border-gray-600 text-body py-1.5 px-5 rounded-full max-sm:hidden">
//                 Sign Up
//               </button>
//             </TransitionLink>
//           </div>
//         </div>
//       </div> */}

//       {/* New Header */}
//       <StickyHeaderHolder>
//         {/* <ShdowOnSticky className="py-2.5"> */}
//         <div className="flex items-center justify-between wrapper py-2.5">
//           {/* <SearchBar /> */}

//           <h1 className="font-montserrat font-semibold text-subheading text-white max-sm:text-xl">
//             TrekInSikkim.
//           </h1>

//           <nav>
//             <ul className="max-sm:hidden flex items-center gap-3 text-white">
//               {NAV_OPTIONS.map((option) => (
//                 <NavItem key={option.id} option={option} />
//               ))}
//             </ul>
//           </nav>
//         </div>
//         {/* </ShdowOnSticky> */}
//       </StickyHeaderHolder>`;
