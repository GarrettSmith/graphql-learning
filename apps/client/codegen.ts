import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // Pull the schema live from the running Apollo Server
  schema: "http://localhost:4000/",

  // Scan these files for gql queries/mutations/fragments
  documents: ["app/**/*.tsx", "components/**/*.tsx", "lib/**/*.ts"],

  generates: {
    // All generated types land in one file
    "./lib/__generated__/": {
      plugins: [],
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "useFragment" },
      },
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;
