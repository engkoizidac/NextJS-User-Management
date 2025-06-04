"use client";

import type React from "react";
import { useActionState, useState } from "react";
import { login } from "@/actions/auth";
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

type LoginState = {
  errors?: {
    username?: string[] | string;
    password?: string[] | string;
  };
};

export function LoginForm() {
  const [state, action, isPending] = useActionState<LoginState, FormData>(
    login,
    { errors: {} }
  );
  const [showPassword, setShowPassword] = useState(false);

  const renderError = (error?: string[] | string) => {
    if (!error) return null;
    return (
      <p className="text-sm text-red-600">
        {Array.isArray(error) ? error.join(", ") : error}
      </p>
    );
  };

  return (
    <Card>
      <form action={action}>
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-semibold">User Login</h2>
          <p className="text-sm text-muted-foreground">
            Enter your username and password to sign in
          </p>
        </CardHeader>

        <CardContent className="space-y-4 pt-8">
          <div className="space-y-3">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" />
            {renderError(state?.errors?.username)}
          </div>

          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
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
            {renderError(state?.errors?.password)}
          </div>
        </CardContent>

        <CardFooter className="pt-8 pb-4">
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
