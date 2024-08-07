import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: 'src/graphql/operation/**/*.graphql',
  generates: {
    "./src/graphql/gql/": {
      preset: "client",
    }
  }
}
export default config
