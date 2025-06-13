"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import dynamic from "next/dynamic";

interface IProps {
  children: React.ReactNode;
}

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

const Bounce = dynamic(
  () => import("react-toastify").then((mod) => mod.Bounce),
  { ssr: false }
);

export default function ReduxProvider({ children }: IProps) {
  return (
    <Provider store={store}>
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
        theme="colored"
        transition={Bounce}
      />
      {children}
    </Provider>
  );
}
