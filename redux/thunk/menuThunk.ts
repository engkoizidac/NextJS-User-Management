import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MenuGroupItem } from "../slice/menuSlice";

export const loadMenuTree = createAsyncThunk<MenuGroupItem[]>("menu/loadMenuTree", async (_, thunkAPI) => {
  try {
    const response = await fetch("/api/menus", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Unable to load menu tree.");
    }

    const data = (await response.json()) as MenuGroupItem[];
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
