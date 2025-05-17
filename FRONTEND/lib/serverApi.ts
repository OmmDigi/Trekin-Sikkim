// lib/serverApi.ts
import api from "./axios";
import { getRefreshToken } from "@/actions/cookies";

export async function serverApi() {
  const accessToken = await getRefreshToken();

  return api.create({
    headers: {
      Cookie: `refreshToken=${accessToken}`,
    },
  });
}
