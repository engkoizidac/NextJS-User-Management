import getUsers from "@/lib/data-access/user";
import UserAccounts from "./user-accounts";

export default async function UserAccountsPage() {
  const Users = await getUsers();
  return (
    <div>
      <div className="container mx-auto py-8 px-2 sm:px-4">
        <div className="font-bold text-2xl text-center sm:text-left">
          User Accounts
        </div>
        <div className="text-blue-400 text-center sm:text-left mt-1">
          Add, edit, and delete user accounts and manage their roles.
        </div>
      </div>
      <UserAccounts Users={Users} />
    </div>
  );
}
