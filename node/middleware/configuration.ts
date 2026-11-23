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

/* Persisted in app settings rather than memory, so every pod of the account honors it. */
const SCHEMA_RETRY_BASE_MS = 60 * 1000
const SCHEMA_RETRY_MAX_MS = 30 * 60 * 1000

const retryInterval = (failures: number) =>
  Math.min(SCHEMA_RETRY_BASE_MS * 2 ** (failures - 1), SCHEMA_RETRY_MAX_MS)

/* Outages and timeouts may clear on the next request; only rejections are worth backing off. */
const isTransient = (error: any) => {
  const status = error?.response?.status

  return !status || status >= 500
}

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

  const { adminSetup } = settings

  const isSchemaCurrent =
    adminSetup.hasSchema &&
    adminSetup.schemaVersion === SCHEMA_NAME &&
    adminSetup.schemaRevision === SCHEMA_REVISION

  const failures = Number(adminSetup.schemaFailureCount) || 0
  const lastFailure = Date.parse(adminSetup.schemaFailedAt ?? '')
  const isBackingOff =
    failures > 0 && Date.now() - lastFailure < retryInterval(failures)

  if (isSchemaCurrent || isBackingOff) {
    return 'settings'
  }

  const previous = {
    previousHasSchema: adminSetup.hasSchema,
    previousSchemaVersion: adminSetup.schemaVersion,
    previousSchemaRevision: adminSetup.schemaRevision,
  }

  let step = 'put-schema'

  try {
    const url = routes.saveSchema(account, SCHEMA_NAME, DATA_ENTITY_NAME)

    const headers = defaultHeaders(authToken)

    await hub.put(url, SCHEMA, headers)

    step = 'save-settings'
    await apps.saveAppSettings(app, {
      ...settings,
      adminSetup: {
        ...adminSetup,
        hasSchema: true,
        schemaVersion: SCHEMA_NAME,
        schemaRevision: SCHEMA_REVISION,
        schemaFailedAt: null,
        schemaFailureCount: 0,
      },
    })

    ctx.vtex.logger.info({
      message: 'configuration-schema-applied',
      schemaVersion: SCHEMA_NAME,
      schemaRevision: SCHEMA_REVISION,
      ...previous,
    })
  } catch (error) {
    const transient = isTransient(error)
    const nextFailures = failures + 1

    /* Keep hasSchema untouched: older app versions republish their public schema when it is false. */
    const backoffSaved = transient
      ? false
      : await apps
          .saveAppSettings(app, {
            ...settings,
            adminSetup: {
              ...adminSetup,
              schemaFailedAt: new Date().toISOString(),
              schemaFailureCount: nextFailures,
            },
          })
          .then(() => true)
          .catch(() => false)

    ctx.vtex.logger.error({
      message: 'configuration-save-schema-failed',
      step,
      transient,
      backoffSaved,
      retryInMs: backoffSaved ? retryInterval(nextFailures) : 0,
      ...previous,
      ...describeError(error),
    })
  }

  return 'settings'
}
