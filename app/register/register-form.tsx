"use client";

import { useActionState, useState } from "react";
import { register } from "@/_controllers/auth.controller";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

type RegisterFormState = {
  errors?: Record<string, string | string[] | undefined>;
};

export function RegisterForm() {
  const [state, action, isPending] = useActionState<RegisterFormState | undefined, FormData>(
    register,
    undefined
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formErrors = state?.errors ?? {};
  const getFirstError = (value: string | string[] | undefined) => {
    if (Array.isArray(value)) {
      return value[0];
    }
    return value;
  };
  const fullNameError = getFirstError(formErrors.fullName);
  const usernameError = getFirstError(formErrors.username);
  const passwordError = getFirstError(formErrors.password);
  const confirmPasswordError = getFirstError(formErrors.confirmPassword);

  return (
    <Card>
      <form action={action}>
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-semibold">Create Account</h2>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to create your account
          </p>
        </CardHeader>

        <CardContent className="space-y-4 pt-8">
          <div className="space-y-3">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" placeholder="Enter your full name" />
            {fullNameError && <p className="text-sm text-red-500">{fullNameError}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" placeholder="Choose a username" />
            {usernameError && <p className="text-sm text-red-500">{usernameError}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="pr-10"
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
          </div>

          <div className="space-y-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="pr-10"
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {confirmPasswordError && (
              <p className="text-sm text-red-500">{confirmPasswordError}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-8 pb-4">
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
