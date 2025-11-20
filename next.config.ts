/*
import makeBundleAnalyzer from "@next/bundle-analyzer";
import withPlaiceholder from "@plaiceholder/next";
import withGraphql from "next-plugin-graphql";

const withBundleAnalyzer = makeBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  });
  
  export default withBundleAnalyzer(withPlaiceholder(withYaml(withGraphql())));
  */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    rules: {
      "*.y{a,}ml": {
        loaders: ["yaml-loader"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
