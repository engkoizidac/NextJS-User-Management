import getUsers from "@/lib/data-access/user";
import UserAccounts from "./user-accounts";
import FormTitleComponent from "../components/form-title";

export default async function UserAccountsPage() {
  const Users = await getUsers();
  return (
    <div>
      <div className="container mx-auto py-8 px-2 sm:px-4">
        <FormTitleComponent
          title="User Accounts"
          subTitle="Add, edit, and delete user accounts and manage their roles."
        />
      </div>
      <UserAccounts Users={Users} />
    </div>
  );
}
