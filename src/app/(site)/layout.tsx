import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { LeftRail, RightRail } from "@/components/site/side-rails";
import { getCurrentUser } from "@/lib/session";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <>
      <Navbar user={user} />
      <LeftRail isAuthenticated={Boolean(user)} />
      <RightRail />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
