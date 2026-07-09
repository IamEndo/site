/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Silence the multi-lockfile workspace-root warning (a stray lockfile
  // exists in the home directory).
  turbopack: {
    root: import.meta.dirname,
  },
  // Allow Cloudflare tunnel + LAN access in dev so HMR + asset chunks aren't
  // treated as cross-origin and blocked.
  allowedDevOrigins: [
    '192.168.0.226',
    '*.trycloudflare.com',
  ],
};

export default nextConfig;
