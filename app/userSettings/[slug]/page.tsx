import { getUserById } from "@/lib/data-access/user";
import ChangePasswordForm from "./change-password";

export default async function AccessPrivilegesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getUserById((await params).slug);
  return (
    <div>
      <div className="container mx-auto py-8  ">
        <div className="font-bold text-2xl">My User Settings</div>
        <div className="text-blue-500">{user?.fullName}</div>
      </div>
      <div className="container mx-auto">
        <div className="border-t border-gray-300 "></div>
        <div className="font-bold pt-4">Security</div>
        <div className="text-blue-400 text-sm">Change my password.</div>
        <ChangePasswordForm user={user} />
      </div>
    </div>
  );
}
