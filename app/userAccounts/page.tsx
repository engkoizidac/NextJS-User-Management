import getUsers from "@/lib/user";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// Add revalidation
export const revalidate = 0; // This ensures the page is always fresh

export default async function UserAccounts() {
  const userCollection = await getUsers();

  return (
    <div>
      <div className="container mx-auto py-8 ">
        <div className="font-bold text-2xl">User Accounts</div>
        <div className="text-fuchsia-950">
          Add, edit, and delete user accounts and manage their roles.
        </div>
      </div>
      <div className="container mx-auto py-2">
        <DataTable
          columns={columns}
          data={userCollection}
          key={Date.now()} // Force re-render on data changes
        />
      </div>
    </div>
  );
}
