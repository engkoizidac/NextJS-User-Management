import { getRoleById } from "@/lib/data-access/role";
import { StepBack } from "lucide-react";

export default async function AccessPrivilegesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const roleId = Number((await params).slug);
  const role = await getRoleById(roleId);
  return (
    <div className="justify-center items-center ">
      <div className="container mx-auto py-8 ">
        <div className=" items-center">
          <div className="font-bold text-2xl">
            Access Privileges:{" "}
            <span className="text-fuchsia-800">{role?.name}</span>
          </div>
          <div className="text-fuchsia-950">
            Manage access privileges for this role.
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button className="text-sm  bg-fuchsia-900 text-white px-4 py-2 rounded hover:bg-fuchsia-950">
            <div className="flex items-center">
              <StepBack className="mr-2 h-4 w-4" />
              Back to Roles
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
