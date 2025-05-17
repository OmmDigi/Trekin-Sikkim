import { TDialogAction, TDialogID } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  type: TDialogAction;
  id: TDialogID | null;
  extraValue?: any;
}

const initialState: IInitialState = {
  type: "CLOSE",
  id: null,
};

const dialogSlice = createSlice({
  name: "dialog_slice",
  initialState,
  reducers: {
    setDialog: (_, action: PayloadAction<IInitialState>) => action.payload,
  },
});

export default dialogSlice.reducer;
export const { setDialog } = dialogSlice.actions;
