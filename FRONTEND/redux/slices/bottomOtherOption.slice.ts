import { ITabOptions } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  options: ITabOptions[];
}

const initialState: IInitialState = {
  options: [],
};

const bottomOtherOptionSlice = createSlice({
  name: "bottom nav options",
  initialState,
  reducers: {
    setOptions: (_, action: PayloadAction<IInitialState>) => action.payload,
  },
});

export default bottomOtherOptionSlice.reducer;
export const { setOptions } = bottomOtherOptionSlice.actions;
