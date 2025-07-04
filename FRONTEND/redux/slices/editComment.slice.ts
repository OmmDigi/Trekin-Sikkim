import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  comment_id: number;
  content: string;
}

const initialState: IInitialState = {
  comment_id: 0,
  content: "",
};

const editCommentSlice = createSlice({
  initialState: initialState,
  name: "Edit Comment Slice",
  reducers: {
    setEditCommentState: (state, action: PayloadAction<IInitialState>) =>
      action.payload,
  },
});

export default editCommentSlice.reducer;
export const { setEditCommentState } = editCommentSlice.actions;
