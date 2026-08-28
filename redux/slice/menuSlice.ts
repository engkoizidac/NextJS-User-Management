import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setMenus(state, action: PayloadAction<MenuMain[]>) {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    resetMenu(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMenuTree.pending, (state) => {
        if (state.items.length === 0) {
          state.status = "loading";
        }
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

export const { setMenus, resetMenu } = menuSlice.actions;
export default menuSlice.reducer;

