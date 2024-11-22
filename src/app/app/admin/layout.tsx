import React from "react";

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            Admin Layout Header
            {children}
        </section>
    )
}