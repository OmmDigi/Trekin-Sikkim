import React, { useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pencil, Plus, Trash, Upload } from "lucide-react";
import ItineraryForm from "./ItineraryForm";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import api from "@/lib/axios";
import { IPackgeItinerary } from "@/features/package/schemaAndTypes";
import LoadingHandler from "../LoadingHandler";
import LinkButton from "../link-button";
import { useDoMutation } from "@/hooks/useDoMutation";
import { ButtonLoading } from "../ui/button-loading";
import { uploadFiles } from "../utils/uploadFiles";
import { toast } from "react-toastify";

interface IProps {
  currentStep: number;
}

const getPackageItinerary = async (package_id: number) => {
  return (await api.get("/api/v1/package/itinerary/" + package_id)).data;
};

export default function Itinerary({ currentStep }: IProps) {
  const searchParams = useSearchParams();
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentItinerayId, setCurrentItineraryId] = useState(0);

  const packageId = parseInt(searchParams.get("package_id") || "0");

  const { data, error, isFetching, refetch } = useQuery<
    IResponse<IPackgeItinerary[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-package-itinerary"],
    queryFn: () => getPackageItinerary(packageId),
  });

  const { isLoading, mutate } = useDoMutation();
  const handleItineraryDelete = (itinerayId: number) => {
    if (!confirm("Are you sure you want to delete this package itinerary ?"))
      return;
    setCurrentItineraryId(itinerayId);
    mutate({
      apiPath: "/api/v1/package/itinerary",
      method: "delete",
      id: itinerayId,
      onSuccess() {
        refetch();
      },
    });
  };

  const { mutate: uploadItinerary } = useDoMutation(
    () => {},
    () => {},
    false,
    true
  );
  const [isItineraryUploading, startItineraryUploading] = useTransition();

  const handleUploadInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading...");

    startItineraryUploading(() => {
      uploadFiles({
        files: [file],
        folder: "ItineraryPdf",
        onUploading(percent) {
          toast.update(toastId, {
            render: `Uploading... ${percent}%`,
            progress: percent,
          });
        },
        onUploaded(result) {
          uploadItinerary({
            apiPath: "/api/v1/package/itinerary/upload-pdf",
            method: "post",
            formData: {
              package_id: packageId,
              file_link: result[0].downloadUrl,
            },
            onSuccess() {
              toast.update(toastId, {
                render: "Itinerar Pdf Has Successfully Uploaded",
                type: "success",
                isLoading: false,
                autoClose: 3000,
              });
            },
          });
        },
        onError(error) {
          toast.update(toastId, {
            render: error.response?.data.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        },
      });
    });
  };

  return (
    <div className="space-y-7">
      {isFormOpen ? (
        <ItineraryForm
          setIsFormOpen={setIsFormOpen}
          itinerayId={currentItinerayId}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Trip Itinerary</h1>

            <div className="flex items-center gap-5">
              <ButtonLoading
                onClick={() => {
                  if (!uploadInputRef.current)
                    return alert("No Upload Input Ref Has Found");

                  uploadInputRef.current.click();
                }}
                variant="secondary"
                loading={isItineraryUploading}
              >
                <Upload />
                Upload Itinerary Pdf
              </ButtonLoading>
              <input
                onChange={handleUploadInputChange}
                accept="application/pdf"
                type="file"
                ref={uploadInputRef}
                className="hidden"
              />
              <Button
                onClick={() => {
                  setCurrentItineraryId(0);
                  setIsFormOpen(true);
                }}
              >
                <Plus />
                Add Trip Itinerary
              </Button>
            </div>
          </div>

          <LoadingHandler
            length={data?.data.length}
            error={error}
            loading={isFetching}
            noDataMsg="No Package Itinerary Found"
          >
            <Table>
              <TableHeader>
                <TableRow className="*:uppercase">
                  <TableHead>Heading</TableHead>
                  <TableHead>Subheading</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((itinerary) => (
                  <TableRow key={itinerary.id}>
                    <TableCell className="font-medium">
                      {itinerary.itinerary_heading}
                    </TableCell>
                    <TableCell>{itinerary.itinerary_subheading}</TableCell>
                    <TableCell className="text-right flex items-center justify-end gap-4">
                      <Button
                        onClick={() => {
                          setCurrentItineraryId(itinerary.id);
                          setIsFormOpen(true);
                        }}
                      >
                        <Pencil size={12} />
                      </Button>
                      <ButtonLoading
                        loading={
                          isLoading && currentItinerayId === itinerary.id
                        }
                        onClick={() => handleItineraryDelete(itinerary.id)}
                        variant="destructive"
                      >
                        <Trash size={12} />
                      </ButtonLoading>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </LoadingHandler>

          <div className="flex items-center justify-between">
            <LinkButton
              variant="secondary"
              href={`${packageId}?step=${
                currentStep - 1
              }&package_id=${packageId}`}
            >
              Previous
            </LinkButton>
            <LinkButton
              href={`${packageId}?step=${
                currentStep + 1
              }&package_id=${packageId}`}
            >
              Save & Next
            </LinkButton>
          </div>
        </>
      )}
    </div>
  );
}
