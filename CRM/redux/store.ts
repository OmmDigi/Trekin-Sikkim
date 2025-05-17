import { configureStore } from "@reduxjs/toolkit";
import choosedMediaItems from "@/redux/slice/choose.gallery.slice";
import loadingDialogSlice from "@/redux/slice/loading.dialog.slice";

export const reduxStore = configureStore({
  reducer: {
    choosedMediaItems: choosedMediaItems,
    loadingDialogSlice: loadingDialogSlice,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
