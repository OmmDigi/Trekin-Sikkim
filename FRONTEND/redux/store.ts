import { configureStore } from "@reduxjs/toolkit";
import dialogSlice from "@/redux/slices/dialog.slice";
import mobileNavSlice from "@/redux/slices/mobileNav.slice";
import bookingFormSlice from "@/redux/slices/booking.form.slice";
import bottomOtherOptionSlice from "@/redux/slices/bottomOtherOption.slice"
import editCommentSlice from "@/redux/slices/editComment.slice";

export const store = configureStore({
  reducer: {
    dialogSlice: dialogSlice,
    mobileNavSlice: mobileNavSlice,
    booking: bookingFormSlice,
    bottomOtherOptionSlice : bottomOtherOptionSlice,
    editCommentSlice : editCommentSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
