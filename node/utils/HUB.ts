import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

type Headers = {
  [key: string]: string
}

type Data = {
  [key: string]: any
}

export default class RequestHub extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(
      `http://${context.account}.vtexcommercestable.com.br/api/`,
      context,
      options
    )
  }

  public authToken() {
    return this.context.authToken
  }

  public account() {
    return this.context.account
  }

  public get(url: string, headers?: Headers, data?: Data) {
    return this.http.getRaw(url, {
      headers,
      data,
    })
  }

  public post(url: string, data: Data, headers?: Headers) {
    return this.http.postRaw(url, data, {
      headers,
    })
  }

  public put(url: string, data: Data, headers?: Headers) {
    return this.http.putRaw(url, data, {
      headers,
    })
  }

  public delete(url: string) {
    return this.http.delete(url)
  }
}
