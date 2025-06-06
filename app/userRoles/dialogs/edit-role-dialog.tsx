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
import { updateRole } from "@/_controllers/role.controller";

type EditRoleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSuccess?: () => void;
  role: {
    id: number;
    name: string;
  };
};

export function EditRoleDialog({
  open,
  onOpenChange,
  onSubmitSuccess,
  role,
}: EditRoleDialogProps) {
  const [state, action, isPending] = useActionState(
    async (prevState: any, formData: FormData) =>
      updateRole(prevState, formData, role.id),
    undefined
  );

  const form = useForm({
    defaultValues: {
      id: role.id,
      name: role.name,
    },
  });

  useEffect(() => {
    if (state?.success) {
      onOpenChange(false);
      toast.success("Role changes successfully saved");
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
          <DialogTitle>Edit New Role</DialogTitle>
          <DialogDescription>
            Fill in the information for the new role. Click Edit Role when
            you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="Edit-role-form" action={action} className="space-y-4">
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
