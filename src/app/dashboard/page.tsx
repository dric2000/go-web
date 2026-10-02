import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { ProfileForm } from "@/components/dashboard/profile-form";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border border-border bg-card p-6">
        <div className="flex size-16 shrink-0 items-center justify-center bg-brand text-xl font-semibold text-white">
          {initials}
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="border border-border bg-card p-6">
        <h1 className="text-xl font-bold text-foreground">
          Modifier mes informations
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ces informations sont utilisées sur l&apos;app mobile et le site.
        </p>
        <div className="mt-6">
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
