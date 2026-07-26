import type { NextConfig } from "next";

/**
 * Static export so the site can be served by GitHub Pages.
 * `BASE_PATH` is supplied by CI (e.g. "/getninjaportfolio") because Pages
 * serves project sites from a sub-path.
 */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // next/image optimisation needs a server; static export requires this off.
    unoptimized: true,
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
