import Credentials from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { fetchAPI } from "./api";

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    console.error('Missing username or password');
                    return null;
                }
                return true;
                // TODO: error: fetch failed
                try {
                    const response = await auth.login({
                        username: credentials?.username as string,
                        password: credentials?.password as string
                    });
                    if (response?.data?.token) {
                        return { token: response.data.token };
                    }
                    return null;
                } catch (error) {
                    console.error('Login error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    },
    debug: process.env.NODE_ENV === 'development',
};

const routePrefix = '/auth';
export async function fetchAuth(endpoint: string, options: RequestInit = {}) {
    return fetchAPI(`${routePrefix}${endpoint}`, options);
}
export const auth = {
    login: async (credentials: { username: string; password: string }) => {
        try {
            console.log('Sending login request to API with credentials:', credentials);
            return await fetchAuth('/login', {
                method: 'POST',
                body: JSON.stringify(credentials)
            });
        } catch (error) {
            console.error('Login error in auth.ts:', error);
            throw error;
        }
    },
    logout: () => fetchAuth('/logout'),
    register: (userData: { username: string; password: string }) =>
        fetchAuth('/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),
    getUser: () => fetchAuth('/me')
};