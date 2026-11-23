import { Apps } from '@vtex/api'

import { describeError } from '../utils/describeError'
import {
  DATA_ENTITY_NAME,
  SCHEMA,
  SCHEMA_NAME,
  SCHEMA_REVISION,
} from '../utils/constant'

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

  /* Copy the defaults: the module object is shared by every account in the pod, and other settings must be kept. */
  if (!settings.adminSetup) {
    settings = { ...settings, adminSetup: { ...defaultSettings.adminSetup } }
  }

  if (
    !settings.adminSetup.hasSchema ||
    settings.adminSetup.schemaVersion !== SCHEMA_NAME ||
    settings.adminSetup.schemaRevision !== SCHEMA_REVISION
  ) {
    try {
      const url = routes.saveSchema(account, SCHEMA_NAME, DATA_ENTITY_NAME)

      const headers = defaultHeaders(authToken)

      await hub.put(url, SCHEMA, headers)

      settings.adminSetup.hasSchema = true
      settings.adminSetup.schemaVersion = SCHEMA_NAME
      settings.adminSetup.schemaRevision = SCHEMA_REVISION

      await apps.saveAppSettings(app, settings)
    } catch (error) {
      /* Keep hasSchema untouched: older app versions republish their public schema when it is false. */
      ctx.vtex.logger.error({
        message: 'configuration-save-schema-failed',
        ...describeError(error),
      })
    }
  }

  return 'settings'
}
