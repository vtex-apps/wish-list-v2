import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export interface ValidatedCredential {
  authStatus: string
  id?: string
  user?: string
  account?: string
}

export default class VtexId extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br/api/vtexid`,
      context,
      {
        ...options,
        headers: {
          ...options?.headers,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VTEX-Proxy-To': `https://${context.account}.vtexcommercestable.com.br`,
          'x-vtex-user-agent': context.userAgent,
        },
      }
    )
  }

  /* The store token must only travel in the body: VTEX ID rejects store tokens sent as VtexIdclientAutCookie headers. */
  public async validateCredential(token: string) {
    return this.http.post<ValidatedCredential>(
      `/credential/validate?an=${this.context.account}`,
      { token },
      { metric: 'vtexid-credential-validate' }
    )
  }
}
