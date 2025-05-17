import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { IAddAddition, IAddition } from "@/features/addition/types";
import {
  addNewAddition,
  getAddition,
  updateAddition,
} from "@/features/addition/api/addition";
import { toast } from "react-toastify";
import { ButtonLoading } from "../ui/button-loading";
import LoadingLayout from "../LoadingLayout";
import { useEffect } from "react";

interface IProps {
  additional_id: number;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price_inr: z.coerce
    .number()
    .min(0, "Price INR must be greater than or equal to 0")
    .refine((val) => !isNaN(val), { message: "Invalid price value" }),
  // price_type_id: z.number().min(1)
  price_usd: z.coerce
    .number()
    .min(0, "Price USD must be greater than or equal to 0")
    .refine((val) => !isNaN(val), { message: "Invalid price value" }),
});

type FormType = z.infer<typeof formSchema>;

export default function AdditionalDialog({
  additional_id,
  isOpen,
  setOpen,
}: IProps) {
  const queryClient = useQueryClient();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price_inr: 0,
      price_usd: 0,
    },
  });

  useEffect(() => {
    form.reset({
      name: "",
      price_inr: 0,
      price_usd: 0,
    });
  }, [additional_id]);

  const { isFetching, error } = useQuery<IResponse<IAddition | null>>({
    queryKey: ["get-single-addition", additional_id],
    queryFn: () => getAddition(additional_id),
    enabled: additional_id !== 0,
    onSuccess(data) {
      form.reset({
        name: data.data?.additional_name || "",
        price_inr: data.data?.price_inr || 0,
        price_usd: data.data?.price_usd || 0,
      });
    },
  });

  if (error) {
    throw error;
  }

  const { mutate: doCreateAdditional, isLoading: isCreating } = useMutation<
    IResponse,
    AxiosError<IResponse>,
    IAddAddition
  >({
    mutationFn: addNewAddition,
    onSuccess: (data) => {
      toast.success(data.message);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-additionals"] });
    },
    onError: (error) => {
      const key = error.response?.data.key || "root";
      const message = error.response?.data.message;
      form.setError(key as any, { message });
    },
  });

  const { mutate: doUpdateAddition, isLoading: isUpdating } = useMutation<
    IResponse,
    AxiosError<IResponse>,
    IAddition
  >({
    mutationFn: updateAddition,
    onSuccess: (data) => {
      toast.success(data.message);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["get-additionals"] });
    },
    onError: (error) => {
      const key = error.response?.data.key || "root";
      const message = error.response?.data.message;
      form.setError(key as any, { message });
    },
  });

  const onSubmit = (values: FormType) => {
    if (additional_id === 0) {
      doCreateAdditional({
        additional_name: values.name,
        price_inr: values.price_inr,
        price_usd: values.price_usd,
      });
      return;
    }
    doUpdateAddition({
      additional_id,
      additional_name: values.name,
      price_inr: values.price_inr,
      price_usd: values.price_usd,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Addition Thing Info</DialogTitle>
        </DialogHeader>

        {isFetching ? (
          <LoadingLayout />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Thing Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Additional Thing Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-2">
                {/* <FormField
                  control={form.control}
                  name="price_type_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Type</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value.toString()}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue defaultValue="image" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">INR</SelectItem>
                          <SelectItem value="2">USD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="price_inr"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Price INR</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Price ₹"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            const parsedValue = parseInt(value);
                            field.onChange(
                              isNaN(parsedValue) ? 0.0 : parsedValue
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price_usd"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Price USD</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Price $"
                          onChange={(e) => {
                            const value = e.currentTarget.value;
                            const parsedValue = parseInt(value);
                            field.onChange(
                              isNaN(parsedValue) ? 0.0 : parsedValue
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <ButtonLoading loading={isCreating || isUpdating} type="submit">
                Submit
              </ButtonLoading>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
