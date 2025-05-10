import getUsers from "@/lib/db";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { User } from "./columns";

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
        <DataTable columns={columns} data={userCollection} />
      </div>
    </div>
  );
}
