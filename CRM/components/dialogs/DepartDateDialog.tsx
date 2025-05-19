import React, { useEffect, useState, useTransition } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDoMutation } from "@/hooks/useDoMutation";
import { ButtonLoading } from "../ui/button-loading";
import { useSearchParams } from "next/navigation";
import {
  departureDateSchema,
  IDepartureDateResponse,
  TDepartureDate,
} from "@/features/package/schemaAndTypes";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import LoadingLayout from "../LoadingLayout";
import LoadingHandler from "../LoadingHandler";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { MONTH_LIST } from "@/constant";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  departure_date_id: number;
}

const getSingleDepartureDate = async (departure_date_id: number) => {
  return (
    await api.get("/api/v1/package/departure-date-one/" + departure_date_id)
  ).data;
};

export default function DepartDateDialog({
  isOpen,
  setOpen,
  departure_date_id,
}: IProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const packageId = parseInt(searchParams.get("package_id") || "0");
  const { mutate } = useDoMutation();

  const form = useForm<TDepartureDate>({
    resolver: zodResolver(departureDateSchema),
    defaultValues: {
      for_month: "",
      from_date: "",
      to_date: "",
      max_seats: 0,
      avilibility_text: "",
      avilibility_color : "Green"
    },
  });

  const { error, isFetching } = useQuery<
    IResponse<IDepartureDateResponse>,
    AxiosError<IResponse>
  >({
    queryKey: ["single-departure-date", departure_date_id],
    queryFn: () => getSingleDepartureDate(departure_date_id),
    enabled: departure_date_id !== 0,
    onSuccess(data) {
      form.reset({
        for_month: data.data.for_month,
        from_date: data.data.from_date,
        to_date: data.data.to_date,
        max_seats: data.data.max_seats,
        avilibility_text: data.data.avilibility_text,
        avilibility_color : data.data.avilibility_color
      });
    },
  });

  useEffect(() => {
    if (departure_date_id === 0) {
      form.reset({
        for_month: "",
        from_date: "",
        to_date: "",
        max_seats: 0,
        avilibility_text: "Avilable",
        avilibility_color : "Green"
      });
    }
  }, [departure_date_id]);

  const onSubmit = (values: TDepartureDate) => {
    if (departure_date_id === 0) {
      startTransition(() => {
        mutate({
          apiPath: "/api/v1/package/departure-date",
          method: "post",
          formData: {
            package_id: packageId,
            ...values,
          },
          onSuccess() {
            setOpen(false);
            queryClient.invalidateQueries({
              queryKey: ["get-departure-dates"],
            });
          },
        });
      });
      return;
    }

    startTransition(() => {
      mutate({
        apiPath: "/api/v1/package/departure-date",
        method: "put",
        formData: {
          package_id: packageId,
          ...values,
        },
        id: departure_date_id,
        onSuccess() {
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ["get-departure-dates"] });
        },
      });
    });
  };

  useEffect(() => {

     const today = new Date();
     const year = today.getFullYear();
     const month = MONTH_LIST.indexOf(form.watch("for_month")) + 1;
     const formattedDate = `${year}-${month.toString().padStart(2, '0')}-01`;
     form.setValue("from_date", formattedDate);
     form.setValue("to_date", formattedDate)

  }, [form.watch("for_month")])

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Add New Item</DialogTitle>
        <LoadingHandler error={error} length={1} loading={isFetching}>
          <ScrollArea className="max-h-[80vh]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-4"
              >
                <FormField
                  control={form.control}
                  name="for_month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>For The Month *</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose Month Name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MONTH_LIST.map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="from_date"
                    // defaultValue={currentMonthDate}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Date *</FormLabel>
                        <FormControl className="w-full">
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="to_date"
                    // defaultValue={currentMonthDate}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To Date *</FormLabel>
                        <FormControl className="w-full">
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="max_seats"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Seats *</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseInt(e.currentTarget.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="avilibility_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avilibility Text</FormLabel>
                        <FormControl className="w-full">
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="avilibility_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avilibility Text Color *</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Choose Color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["Green", "Red", "Yellow"].map((color) => (
                              <SelectItem key={color} value={color}>
                                {color}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <ButtonLoading loading={isPending} type="submit">
                  Submit
                </ButtonLoading>
              </form>
            </Form>
          </ScrollArea>
        </LoadingHandler>
      </DialogContent>
    </Dialog>
  );
}
