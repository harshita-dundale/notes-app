import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {
  user: "",
  isLoggedIn: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload || "";
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = "";
      state.isLoggedIn = false;
      // Clear localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      sessionStorage.removeItem("tempNotes");
    },
  },
});

export const authActions = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;