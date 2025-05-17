import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

type ParamsType = {
  apiPath: string;
  method: "post" | "put" | "delete" | "patch";
  id?: number;
  formData?: FormData | any;
  headers?: object;
  onSuccess?: (data: IResponse<any>) => void;
  onError?: () => void;
};

async function submitInformationToServer<T>(params: ParamsType) {
  const response = await api.request({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${params.apiPath}${
      params.id ? `/${params.id}` : ""
    }`,
    method: params.method,
    headers: {
      ...params.headers,
    },
    data: params.formData,
  });

  return {
    onSuccess: params.onSuccess,
    response: response.data as IResponse<T>,
  };
}

export const useDoMutation = <T = any>(
  onGSuccess?: (data: IResponse<T>) => void,
  onGError?: (error: AxiosError<IResponse>) => void,
  hideToastError?: boolean
) => {
  const { mutate, isLoading } = useMutation(submitInformationToServer<T>, {
    onSuccess: (data) => {
      onGSuccess?.(data.response);
      if (data.onSuccess) {
        data.onSuccess(data.response);
      }
      toast.success(data.response.message);
    },
    onError: (error: AxiosError<IResponse>) => {
      onGError?.(error);
      if (!hideToastError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  return { mutate, isLoading };
};
