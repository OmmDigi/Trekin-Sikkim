"use client";

import SpinnerSvg from "../SpinnerSvg";
import { useLogout } from "./Logout";

interface IProps {
  size?: string;
}

export default function LogoutLoader({ size = "20px" }: IProps) {
  const { isPrograssing } = useLogout();
  return isPrograssing ? <SpinnerSvg size={size} /> : null;
}
