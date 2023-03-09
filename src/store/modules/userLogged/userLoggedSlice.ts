import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../typeStore";

const initialState: Omit<User, "recados"> = {
  id: "",
  email: "",
  name: "",
  password: "",
};

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    setUserLogged: (state, action: PayloadAction<Omit<User, "recados">>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.password = action.payload.password;
    },
    clearUserLogged: (state) => {
      return initialState;
    },
  },
});

export const { setUserLogged, clearUserLogged } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
