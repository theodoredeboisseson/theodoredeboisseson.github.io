/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
        qualities: [75, 100],
    },
};

export default nextConfig;
