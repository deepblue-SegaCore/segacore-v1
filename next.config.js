
const { env } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [env.REPLIT_DOMAINS?.split(",")[0]],
};

module.exports = nextConfig;
