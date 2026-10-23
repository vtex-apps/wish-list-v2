export const FIELDS =
  'id,email,wishlistType,products,isPublic,fieldsConfig,createdIn'

export const DATA_ENTITY_NAME = 'myWishlists'

export const SCHEMA_NAME = '0.0.4-mywishlists'

/* Bump to reapply SCHEMA on accounts that already have it, without renaming the schema and moving documents. */
export const SCHEMA_REVISION = 1

export const SCHEMA = {
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    wishlistType: {
      type: 'string',
    },
    products: {
      type: 'array',
    },
    isPublic: {
      type: 'boolean',
    },
    fieldsConfig: {
      type: 'array',
    },
  },
  required: ['email', 'wishlistType', 'products', 'isPublic'],
  'v-indexed': [
    'email',
    'wishlistType',
    'products',
    'isPublic',
    'fieldsConfig',
  ],
  'v-default-fields': [
    'email',
    'wishlistType',
    'products',
    'isPublic',
    'fieldsConfig',
  ],
  'v-cache': false,
  'v-immediate-indexing': true,
  'v-security': {
    allowGetAll: false,
    publicRead: [],
    publicWrite: [],
    publicFilter: [],
  },
}
