import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Allow Cloudflare tunnel + LAN access in dev so HMR + asset chunks aren't
  // treated as cross-origin and blocked.
  allowedDevOrigins: [
    'estimation-buyer-creatures-tuner.trycloudflare.com',
    '192.168.0.226',
    '*.trycloudflare.com',
  ],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});

export default withMDX(nextConfig);
