"use server";

import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string) => {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  (await cookies()).set(key, value, {
    expires,
    secure: process.env.NODE_ENV === "production" ? true : false,
    ...(process.env.NODE_ENV === "production"
      ? { sameSite: "lax", domain: process.env.DOMAIN || undefined }
      : { httpOnly: true }),
  });
};

// export const getAuthTokenServer = async () => {
//   const cookieStore = await cookies();
//   const loginInfo = cookieStore.get("login-info")?.value;
//   let token = "";
//   if (loginInfo) {
//     token = (JSON.parse(loginInfo) as IAccountInfo).token;
//   }
//   return {
//     Authorization: `Bearer ${token}`,
//   };
// };

export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  return refreshToken;
};

export const deleteCookie = async (key: string) => {
  (await cookies()).delete(key);
};
