"use client";

import type React from "react";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { login } from "@/actions/auth";

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

  return (
    <Card>
      <form action={action}>
        <CardHeader className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h2>
          <p className="text-sm text-muted-foreground pt-4">
            Enter your username and password to sign in
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-3">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" />
            {state?.errors?.username && (
              <p className="error">{state.errors.username}</p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" />
            {state?.errors?.password && (
              <p className="error">{state.errors.password}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-8 pb-4">
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
