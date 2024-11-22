import React from "react";
import AppLogo from "@/components/app/app-logo";
import { NavUser } from "@/components/navigation/nav-user";

interface HeaderProps {
    user: {
        name: string;
        email: string;
        avatar: string;
    };
}

export default function Header({ user }: HeaderProps) {

    return (
        <div className="container py-4 px-2 xl:px-0 mx-auto h-[60px] flex items-center justify-between bg-white">
            <AppLogo />
            <NavUser user={user} />
        </div>
    )
}
