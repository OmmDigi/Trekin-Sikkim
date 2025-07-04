import axios from "axios";
import { getRefreshToken } from "@/actions/cookies";

export async function wordpressApi() {
  const accessToken = await getRefreshToken();

  return axios.create({
    baseURL:
      (typeof window !== "undefined"
        ? process.env.NEXT_PUBLIC_WORDPRESS_API
        : process.env.INNER_WORDPRESS_API) || "https://blog.trekinsikkim.in",
    headers: {
      "Content-Type": "application/json",
      // Cookie: `refreshToken=${accessToken}`,
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
}
