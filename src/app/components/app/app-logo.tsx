"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { getAppName } from "@/lib/app";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppLogo() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const logoWidth = 142;
    const logoHeight = 22;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Skeleton className={`w-[${logoWidth}px] h-[${logoHeight}px]`} />;
    }

    const currentTheme = theme === "system" ? systemTheme : theme;
    const logoSrc = currentTheme === 'light'
        ? '/images/logo/logo.svg'
        : '/images/logo/logo-white.svg';
    const logoAlt = `${getAppName()} Logo`;

    return (
        <Image
            src={logoSrc}
            alt={logoAlt}
            width={logoWidth}
            height={logoHeight}
            priority
        />
    );
}