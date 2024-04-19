import { Apps } from '@vtex/api'

import { DATA_ENTITY_NAME, SCHEMA, SCHEMA_NAME } from '../utils/constant'

const getAppId = (): string => {
  return process.env.VTEX_APP_ID ?? ''
}

const routes = {
  baseUrl: (account: string) =>
    `http://${account}.vtexcommercestable.com.br/api`,
  wishListEntity: (account: string, entity: string) =>
    `${routes.baseUrl(account)}/dataentities/${entity}`,
  saveSchema: (account: string, schema_version: string, entity: string) =>
    `${routes.wishListEntity(account, entity)}/schemas/${schema_version}`,
}

const defaultHeaders = (authToken: string) => ({
  'Content-Type': 'application/json',
  Accept: 'application/vnd.vtex.ds.v10+json',
  VtexIdclientAutCookie: authToken,
  'Proxy-Authorization': authToken,
})

const defaultSettings = {
  adminSetup: {
    storeLogoUrl: '',
    hasSchema: false,
    schemaVersion: null,
  },
}

export const configuration = async (ctx: Context) => {
  const {
    vtex: { account, authToken },
    clients: { hub },
  } = ctx

  const apps = new Apps(ctx.vtex)
  const app: string = getAppId()
  let settings = await apps.getAppSettings(app)

  if (!settings.adminSetup) {
    settings = defaultSettings
  }

  if (
    !settings.adminSetup.hasSchema ||
    settings.adminSetup.schemaVersion !== SCHEMA_NAME
  ) {
    try {
      const url = routes.saveSchema(account, SCHEMA_NAME, DATA_ENTITY_NAME)

      const headers = defaultHeaders(authToken)

      await hub.put(url, SCHEMA, headers)

      settings.adminSetup.hasSchema = true
      settings.adminSetup.schemaVersion = SCHEMA_NAME
    } catch (e) {
      if (e.response.status >= 400) {
        settings.adminSetup.hasSchema = false
      } else {
        settings.adminSetup.hasSchema = true
        settings.adminSetup.schemaVersion = SCHEMA_NAME
      }
    }
  }

  await apps.saveAppSettings(app, settings)

  return 'settings'
}
