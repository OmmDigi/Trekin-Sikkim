import BookingPage from "@/components/Booking/BookingPage";
import { serverApi } from "@/lib/serverApi";
import { IResponse } from "@/types";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function page() {
  const headersList = headers();
  const currentUrl = await (await headersList).get("referer");

  const api = await serverApi();

  try {
    await api.get("/api/v1/users/is-login");
  } catch (error) {
    const err = error as AxiosError<IResponse>;
    if (err.status === 401) redirect(`/auth/login?redirect=${currentUrl}`);
    throw new Error(err.response?.data.message);
  }

  return <BookingPage />;
}
