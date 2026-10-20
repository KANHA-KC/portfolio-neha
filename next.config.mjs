/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/projects/:id", destination: "/work/:id", permanent: true },
      { source: "/expertise", destination: "/about", permanent: true }
    ];
  }
};

export default nextConfig;
