import { NextRequest, NextResponse } from "next/server";
import getAuthUser from "@/_controllers/getAuthUser.controller";
import { getUserMenus } from "@/_dataAccessLayers/menu.dal";

export async function GET(request: NextRequest) {
  const authUser = await getAuthUser();
  if (!authUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userIdAsString = authUser.userId?.toString();
  if (!userIdAsString) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const menuTree = await getUserMenus(userIdAsString);
  return NextResponse.json(menuTree);
}
