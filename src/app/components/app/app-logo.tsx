"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function AppLogo() {
    const { theme } = useTheme();
    const logoSrc = theme === 'light'
        ? '/logo/logo-white.svg'
        : '/logo/logo.svg';

    return (
        <Image
            src={logoSrc}
            alt="Decktopus logo"
            width={180}
            height={38}
            priority
        />
    );
}
