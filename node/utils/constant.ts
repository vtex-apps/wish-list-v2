export const FIELDS =
  'id,email,wishlistType,products,isPublic,fieldsConfig,createdIn'

export const DATA_ENTITY_NAME = 'myWishlists'

export const SCHEMA_NAME = '0.0.4-mywishlists'

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
    allowGetAll: true,
    publicRead: [
      'id',
      'email',
      'wishlistType',
      'products',
      'isPublic',
      'fieldsConfig',
    ],
  },
}
