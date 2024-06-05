type ResumeType = {
  header: {
    name: string;
    url?: string;
    phone: string;
    email: string;
  };
  qualifications: {
    title: string;
    body: [string];
  };
  skills: {
    title: string;
    groups: {
      [group: string]: [string];
    };
  };
  experience: {
    title: string;
    jobs: [
      {
        employer: string;
        location: string;
        date: string;
        position: string;
        additional?: string;
        achievements?: [string];
      },
    ];
  };
  education: {
    title: string;
    degrees: [
      {
        school: string;
        location: string;
        date: string;
        degree: string;
        major?: string;
      },
    ];
  };
};

declare module "*/data/resume.yaml" {
  const data: ResumeType;
  export = data;
}

declare module "*.graphql" {
  import { DocumentNode } from "@octokit/graphql/dist-types/types";
  const document: DocumentNode;
  export = document;
}
