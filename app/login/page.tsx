import { LoginForm } from "./login-form";

export default function Login() {
  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">
            User<span className="text-blue-500">Auth</span>
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
