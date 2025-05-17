"use client";

import { Provider } from "react-redux";
import { reduxStore } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import AuthProvider from "@/features/auth/AuthProvider";
import LoadingDialog from "@/components/dialogs/LoadingDialog";

interface IProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: IProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // refetchOnMount: false,
        retry: false,
      },
    },
  });
  return (
    <Provider store={reduxStore}>
      <LoadingDialog />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}
