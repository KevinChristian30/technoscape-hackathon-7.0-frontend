import HasRole from "@/components/guard/HasRole";
import { Role } from "@/lib/routes";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HasRole permittedRole={Role.ADMIN.toString()}>{children}</HasRole>;
}
