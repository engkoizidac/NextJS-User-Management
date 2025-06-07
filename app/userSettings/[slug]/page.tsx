import { getUserById } from "@/_dataAccessLayers/user.dal";
import ChangePasswordForm from "./change-password";
import FormTitleComponent from "@/app/components/form-title";

export default async function AccessPrivilegesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      <div className="container mx-auto py-8 px-2 sm:px-4">
        <FormTitleComponent
          title="My User Settings"
          subTitle="Security and other user settings."
        />
        <div className="container mx-auto px-0 sm:px-0 pt-8">
          <div className="border-t border-gray-300 "></div>
          <div className="font-bold pt-4 text-center sm:text-left">
            Security Settings
          </div>
          <div className="flex justify-center sm:justify-start">
            <div className="w-full max-w-md">
              <ChangePasswordForm userId={(await params).slug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
