import UserAccounts from "./user-accounts";
import FormTitleComponent from "../components/form-title";
import { getAll } from "@/_controllers/user.controller";

export default async function UserAccountsPage() {
  const users = await getAll();
  return (
    <div>
      <div className="container mx-auto py-8 px-2 sm:px-4">
        <FormTitleComponent
          title="User Accounts"
          subTitle="Add, edit, and delete user accounts and manage their roles."
        />
      </div>
      <UserAccounts users={users} />
    </div>
  );
}
