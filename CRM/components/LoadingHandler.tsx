import { IResponse } from "@/types";
import { AxiosError } from "axios";
import React from "react";
import LoadingLayout from "./LoadingLayout";
import { Button } from "react-day-picker";

interface IProps {
  children: React.ReactNode;
  loading: boolean;
  error: AxiosError<IResponse> | null;
  length: number | undefined;
  onReloadClick?: () => void;
  noDataMsg?: string;
}

function LoadingHandler({
  children,
  error,
  length,
  loading,
  onReloadClick,
  noDataMsg,
}: IProps) {
  return loading ? (
    <LoadingLayout />
  ) : error ? (
    <div className="">
      <h2 className="font-semibold text-">Something Went Wrong Try Again</h2>
      <p className="text-red-500">
        {error
          ? error.isAxiosError
            ? error.response?.data.message
            : error.message
          : "No Data Found"}
      </p>
      {onReloadClick ? <Button onClick={onReloadClick}>Reload</Button> : null}
    </div>
  ) : length === 0 ? (
    <p className="font-semibold text-gray-500 text-center pt-3">
      {noDataMsg ?? "No Data Found"}
    </p>
  ) : (
    children
  );
}

export default LoadingHandler;
