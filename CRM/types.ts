export type TSteps = {
  id: number;
  label: string;
};

export type TMediaWhereToUse = "gallery" | "banner";

export type ChoosedMediaItem = {
  media_id: number;
  where_to_use: TMediaWhereToUse;
  item_link: string;
  alt_tag: string;
};

export interface IChoosedMediaItem {
  selectedMedia: ChoosedMediaItem[];
}

export interface IResponse<T = null> {
  data: T;
  statusCode: number;
  message: string;
  success: boolean;
  key?: string;
  totalPage?: number;
}

export type TMediaTypes = "image" | "youtube-link";

export interface IUploadedFile {
  url: string;
  downloadUrl: string;
  pathname: string;
  contentType?: string;
  contentDisposition: string;
}

export type BlogPost = {
  blog_id: number; // SERIAL PRIMARY KEY
  heading: string; // VARCHAR(255) NOT NULL
  sub_heading? : string;
  blog_content: string; // TEXT NOT NULL
  thumbnail: string; // TEXT NOT NULL
  meta_title: string; // VARCHAR(255) NOT NULL
  meta_description: string; // TEXT NOT NULL
  meta_keywords: string; // TEXT NOT NULL
  meta_canonical_url?: string; // VARCHAR(255) NOT NULL
  created_at?: Date; // DATE DEFAULT CURRENT_DATE (optional)

  visible: boolean; // BOOLEAN NOT NULL DEFAULT TRUE
  thumbnail_alt_tag?: string; // VARCHAR(255) DEFAULT '' (optional)

  slug: string; // TEXT NOT NULL

  media_id: number;
};

export interface IEnquiry {
  id: number;
  name: string;
  email: string;
  contact_number: string;
  number_of_person: number;
  message: string | null;
  created_at: string;
}