import { getRefreshToken } from "@/actions/cookies";
import { NAV_OPTIONS } from "@/constant";
import { LogIn, UserRound } from "lucide-react";

interface IProps {
  children: React.ReactNode;
}

async function AuthProvider({ children }: IProps) {
  const accessToken = await getRefreshToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/is-login`,
    {
      headers: {
        Cookie: `refreshToken=${accessToken}`,
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    NAV_OPTIONS[8] = {
      id: 8,
      icon: <LogIn size={14} />,
      text: "Sign In",
      pathname: "/auth/login",
    };
  } else {
    NAV_OPTIONS[8] = {
      id: 8,
      pathname: "/account",
      text: "Account",
      icon: <UserRound size={15} />,
    };
  }

  return <>{children}</>;
}

export default AuthProvider;
