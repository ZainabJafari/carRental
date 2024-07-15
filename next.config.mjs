/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.imagin.studio', 'images.pexels.com'], // Lägg till 'images.pexels.com' här
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
