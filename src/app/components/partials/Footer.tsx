import React from "react";
import { getAppName } from "@/lib/app";

export default function Footer() {
    return (
        <footer className="bg-gray-600 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 {getAppName()}. All rights reserved.</p>
            </div>
        </footer>
    );
}
