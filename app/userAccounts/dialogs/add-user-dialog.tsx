"use client";

import { useActionState, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Timer } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addUser } from "@/_controllers/user.controller";
import Icons from "@/components/ui/icons";
import toast from "react-hot-toast";

type AddUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSuccess?: () => void;
};

export function AddUserDialog({
  open,
  onOpenChange,
  onSubmitSuccess,
}: AddUserDialogProps) {
  const [state, action, isPending] = useActionState(addUser, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm({
    defaultValues: {
      fullName: "",
      username: "",
      password: "",
      status: "Activated" as const,
    },
  });

  useEffect(() => {
    if (state?.success) {
      if (onSubmitSuccess) {
        onSubmitSuccess(); // <-- trigger parent refresh
      }

      onOpenChange(false);
      toast.success("User added successfully");
      form.reset();
    }
  }, [state?.success, onOpenChange, form, onSubmitSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the information for the new user. Click Add User when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="add-user-form" action={action} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="fullName">Full Name</FormLabel>
                  <FormControl>
                    <Input id="fullName" {...field} />
                  </FormControl>
                  {state?.errors &&
                    "fullName" in state.errors &&
                    state.errors.fullName && (
                      <p className="text-sm text-red-500">
                        {state.errors.fullName}
                      </p>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input id="username" {...field} />
                  </FormControl>
                  {state?.errors?.username && (
                    <p className="text-sm text-red-500">
                      {state.errors.username}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        {...field}
                      />
                      <button
                        type="button"
                        id="toggle-password"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={togglePasswordVisibility}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  {state?.errors &&
                    "password" in state.errors &&
                    state.errors.password && (
                      <p className="text-sm text-red-500">
                        {state.errors.password}
                      </p>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    {...form.register("status")}
                  >
                    <FormControl>
                      <SelectTrigger id="status">
                        <SelectValue
                          id="status-value"
                          placeholder="Select a status"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem id="status-activated" value="Activated">
                        Activated
                      </SelectItem>
                      <SelectItem id="status-deactivated" value="Deactivated">
                        Deactivated
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {state?.errors &&
                    "status" in state.errors &&
                    state.errors.status && (
                      <p className="text-sm text-red-500">
                        {state.errors.status}
                      </p>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" id="submit-user" disabled={isPending}>
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add User
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
