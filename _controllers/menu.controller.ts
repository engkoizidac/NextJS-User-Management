"use server";

import getAuthUser from "./getAuthUser.controller";
import { getUserMenus } from "@/_dataAccessLayers/menu.dal";

export async function fetchUserMenus() {
  const authUser = await getAuthUser();
  if (!authUser || !authUser.userId) {
    return [];
  }

  const userIdAsString = authUser.userId.toString();
  return await getUserMenus(userIdAsString);
}
