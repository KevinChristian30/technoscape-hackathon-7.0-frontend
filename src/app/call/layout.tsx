import Title from "@/components/layouts/Title";
import SidePanel from "../../components/layouts/SidePanel";
import SidePanelMobile from "@/components/layouts/SidePanelMobile";
import ProfileButton from "@/components/ui/ProfileButton";
import Navbar from "@/components/layouts/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex h-screen">{children}</main>;
}
