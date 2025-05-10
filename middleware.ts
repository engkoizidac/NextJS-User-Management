import { NextResponse } from "next/server";
import getAuthUser from "./actions/getAuthUser";

const protectedRoutes = ["/dashboard", "/userAccounts"];
const publicRoutes = ["/login"];

export default async function middleware(req: { nextUrl: URL }) {
  const path = req.nextUrl.pathname;
  const isProtected =
    protectedRoutes.includes(path) || path.startsWith("/posts/edit/");
  const isPublic = publicRoutes.includes(path);

  const user = await getAuthUser();
  const userId = user?.userId;

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
