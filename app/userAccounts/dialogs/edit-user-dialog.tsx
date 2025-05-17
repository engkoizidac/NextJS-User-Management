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
import { updateUser } from "@/actions/userAccount";
import Icons from "@/components/ui/icons";
import toast from "react-hot-toast";

type EditUserDialogProps = {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  onSubmitSuccess?: () => void,
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
  const [state, action, isPending] = useActionState(updateUser, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm({
    defaultValues: {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      status: user.status,
      password: "", // Optional - only required if changing password
    },
  });

  useEffect(() => {
    if (state?.success) {
      toast.success("User updated successfully");
      setTimeout(() => {
        form.reset();
        onOpenChange(false);
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      }, 1000); // 1 second delay
    }
    // Only include stable dependencies
  }, [state?.success, onOpenChange, onSubmitSuccess]);

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
                  {state?.error && (
                    <p className="text-sm text-red-500">
                      {state.error}
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
                  {state?.error && (
                    <p className="text-sm text-red-500">
                      {state.error}
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
                  <FormLabel htmlFor="password">Password (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  {state?.error && (
                    <p className="text-sm text-red-500">
                      {state.error}
                    </p>
                  )}
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
                  {state?.error && (
                    <p className="text-sm text-red-500">
                      {state.error}
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
