import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "@/components/partials/admin/Header";
import Footer from "@/components/partials/admin/Footer";

export default async function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <>
                {children}
            </>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header user={session?.user} />
            <main className="px-2 py-7 flex-grow bg-[#EFF2F8]">
                <div className="mx-auto px-2 lg:px-14 w-full">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    )
}
