import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isOpen: boolean;
}

const initialState: IInitialState = {
  isOpen: false,
};

const loadingDialogSlice = createSlice({
  name: "Loading Dialog Slice",
  initialState,
  reducers: {
    setLoadingDialog: (state, action: PayloadAction<IInitialState>) =>
      action.payload,
  },
});

export default loadingDialogSlice.reducer;
export const { setLoadingDialog } = loadingDialogSlice.actions;
