"use client";

import { useActionState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import toast from "react-hot-toast";
import { createRole } from "@/_controllers/role.controller";

type AddRoleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSuccess?: () => void;
};

export function AddRoleDialog({
  open,
  onOpenChange,
  onSubmitSuccess,
}: AddRoleDialogProps) {
  const [state, action, isPending] = useActionState(createRole, undefined);

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
      toast.success("New role added successfully!");
      form.reset();

      if (onSubmitSuccess) {
        onSubmitSuccess(); // <-- trigger parent refresh
      }
    }
  }, [state?.success, onOpenChange, form, onSubmitSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <DialogDescription>
            Fill in the information for the new role. Click Add Role when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="add-role-form" action={action} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Role Description</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} />
                  </FormControl>
                  {state?.errors &&
                    "name" in state.errors &&
                    state.errors.name && (
                      <p className="text-sm text-red-500">
                        {state.errors.name}
                      </p>
                    )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" id="submit-role" disabled={isPending}>
                {isPending ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Role"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
