import getUsers from "@/lib/data-access/user";
import UserAccounts from "./user-accounts";

// Add revalidation
export const revalidate = 0; // This ensures the page is always fresh

export default async function UserAccountsPage() {
  const Users = await getUsers();
  return (
    <div>
      <div className="container mx-auto py-8 ">
        <div className="font-bold text-2xl">User Accounts</div>
        <div className="text-blue-400">
          Add, edit, and delete user accounts and manage their roles.
        </div>
      </div>
      <UserAccounts Users={Users} />
    </div>
  );
}
