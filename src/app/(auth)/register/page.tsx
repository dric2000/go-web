import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo1 from "@assets/go-1.png";
import logo from "@assets/go-2.png";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Inscription — GO",
};

export default async function RegisterPage({
  searchParams,
}: PageProps<"/register">) {
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
          Crée ton compte
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Rejoins GO pour réserver ou publier ton premier trajet.
        </p>

        <div className="mt-8">
          <RegisterForm redirectTo={redirectTo} />
        </div>
      </div>

      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-primary md:flex">
        <Image src={logo} alt="GO" className="w-64 lg:w-80" />
      </div>
    </div>
  );
}
