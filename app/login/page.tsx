import { LoginForm } from "./login-form";
//bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900
export default function Login() {
  return (
    <div className="flex relative h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl gap-4">
            Login
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
