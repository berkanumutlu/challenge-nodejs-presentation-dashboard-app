import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${API_URL}${endpoint}`;
    console.log('Fetching from URL:', url);
    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!res.ok && res.status === 500) {
            const errorText = await res.text();
            console.error('API error:', res.status, errorText);
            throw new Error(`API error: ${res.status} - ${errorText}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Fetch error:', error);
        if (error instanceof TypeError && error.message === 'fetch failed') {
            console.error('API server may be down or unreachable. Please check if it\'s running on the correct port.');
        }
        throw error;
    }
}

export async function fetchAPIWithAuth(endpoint: string, options: RequestInit = {}) {
    const session = await getSession();
    return await fetchAPI(endpoint, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${session?.accessToken}`
        }
    });
}