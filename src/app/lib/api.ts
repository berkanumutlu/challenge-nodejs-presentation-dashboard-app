import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export async function fetchAPI(endpoint: string, options: AxiosRequestConfig = {}) {
    try {
        if (options?.data) {
            options.data = JSON.stringify(options.data);
        }
        const response = await axiosInstance({
            url: endpoint,
            ...options
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error?.message);
            if (error?.status === 500) {
                throw new Error(`API error: ${error.status} - ${error?.response?.data}`);
            }
        } else {
            console.error('fetchAPI error:', error);
        }
        throw error;
    }
}
export async function fetchAPIWithAuth(endpoint: string, options: AxiosRequestConfig = {}) {
    try {
        const session = await getSession();
        return await fetchAPI(endpoint, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${session?.accessToken}`
            }
        });
    } catch (error) {
        console.error('fetchAPIWithAuth error:', error);
        throw error;
    }
}