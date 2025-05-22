import { getUserById } from "@/lib/data-access/user";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default async function AccessPrivilegesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const userId = (await params).slug;
  const user = await getUserById(userId);
  return (
    <div className="justify-center items-center ">
      <div className="container mx-auto py-8 ">
        <div className="flex  items-center justify-between">
          <div className="flex font-bold text-2xl">
            User Assigned Roles:
            <span className="text-fuchsia-800">&nbsp;{user?.fullName}</span>
          </div>
          <div className="flex  justify-end">
            <Link href={`/userAccounts`} className="flex items-center w-full">
              <button className="text-sm  bg-fuchsia-900 text-white px-4 py-2 rounded hover:bg-fuchsia-950">
                <div className="flex items-center">
                  <ArrowBigLeft className="mr-2 h-5 w-5" />
                  Back to User Accounts
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="text-fuchsia-950">
          Manage roles on this current user.
        </div>
      </div>
    </div>
  );
}
