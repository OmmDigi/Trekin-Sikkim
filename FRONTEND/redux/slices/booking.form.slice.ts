import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IParticipantInfo {
  full_name: string;
  email: string;
  contact_number: string;
  dial_code: string;
}

interface IPersonalInfo {
  full_name: string;
  email: string;
  contact_number: string;
  group_type?: string;
  number_of_people: number;
  address?: string;
  dial_code: string;
}

interface IBookingForm {
  personal_info: IPersonalInfo;
  participant_info: IParticipantInfo[];
  addon_ids: number[];
}

const initialState: IBookingForm = {
  personal_info: {
    full_name: "",
    contact_number: "",
    email: "",
    number_of_people: 1,
    dial_code: "",
  },
  participant_info: [],
  addon_ids: [],
};

const bookingFormSlice = createSlice({
  name: "Booking Form Slice",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<IPersonalInfo>) => {
      state.personal_info = action.payload;
    },
    setParticipantInfo: (state, action: PayloadAction<IParticipantInfo[]>) => {
      state.participant_info = action.payload;
    },
    setAddonIds: (state, action: PayloadAction<number[]>) => {
      state.addon_ids = action.payload;
    },
  },
});

export default bookingFormSlice.reducer;
export const { setAddonIds, setParticipantInfo, setPersonalInfo } =
  bookingFormSlice.actions;
