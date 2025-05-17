export type TSteps = {
  id: number;
  label: string;
};

export type TMediaWhereToUse = "gallery" | "banner";

export type ChoosedMediaItem = {
  media_id: number;
  where_to_use: TMediaWhereToUse;
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
