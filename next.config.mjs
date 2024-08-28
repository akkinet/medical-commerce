/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['www.cpapmiami.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https', // or 'http' if needed
        hostname: 'www.cpapmiami.com', // Replace with your domain
        port: '', // Optional, specify port if needed
        pathname: '/**', // Optional, filter specific paths
      },
      {
        protocol: 'https', // or 'http' if needed
        hostname: 'res.cloudinary.com', // Replace with your domain
        port: '', // Optional, specify port if needed
        pathname: '/**', // Optional, filter specific paths
      },            // Add more patterns for other domains if necessary
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
  }
};

export default nextConfig;
