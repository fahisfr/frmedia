import { createSlice,} from "@reduxjs/toolkit";
import reducers from "./reducers/profile";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userName: null,
    profiles: [],
  },
  reducers,
});

export const actions = profileSlice.actions;

export default profileSlice.reducer;
