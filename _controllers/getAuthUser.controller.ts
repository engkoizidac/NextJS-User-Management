"use server";

import { decrypt } from "@/app/auth/session";
import { cookies } from "next/headers";

export default async function getAuthUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  if (session) {
    const payload = await decrypt(session);
    if (!payload || !payload.userId) return null;

    return { userId: payload.userId };
  }
}
