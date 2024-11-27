"use client";

import PresentationList from "@/components/presentation/presentation-list";
import PresentationCreateList from "@/components/presentation/presentation-create-list";

export default function DashboardPageClient() {
    return (
        <>
            <PresentationCreateList />
            <PresentationList />
        </>
    );
}
