import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AppLogo from "@/components/app/app-logo";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
    title: 'Login'
};

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/admin/dashboard");
    }

    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="p-3 w-full flex justify-center bg-gray-100 rounded-lg">
                    <div className="w-32 md:w-36">
                        <AppLogo />
                    </div>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}
