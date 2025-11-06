/*
import makeBundleAnalyzer from "@next/bundle-analyzer";
import withPlaiceholder from "@plaiceholder/next";
import withGraphql from "next-plugin-graphql";
import withYaml from "next-plugin-yaml";

const withBundleAnalyzer = makeBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withPlaiceholder(withYaml(withGraphql())));
*/

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
