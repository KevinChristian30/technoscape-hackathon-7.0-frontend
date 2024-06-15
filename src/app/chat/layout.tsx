import Title from "@/components/layouts/Title";
import SidePanel from "../../components/layouts/SidePanel";
import Navbar from "@/components/layouts/Navbar";
import UserProvider from "@/providers/UserProvider";
import ThemeToggleButton from "@/components/ui/ThemeToggleButton";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="flex flex-col h-full w-full">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 gap-4">
                <Title />
                <ThemeToggleButton />
            </div>
            <main className="flex flex-1 flex-col px-6 pt-3">
                {children}
            </main>

        </div>

    );
}
