import { createAsyncThunk } from "@reduxjs/toolkit";
import { MenuMain } from "@/_types/menuMain";

export const loadMenuTree = createAsyncThunk<MenuMain[]>(
  "menu/loadMenuTree",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/menus", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        return thunkAPI.rejectWithValue(errorText || "Unable to load menu tree.");
      }

      const data = (await response.json()) as MenuMain[];
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

