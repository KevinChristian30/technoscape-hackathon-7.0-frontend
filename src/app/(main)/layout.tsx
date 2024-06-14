import Title from "@/components/layouts/Title";
import SidePanel from "../../components/layouts/SidePanel";
import Navbar from "@/components/layouts/Navbar";
import UserProvider from "@/providers/UserProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Title />
            </div>
            <div className="flex-1">
              <SidePanel />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex h-14 items-center md:justify-end justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Navbar />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
