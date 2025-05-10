import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: {
      target: 'http://127.0.0.1:3000/__self_service_path__/api-docs/openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      client: 'react-query',
      prettier: true,
      override: {
        mutator: {
          path: './src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'pageParam',
        },
      },
    },
  },
})
