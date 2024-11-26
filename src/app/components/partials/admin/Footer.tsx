import React from "react";
import { getAppName } from "@/lib/app";

export default function Footer() {
    return (
        <footer className="bg-gray-600 text-white p-4">
            <div className="container mx-auto text-center">
                <p className="px-6 sm:px-0">&copy; 2024 {getAppName()}. All rights reserved.</p>
            </div>
        </footer>
    );
}
