/** @type {import('next').NextConfig} */
const nextConfig = {
    // TODO: For API connection issue
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**'
            },
            {
                protocol: 'http',
                hostname: '**'
            }
        ]
    }
};

export default nextConfig;
