import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Transpile the core workspace package so Next.js can process it
  transpilePackages: ["core"],

  // Ensure external packages are bundled correctly
  serverExternalPackages: [
    "@neondatabase/serverless",
    "better-auth",
    "drizzle-orm"
  ],

  // Configure Turbopack to resolve @api/* path alias
  turbopack: {
    resolveAlias: {
      "@api": path.resolve(__dirname, "../api/src")
    }
  }
};

export default nextConfig;
