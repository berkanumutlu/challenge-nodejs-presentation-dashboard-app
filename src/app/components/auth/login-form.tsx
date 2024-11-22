"use client";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { ArrowRight, KeyRound, Mail, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
                callbackUrl: '/admin/dashboard'
            });

            if (result?.error) {
                setError(result.error);
            } else if (result?.url) {
                router.push(result.url);
                router.refresh();
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-6 flex-1 space-y-6 bg-gray-100 rounded-lg">
                <h1 className="mb-3 text-2xl text-center">Login</h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                required
                                disabled={loading}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                                disabled={loading}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <Button disabled={loading} className="w-full bg-primary hover:!bg-primary-hover">
                    Log in <ArrowRight className="ml-auto h-5 w-5" />
                </Button>
                {error && (
                    <div className="h-6 space-x-1 flex items-start">
                        <TriangleAlert className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{error}</p>
                    </div>
                )}
            </div>
        </form>
    );
}
