// Security headers sent with every response.
//
// The policy was checked in a Chromium browser against the home page (both 3D
// scenes), the docs, the search dialog and the web flasher with zero
// violations before it was enforced. Everything the site loads is same-origin:
// the flasher library and the 3D lighting maps are vendored under public/.
const CSP = [
  "default-src 'self'",
  // Next.js inlines its bootstrap/RSC payload scripts; a nonce-based policy
  // would force every page to render dynamically.
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' blob: data:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: CSP },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Web Serial stays available to this origin for the web flasher.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), serial=(self)',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
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
  async redirects() {
    return [
      // The PIN became an access password in firmware 0.5.0; keep old links working.
      { source: '/docs/security/pin-setup', destination: '/docs/security/access-password', permanent: true },
      { source: '/docs/security/pin-practices', destination: '/docs/security/password-practices', permanent: true },
    ];
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Versioned directory: the files never change under this path.
        source: '/vendor/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/.well-known/security.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
      {
        // Lighting maps for the 3D scenes (from pmndrs/drei-assets, CC0 Poly Haven HDRIs).
        source: '/hdri/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }],
      },
    ];
  },
};

export default nextConfig;
