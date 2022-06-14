/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_NHOST_BACKEND: process.env.NEXT_PUBLIC_NHOST_BACKEND
  }
}

module.exports = nextConfig
