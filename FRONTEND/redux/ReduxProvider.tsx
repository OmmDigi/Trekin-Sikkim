"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { Bounce, ToastContainer } from "react-toastify";

interface IProps {
  children: React.ReactNode;
}

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
