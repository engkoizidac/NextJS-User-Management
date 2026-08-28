import { createAsyncThunk } from "@reduxjs/toolkit";
import { MenuMain } from "@/_types/menuMain";
import { fetchUserMenus } from "@/_controllers/menu.controller";

export const loadMenuTree = createAsyncThunk<MenuMain[]>(
  "menu/loadMenuTree",
  async (_, thunkAPI) => {
    try {
      const data = await fetchUserMenus();
      return data as MenuMain[];
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);


