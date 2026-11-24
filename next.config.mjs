/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security"
  },
  images: {
    // Images uploaded to the Wix Media Manager
    remotePatterns: [new URL("https://static.wixstatic.com/**")]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" }
        ]
      }
    ];
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:id", destination: "/work/:id", permanent: true },
      { source: "/expertise", destination: "/about", permanent: true }
    ];
  }
};

export default nextConfig;
