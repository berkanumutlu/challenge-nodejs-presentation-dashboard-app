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
        <div className='h-[60px] bg-white'>
            <div className="container mx-auto h-full py-4 px-2 xl:px-0 flex items-center justify-between">
                <AppLogo />
                <NavUser user={user} />
            </div>
        </div>
    )
}
