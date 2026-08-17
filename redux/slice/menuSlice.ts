import { createSlice } from "@reduxjs/toolkit";
import { loadMenuTree } from "../thunk/menuThunk";
import { MenuMain } from "@/_types/menuMain";

interface MenuState {
  items: MenuMain[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  status: "idle",
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    resetMenu(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMenuTree.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadMenuTree.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadMenuTree.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Failed to load menu tree.";
      });
  },
});

export const { resetMenu } = menuSlice.actions;
export default menuSlice.reducer;
