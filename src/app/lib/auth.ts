import axios, { AxiosRequestConfig } from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserLoginType, UserRegisterType } from "@/types/auth";
import { fetchAPI, fetchAPIWithAuth } from "./api";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    console.error('Missing username or password');
                    return null;
                }
                try {
                    const response = await authService.login({
                        username: credentials?.username as string,
                        password: credentials?.password as string
                    });
                    if (response?.success && response?.data?.token) {
                        const user = await authService.getUser();
                        if (user?.success && user?.data) {
                            return { user: user.data, token: response.data.token };
                        }
                        return null;
                    }
                    return null;
                } catch (error) {
                    console.error('Credentials authorize error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/admin/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.user = user.user;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        }
    },
    debug: process.env.NODE_ENV === 'development',
    logger: {
        error: (code, metadata) => {
            console.error(code, metadata)
        },
        warn: (code) => {
            console.warn(code)
        },
        debug: (code, metadata) => {
            console.debug(code, metadata)
        }
    }
};

const routePrefix = '/auth';
export async function fetchAuth(endpoint: string, options: AxiosRequestConfig = {}) {
    return fetchAPI(`${routePrefix}${endpoint}`, options);
}
// TODO: For API connection issue
const mockUserId = 'aed3186d-a7c3-436e-a1f5-aa353f62b9e8';
const mockUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFlZDMxODZkLWE3YzMtNDM2ZS1hMWY1LWFhMzUzZjYyYjllOCIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzMyNjEzMjIzLCJleHAiOjQ4ODgzNzMyMjN9.BNRZCbEo08730FMY-AusdVF9K75SnSTX7bYBbgWbBd0';
export const authService = {
    login: async (credentials: UserLoginType) => {
        try {
            // return await fetchAuth('/login', { method: 'POST', data: credentials });
            // TODO: For API connection issue
            return { success: true, status: 200, data: { token: mockUserToken } };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },
    logout: () => fetchAuth('/logout', { method: 'POST' }),
    register: async (userData: UserRegisterType) => {
        try {
            return await fetchAuth('/register', { method: 'POST', data: userData });
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    },
    getUser: async () => {
        try {
            // return await fetchAPIWithAuth('/auth/me', { method: 'POST' });
            // TODO: For API connection issue
            const getMockUser = await axios.get('https://jsonplaceholder.typicode.com/users/1');
            getMockUser.data.id = mockUserId;
            return { success: true, status: 200, data: getMockUser?.data };
        } catch (error) {
            console.error('getUser error:', error);
            throw error;
        }
    }
};