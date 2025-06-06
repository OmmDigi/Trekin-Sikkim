"use client";

import { Pencil, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import DepartDateDialog from "../dialogs/DepartDateDialog";
import { ButtonLoading } from "../ui/button-loading";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import { IDepartureDateResponse } from "@/features/package/schemaAndTypes";
import { formatDateToReadable } from "../utils/formatDateToReadable";
import { useDoMutation } from "@/hooks/useDoMutation";
import LinkButton from "../link-button";
import LoadingHandler from "../LoadingHandler";
import { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IProps {
  currentStep: number;
}

const getDepartureDates = async (
  package_id: number,
  searchParams: ReadonlyURLSearchParams
) => {
  const newSearchParams = new URLSearchParams();
  const forMonth = searchParams.get("for_month");
  if (forMonth !== null) {
    newSearchParams.set("for_month", forMonth);
  } else {
    newSearchParams.set("for_month", "January");
  }
  return (
    await api.get(
      `/api/v1/package/departure-date/${package_id}?${newSearchParams.toString()}`
    )
  ).data;
};

export default function DepartureDate({ currentStep }: IProps) {
  const [isOpen, setOpen] = useState(false);
  const [currentDepartureDateId, setCurrentDepartureDateId] = useState(0);

  const searchParams = useSearchParams();
  const route = useRouter();
  const pathname = usePathname();
  const packageId = parseInt(searchParams.get("package_id") || "0");

  const { data, isFetching, error, refetch } = useQuery<
    IResponse<{ months: string[]; dates_info: IDepartureDateResponse[] }>,
    AxiosError<IResponse>
  >({
    queryKey: ["get-departure-dates", searchParams.toString()],
    queryFn: () => getDepartureDates(packageId, searchParams),
  });

  const { isLoading, mutate } = useDoMutation();

  const handleDelete = () => {
    mutate({
      apiPath: "/api/v1/package/departure-date",
      method: "delete",
      id: currentDepartureDateId,
      onSuccess() {
        refetch();
      },
    });
  };

  console.log(data)

  return (
    <>
      <DepartDateDialog
        isOpen={isOpen}
        setOpen={setOpen}
        departure_date_id={currentDepartureDateId}
      />
      <div className="space-y-7">
        <div className="flex items-center justify-between">
          <Select
            defaultValue="January"
            onValueChange={(value) => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set("for_month", value);
              route.push(`${pathname}?${newSearchParams.toString()}`);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by month" />
            </SelectTrigger>
            <SelectContent>
              {data?.data.months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setCurrentDepartureDateId(0);
              setOpen(true);
            }}
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
        <LoadingHandler
          error={error}
          loading={isFetching}
          length={data?.data.dates_info.length}
          noDataMsg="No Dates Has Found"
        >
          <Table>
            <TableHeader>
              <TableRow className="*:uppercase">
                <TableHead className="w-[100px]">For Month</TableHead>
                <TableHead>From Date</TableHead>
                <TableHead>To Date</TableHead>
                <TableHead>Max Seats</TableHead>
                <TableHead>Avilability Text</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.dates_info.map((departureDate) => (
                <TableRow key={departureDate.id}>
                  <TableCell className="font-medium">
                    {departureDate.for_month}
                  </TableCell>
                  <TableCell>
                    {formatDateToReadable(departureDate.from_date)}
                  </TableCell>
                  <TableCell>
                    {formatDateToReadable(departureDate.to_date)}
                  </TableCell>
                  <TableCell>{departureDate.max_seats}</TableCell>
                  <TableCell>{departureDate.avilibility_text}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-4">
                    <Button
                      onClick={() => {
                        setCurrentDepartureDateId(departureDate.id);
                        setOpen(true);
                      }}
                    >
                      <Pencil size={12} />
                    </Button>
                    <ButtonLoading
                      loading={isLoading}
                      onClick={() => {
                        setCurrentDepartureDateId(departureDate.id);
                        handleDelete();
                      }}
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
      </div>
    </>
  );
}
