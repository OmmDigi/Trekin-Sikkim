import uploadApi from "@/lib/upload-api";
import { IResponse, IUploadedFile } from "@/types";
import { AxiosError } from "axios";

interface IProps<E = AxiosError<IResponse>> {
  files: File[];
  folder: string;

  onUploading?: (percent: number) => void;
  onUploaded?: (result: IUploadedFile[]) => void;
  onError?: (error: E) => void;

  convartToWebp?: boolean;
}

export const uploadFiles = async ({
  files,
  folder,
  onUploaded,
  onUploading,
  convartToWebp = false,
  onError
}: IProps) => {
  let data: IUploadedFile[] = [];
  let error: AxiosError<IResponse> | null = null;

  const fileArray = Array.from(files);

  const formData = new FormData();

  formData.set("folder", folder);

  fileArray.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await uploadApi.post<IResponse<IUploadedFile[]>>(
      "/api/v1/upload/multiple",
      formData,
      {
        onUploadProgress(progressEvent) {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / (total || 0));
          onUploading?.(percentCompleted);
        },
      }
    );

    if (onUploaded) {
      onUploaded(response.data.data);
    }

    data = response.data.data;
  } catch (error) {
    error = error as AxiosError<IResponse>;
    onError?.(error as AxiosError<IResponse>)
  } finally {
    return { data, error };
  }
};
