import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class Pricing extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super(
            `https://api.vtex.com/${context.account}/pricing/prices`,
            context,
            options
        )
    }

    public getPriceBySkuId = async (skuId: number) => {

        this.context.logger.debug({
            auth: this.context.authToken,
            url: this.context.host,
        })

        const priceEndpoint = `/${skuId}`
        const priceingResponse = await this.http.get(priceEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                VtexIdclientAutCookie: `${this.context.authToken}`,
                'Cache-Control': 'no-cache',
            },
        })

        return priceingResponse
    }

}
