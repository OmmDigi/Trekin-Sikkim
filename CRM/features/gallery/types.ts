import { TMediaTypes } from "@/types";

export interface IGalleryItem {
    media_item_id : number;
    media_type : TMediaTypes;
    item_link : string;
    alt_tag : string;
}