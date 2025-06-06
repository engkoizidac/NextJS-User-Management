"use client";

import { useActionState, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

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
import { updateUser } from "@/_controllers/user.controller";
import Icons from "@/components/ui/icons";
import toast from "react-hot-toast";

type EditUserDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSuccess?: () => void;
  user: {
    id: string;
    fullName: string;
    username: string;
    status: string;
  };
};

export function EditUserDialog({
  open,
  onOpenChange,
  onSubmitSuccess,
  user,
}: EditUserDialogProps) {
  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) =>
      updateUser(prevState, formData, user.id),
    undefined
  );

  const form = useForm({
    defaultValues: {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      status: user.status,
    },
  });

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
      toast.success("User updated successfully");
      form.reset();

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }
  }, [state?.success, onSubmitSuccess, onOpenChange, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the information for the user. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="edit-user-form" action={action} className="space-y-4">
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
                  {state?.errors &&
                    "username" in state.errors &&
                    state.errors.username && (
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
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
