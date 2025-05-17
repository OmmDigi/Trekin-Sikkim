import { TMediaWhereToUse } from "@/types";
import { z } from "zod";

export const departureDateSchema = z.object({
  for_month: z
    .string()
    .min(1, {
      message: "For The Month is Required",
    })
    .max(50),
  from_date: z.string().min(1, { message: "Form Date Is Required" }),
  to_date: z.string().min(1, { message: "To Date Is Required" }),
  max_seats: z.number().min(1),
  avilibility_text: z.string().optional(),
  avilibility_color : z.enum(["Red", "Green", "Yellow"])
  // additional_ids: z.array(z.number()).optional(),
});

export type TDepartureDate = z.infer<typeof departureDateSchema>;

export interface IDepartureDateResponse extends TDepartureDate {
  id: number;
}

export interface IPackgeFAQ {
  id: number;
  package_id: number;
  faq_heading: string;
  faq_detail?: string;
  created_at: string;
}

export interface IPackageGallery {
  id: number;
  package_id: number;
  media_item_id: number;
  where_to_use: TMediaWhereToUse;
}

export interface IPackgeItinerary {
  id: number;
  package_id: number;
  itinerary_heading: string;
  itinerary_subheading: string;
  itinerary_details?: string;
  created_at: string;
}

export type TGalleryItemRole = {
  isOpen: boolean;
  id: number;
};

export interface IPackageOtherOption {
  id: number;
  package_id: number;
  option_name: string;
  option_content?: string;
}


export interface IPackageList {
  id: number;
  package_name: string;
  duration: string;
  short_description: string;
  thumbnail: string | null;
  highest_altitude : string;
  alt_tag: string | null;
}