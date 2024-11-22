import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { auth } from "@/lib/auth";

const handler = NextAuth({
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
                    console.log('auth login response:', response)
                    if (response?.data?.token) {
                        return { token: response.data.token };
                    }

                    return null;
                } catch (error) {
                    console.error('Login error:', error);
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            return session
        }
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }