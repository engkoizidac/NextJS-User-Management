import { columns } from "./data-table/column";
import { DataTable } from "./data-table/data-table";
import getRoles from "@/lib/data-access/role";

export default async function UserRolesPage() {
  const roleCollection = await getRoles();
  return (
    <div>
      <div className="container mx-auto py-8 ">
        <div className="font-bold text-2xl">User Roles Management</div>
        <div className="text-fuchsia-950">
          Manage user assigned roles and their permissions.
        </div>
      </div>
      <div className="container mx-auto py-2">
        <DataTable
          columns={columns}
          data={roleCollection}
          key={Date.now()} // Force re-render on data changes
        />
      </div>
    </div>
  );
}
