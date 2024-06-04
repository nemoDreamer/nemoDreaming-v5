import withGraphql from "next-plugin-graphql";
import withYaml from "next-plugin-yaml";

/** @type {import('next').NextConfig} */
export default withYaml(withGraphql());