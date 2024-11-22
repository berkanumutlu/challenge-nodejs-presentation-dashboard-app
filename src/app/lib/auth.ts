import { fetchAPI } from "./api";

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