import makeBundleAnalyzer from "@next/bundle-analyzer";
import withPlaiceholder from "@plaiceholder/next";
import withGraphql from "next-plugin-graphql";
import withYaml from "next-plugin-yaml";

const withBundleAnalyzer = makeBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
export default withBundleAnalyzer(withPlaiceholder(withYaml(withGraphql())));
