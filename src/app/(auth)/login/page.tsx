import { LoginForm } from "@/components/auth/login-form";
import logo from "@assets/go-2.png";
import logo1 from "@assets/go-1.png";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Connexion — GO",
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const params = await searchParams;
  const redirectTo =
    typeof params.redirect === "string" ? params.redirect : undefined;

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <Link href="/" className="mb-10 flex items-center gap-2">
          <Image src={logo1} alt="GO" className="h-9 w-9" />
          <span className="text-xl font-bold text-brand">GO</span>
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Connexion
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Entre tes identifiants pour accéder à ton compte.
        </p>

        <div className="mt-8">
          <LoginForm redirectTo={redirectTo} />
        </div>
      </div>

      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-primary md:flex">
        <Image src={logo} alt="GO" className="w-64 lg:w-80" />
      </div>
    </div>
  );
}
