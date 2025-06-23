export interface ITabOptions {
  id: number | string;
  icon?: React.ReactNode;
  text: string;
  slug?: string;
}

export type NavOptions = {
  id: number | string;
  icon?: React.JSX.Element;
  text: string;
  pathname: string;
  submenu?: NavOptions[];
};

export type TDialogAction = "OPEN" | "CLOSE";

export type TDialogID =
  | "mobile_filter"
  | "gallery_view"
  | "enquiry-form"
  | "view-booked-package-info"
  | "view-booking-info";

export type TBookingForms =
  | "personal-info"
  | "participants-info"
  | "addon-info"
  | "payments";

export interface IResponse<T = null> {
  data: T;
  statusCode: number;
  message: string;
  success: boolean;
  key?: string;
  totalPage?: number;
}

export interface IPackageListInfo {
  id: number;
  package_name: string;
  duration: string;
  short_description: string;
  highest_altitude: string;
  thumbnail: string | null;
  alt_tag: string;
  package_slug: string;
  category_slug: string;
  category_id: number;
}

export interface IAccountInfo {
  user_id: number;
  user_name: string;
  user_email: string;
  profile_image: null | string;
  user_contact_number: string;
  address: string | null;
  enrolled_packages: IPackageListInfo[];
}

export interface IUploadedFile {
  url: string;
  downloadUrl: string;
  pathname: string;
  contentType?: string;
  contentDisposition: string;
}

export interface ICategories {
  category_id: number;
  category_name: string;
  category_type_id: number;
  category_type: string;
  slug: string;
}

export interface IMediaItem {
  media_item_id: number;
  media_type: string;
  item_link: string;
  alt_tag: null | string;
}

export interface IAdditional {
  additional_id: number;
  additional_name: string;
  price_inr: number;
  price_usd: number;
}

export interface IOtherOptionsList {
  id: number;
  option_name: string;
}
export interface IPackage {
  id: number;
  package_name: string;
  duration: string;
  short_description: string;
  region: string;
  best_time: string;
  highest_altitude: string;
  suitable_for: string;
  trek_distance: string;
  original_price_inr: string;
  offer_price_inr: string;
  original_price_usd: string;
  offer_price_usd: string;
  is_active: number;
  category_id: number;
  trip_type: "Trip" | "Tour" | "Expedition";
  slug: string;
  additional: IAdditional[];
  banner_info: IMediaItem[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical: null | string;
  other_option_names: IOtherOptionsList[];
  itinerary_pdf_link: null | string;
}

export interface IFaq {
  id: number;
  package_id?: number;
  faq_heading: string;
  faq_detail?: string;
  created_at: string;
}

export interface IPackageInfoSearchParams {
  month: string;
  date_id: string;
}

type UserInfo = {
  user_name: string;
  user_email: string;
  user_contact_number: string;
  address: string | null;
  dial_code: string | null;
};
type PackageInfo = {
  package_id: number;
  package_name: string;
  original_price_inr: string;
  offer_price_inr: string;
  offer_price_usd: string;
  original_price_usd: string;
};
type DatesInfo = {
  from_date: string; // ISO 8601 format
  to_date: string; // ISO 8601 format
};
type AdditionalInfo = {
  total_addon_price_inr: string;
  total_addon_price_usd: string;
};

export interface IBooking {
  userInfo: UserInfo;
  packageInfo: PackageInfo;
  datesInfo: DatesInfo | undefined;
  additionalInfo: AdditionalInfo | undefined;
}

export interface IBlog {
  blog_id: number;
  heading: string;
  sub_heading?: string;
  meta_description: string;
  meta_keywords: string;
  created_at: string; // ISO 8601 format
  thumbnail: string; // URL
  visible: boolean;
  thumbnail_alt_tag: string;
  slug: string;
}

export interface ISingleBlog {
  blog_id: number;
  heading: string;
  sub_heading?: string;
  blog_content: string; // HTML content of the blog
  thumbnail: string; // URL to the thumbnail image
  meta_title: string; // Title for SEO
  meta_description: string; // Description for SEO
  meta_keywords: string; // Keywords for SEO
  meta_canonical_url: string; // Canonical URL for SEO
  created_at: string; // ISO 8601 format date
  visible: boolean; // Visibility status
  thumbnail_alt_tag: string; // Alternative text for the thumbnail
  slug: string; // URL-friendly version of the blog title
}

export interface AdditionalInformation {
  order_id: string;
  additional_id: number;
  additional_name: string;
  price_inr: number;
  price_usd: number;
}

export interface BookingDate {
  order_id: string;
  from_date: string; // ISO date string
  to_date: string; // ISO date string
}

export interface IParticipantInfo {
  order_id: string;
  participant_name: string;
  participant_email: string;
  participant_number: string;
}

export interface IBookingDetails {
  order_id: string;
  trip_type: string;
  user_name: string;
  user_contact_number: string;
  user_email: string;
  package_name: string;
  amount: string;
  transactionid: string;
  number_of_person: string;
  additional_information: AdditionalInformation[] | null;
  booking_dates: BookingDate[];
  participant_info: IParticipantInfo[] | null;
}

export interface UpcomingTrekPackage {
  id: number;
  package_name: string;
  category_slug: string;
  package_slug: string;
  thumbnail: string;
  duration: string;
  short_description: string;
  highest_altitude: string;
  alt_tag: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface GalleryDialogProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

