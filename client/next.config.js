/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    NEXT_GIPHY_API:process.env.NEXT_GIPHY_API,
  },
}

module.exports = nextConfig
