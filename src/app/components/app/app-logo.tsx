"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppLogo() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Skeleton className="w-[180px] h-[38px]" />;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    const logoSrc = currentTheme === 'light'
        ? '/logo/logo.svg'
        : '/logo/logo-white.svg';

    return (
        <Image
            src={logoSrc}
            alt="App logo"
            width={180}
            height={38}
            priority
        />
    );
}