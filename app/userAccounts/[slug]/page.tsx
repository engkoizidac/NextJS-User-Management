import { getUserById } from "@/lib/data-access/user";
import AccessPrivilegesPage from "./access-privileges";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getUserById((await params).slug);
  return <AccessPrivilegesPage user={user} />;
}
