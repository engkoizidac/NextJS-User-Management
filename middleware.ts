import { NextResponse } from "next/server";
import getAuthUser from "./_controllers/getAuthUser.controller";

const protectedRoutes = [
  "/",
  "/dashboard",
  "/userAccounts",
  "/userRoles",
  "/userSettings",
];
const publicRoutes = ["/login"];

export default async function middleware(req: { nextUrl: URL }) {
  const path = req.nextUrl.pathname;
  // Extract the base path for protected route matching
  const basePath = path.split("/")[1] ? `/${path.split("/")[1]}` : path;
  const isProtected = protectedRoutes.includes(basePath);
  const isPublic = publicRoutes.includes(path);

  const user = await getAuthUser();
  const userId = user?.userId;

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
