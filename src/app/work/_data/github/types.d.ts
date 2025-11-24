declare module "*.graphql" {
  import { DocumentNode } from "@octokit/graphql/types";
  const document: DocumentNode;
  export = document;
}
