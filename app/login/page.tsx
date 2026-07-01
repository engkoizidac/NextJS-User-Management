import Image from "next/image";
import { LoginForm } from "./login-form";

export default function Login() {
  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div className="flex justify-center">
          <h1 className="flex items-center text-3xl font-extrabold tracking-tight">
            <span>PETR</span>

            <Image
              src="/logo.png"
              alt="PetroFlow Logo"
              width={34}
              height={34}
              className="-ml-0.5 -mr-0.5"
            />

            <span className="text-blue-500">FLOW</span>
          </h1>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
