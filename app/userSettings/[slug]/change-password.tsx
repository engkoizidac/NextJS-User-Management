"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useActionState } from "react";
import { Save, Eye, EyeOff } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { changeUserPassword } from "@/_controllers/user.controller";
import toast from "react-hot-toast";

type FormDatas = {
  currentPassword: string;
  newPassword: string;
  confirmedPassword: string;
};

interface User {
  id: string;
  fullName: string;
}

interface Props {
  userId: string;
}

export default function ChangePasswordForm({ userId }: Props) {
  // export default function ChangePasswordForm({ user }: { user: User | null }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<FormDatas>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmedPassword: "",
    },
  });

  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) =>
      changeUserPassword(prevState, formData, userId),
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("Password updated successfully");
      form.reset();
    }
  }, [state?.success, form]);

  return (
    <FormProvider {...form}>
      <form
        id="change-password-form"
        action={action}
        className="space-y-4 w-full max-w-sm pt-4 mx-auto"
      >
        {/* Current Password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrent ? "text" : "password"}
                    autoComplete="current-password"
                    {...field}
                    className="pr-10 relative"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowCurrent((v) => !v)}
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                  >
                    {showCurrent ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              {state?.errors &&
                "currentPassword" in state.errors &&
                state.errors.currentPassword && (
                  <p className="text-sm text-red-500">
                    {state.errors.currentPassword}
                  </p>
                )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    autoComplete="new-password"
                    {...field}
                    className="h-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowNew((v) => !v)}
                    aria-label={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              {state?.errors &&
                "newPassword" in state.errors &&
                state.errors.newPassword && (
                  <p className="text-sm text-red-500">
                    {state.errors.newPassword}
                  </p>
                )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmedPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmedPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    {...field}
                    className="h-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              {state?.errors &&
                "confirmedPassword" in state.errors &&
                state.errors.confirmedPassword && (
                  <p className="text-sm text-red-500">
                    {state.errors.confirmedPassword}
                  </p>
                )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          id="submit-user"
          disabled={isPending}
          className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <div className="flex items-center">
            <Save className="mr-2 h-4 w-4" />
            Update Password
          </div>
        </Button>
      </form>
    </FormProvider>
  );
}
