"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { IResponse } from "@/types";
import { IBookingDetails } from "@/features/bookings/types";
import LoadingHandler from "@/components/LoadingHandler";
import { AxiosError } from "axios";
import { formatDateToReadable } from "@/components/utils/formatDateToReadable";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ButtonLoading } from "@/components/ui/button-loading";

const searchFormSchema = z.object({
  search_text: z.string().min(1, { message: "Add Search Text" }),
  search_by: z.enum(["name", "email", "phone_number"]),
});

type TSearch = z.infer<typeof searchFormSchema>;

const getBookingList = async (searchParams: ReadonlyURLSearchParams) => {
  return (await api.get("/api/v1/booking/list?" + searchParams.toString()))
    .data;
};

export default function Bookings() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const routes = useRouter();
  const form = useForm<TSearch>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search_by: "name",
      search_text: "",
    },
  });

  const { data, isFetching, error } = useQuery<
    IResponse<IBookingDetails[]>,
    AxiosError<IResponse>
  >({
    queryKey: ["booking-list", searchParams.toString()],
    queryFn: () => getBookingList(searchParams),
  });


  const onSubmit = (formValue: TSearch) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(formValue.search_by, formValue.search_text);

    startTransition(() => {
      routes.push(`/dashboard/bookings?${newSearchParams.toString()}`);
    });
  };


  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">All Bookings</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-3"
          >
            <FormField
              control={form.control}
              name="search_by"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Search By</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue defaultValue="name" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone_number">Phone Number</SelectItem>
                      <SelectItem value="order_id">Order ID</SelectItem>
                      <SelectItem value="transition_id">
                        Transition ID
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="search_text"
              render={({ field }) => (
                <FormItem className="flex-1">
                  {/* <FormLabel>{form.watch("search_by")}</FormLabel> */}
                  <Input
                    placeholder={`Search By ${form.watch("search_by")}`}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <ButtonLoading loading={isPending}>Search</ButtonLoading>
          </form>
        </Form>
      </div>

      {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}

      <ScrollArea className="w-full whitespace-nowrap pb-3.5">
        <LoadingHandler
          loading={isFetching}
          error={error}
          length={data?.data.length}
        >
          <Table className="w-max">
            <TableHeader>
              <TableRow className="*:min-w-52 *:bg-primary *:text-secondary">
                <TableHead className="sticky top-0 left-0 z-20">
                  PACKAGE NAME
                </TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>PHONE NUMBER</TableHead>
                <TableHead>EMAIL</TableHead>
                <TableHead>NUMBER OF PERSONS</TableHead>
                <TableHead>DATE</TableHead>
                {/* <TableHead>DEPARTURE DATE</TableHead> */}
                {/* <TableHead>ADDRESS</TableHead> */}
                {/* <TableHead>TRIP TYPE</TableHead> */}
                <TableHead>GROUP TYPE</TableHead>
                <TableHead>ADDITIONAL THINGS</TableHead>
                <TableHead>AMOUNT PAID</TableHead>
                <TableHead>TRANSITION ID</TableHead>
                <TableHead>ORDER ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map((booking) => (
                <TableRow key={booking.order_id}>
                  <TableCell className="font-medium sticky top-0 left-0 z-20 bg-white flex items-center gap-2.5">
                    {/* <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={"bookings/TISHY123"}>
                          <Button>
                            <Eye size={18} />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Expand Information</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider> */}
                    <span>{booking.package_name}</span>
                  </TableCell>
                  <TableCell className="font-medium sticky top-0">
                    {booking.user_name}
                  </TableCell>
                  <TableCell>{booking.user_contact_number}</TableCell>
                  <TableCell>{booking.user_email}</TableCell>
                  <TableCell>
                    <span className="text-wrap line-clamp-2">
                      {booking.number_of_person}
                    </span>
                  </TableCell>
                  <TableCell>
                    {booking.booking_dates?.map((eachDate, index) => (
                      <span>
                        {index !== 0 ? ", " : ""}
                        {formatDateToReadable(eachDate.from_date)} -{" "}
                        {formatDateToReadable(eachDate.to_date)}
                      </span>
                    ))}
                  </TableCell>
                  {/* <TableCell>{info.departure_date}</TableCell> */}
                  {/* <TableCell>
                    <span className="text-wrap line-clamp-1">
                      {info.address.slice(0, 80)}..
                    </span>
                  </TableCell> */}
                  <TableCell>{booking.trip_type}</TableCell>
                  {/* <TableCell>{info.group_type}</TableCell> */}
                  {/* <TableCell>
                    <span className="text-wrap line-clamp-1">
                      {info.message.slice(0, 80)}..
                    </span>
                  </TableCell> */}
                  <TableCell>
                    {booking.additional_information?.map((eachDate, index) => (
                      <span>
                        {index !== 0 ? " + " : ""} {eachDate.additional_name}
                      </span>
                    ))}
                  </TableCell>

                  <TableCell>₹{booking.amount}</TableCell>

                  <TableCell>{booking.transactionid}</TableCell>
                  <TableCell>{booking.order_id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </LoadingHandler>

        <ScrollBar className="z-30" orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
