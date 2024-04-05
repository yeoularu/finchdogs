/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.redd.it',
                pathname: '/*',
            },
        ],
    },
};

export default nextConfig;
