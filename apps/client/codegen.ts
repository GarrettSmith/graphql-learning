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
      config: {
        useTypeImports: true,
        // Fragment masking disabled for now — revisit when learning large-app patterns.
        // When enabled, fragment fields are hidden behind FragmentType<> and require
        // useFragment() to access, enforcing strict co-location (Relay-style).
        disableOnClient: true,
      },
    },
  },
};

export default config;
