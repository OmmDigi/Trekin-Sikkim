import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const mobileNavSlice = createSlice({
  initialState: false,
  name: "Mobile Slice Visibility",
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => action.payload,
  },
});

export default mobileNavSlice.reducer;
export const { setVisibility } = mobileNavSlice.actions;
