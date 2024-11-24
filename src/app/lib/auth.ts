import axios, { AxiosRequestConfig } from "axios";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetchAPI, fetchAPIWithAuth } from "./api";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('authorize started')
                if (!credentials?.username || !credentials?.password) {
                    console.error('Missing username or password');
                    return null;
                }
                try {
                    const response = await auth.login({
                        username: credentials?.username as string,
                        password: credentials?.password as string
                    });
                    if (response?.status && response?.data?.token) {
                        const user = await auth.getUser();
                        if (user?.status && user?.data) {
                            return { user: user.data, token: response.data.token };
                        }
                        return { token: response.data.token };
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
        strategy: "jwt"
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
const mockUserId = 'aed3186d-a7c3-436e-a1f5-aa353f62b9e8'; // TODO: For API connection issue
export const auth = {
    login: async (credentials: LoginType) => {
        try {
            // return await fetchAuth('/login', { method: 'POST', data: credentials });
            return { status: true, data: { token: mockUserId } }; // TODO: For API connection issue
        } catch (error) {
            console.error('Login error in auth.ts:', error);
            throw error;
        }
    },
    logout: () => fetchAuth('/logout', { method: 'POST' }),
    register: async (userData: RegisterType) => {
        try {
            return await fetchAuth('/register', { method: 'POST', data: userData });
        } catch (error) {
            console.error('Register error in auth.ts:', error);
            throw error;
        }
    },
    getUser: async () => {
        try {
            // return await fetchAPIWithAuth('/auth/me', { method: 'POST' });
            // TODO: For API connection issue
            const getMockUser = await axios.get('https://jsonplaceholder.typicode.com/users/1');
            getMockUser.data.id = mockUserId;
            return getMockUser;
        } catch (error) {
            console.error('getUser error in auth.ts:', error);
            throw error;
        }
    }
};

type LoginType = {
    username: string;
    password: string;
}
type RegisterType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}