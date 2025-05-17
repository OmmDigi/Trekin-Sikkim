"use client";

import { ButtonLoading } from "@/components/ui/button-loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { requestResetPassword } from "@/features/auth/api/auth";
import { TForgotPassword } from "@/features/auth/types";
import { resetPasswordFormSchema } from "@/features/auth/validator/authValidator";
import { IResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const form = useForm<TForgotPassword>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      user_email: "", //
    },
  });

  const [isPending, startTransition] = useTransition();
  const route = useRouter();

  const { mutate, isLoading } = useMutation<
    IResponse,
    AxiosError<IResponse>,
    TForgotPassword
  >({
    mutationFn: requestResetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      startTransition(() => {
        route.push("/auth/login");
      });
    },
    onError: (error) => {
      const key = error.response?.data.key;
      const message = error.response?.data.message;
      if (!key) return form.setError("root", { message });
      form.setError(key as any, { message });
    },
  });

  const onSubmit = ({ user_email }: TForgotPassword) => {
    mutate({ user_email });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email below for the password you want to reset.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="user_email"
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid gap-2">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="m@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="space-y-1">
                      <ButtonLoading
                        loading={isLoading || isPending}
                        type="submit"
                        className="w-full"
                      >
                        Request Password Reset Link
                      </ButtonLoading>

                      <FormRootError className="text-center" />
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
