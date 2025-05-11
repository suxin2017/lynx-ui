export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'WS' | 'OPTIONS' | 'HEAD' | 'PATCH'

export interface RequestFilter {
  method?: RequestMethod[]
  status?: string
  search?: string
}
