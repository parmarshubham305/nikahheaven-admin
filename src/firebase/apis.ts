const GOOGLE_DOCS_BASE_URL = 'https://docs.googleapis.com/';

const GOOGLE_DRIVE_BASE_URL = 'https://www.googleapis.com/drive/';

// EndPoints Route for Backend
export const ApiRoutes = {
  INVITE_USER: 'inviteReviewer',
  CREATE_STRIPE_USER: 'createStripeCustomer',
  BUY_SUBSCRIPTION: 'checkout',
  MANAGE_SUBSCRIPTION: 'createCustomerPortal',
  UPDATE_STRIPE_SUBSCRIPTION: 'updateSubscription',
  GET_GOOGLE_DOC_CONTENT: 'getGoogleDocsContent',
  APPLY_REFERRAL_REWARD: 'createReferralReward',
  SEND_EMAIL: 'emailDeliveryHandler',
  GOOGLE_AUTH: 'googleAuth',
  VERTEX_AI: 'chatWithAI',

  CREATE_GOOGLE_DOC: GOOGLE_DOCS_BASE_URL + 'v1/documents',
  UPDATE_GOOGLE_DOC: GOOGLE_DRIVE_BASE_URL + 'v3/files/fileId',
  UPDATE_GOOGLE_DOC_WITH_DOCS_API:
    GOOGLE_DOCS_BASE_URL + 'v1/documents/documentId:batchUpdate',
  GET_GOOGLE_DOC_DOCS_API: GOOGLE_DOCS_BASE_URL + 'v1/documents/documentId',
  CREATE_FILE_IN_DRIVE: GOOGLE_DRIVE_BASE_URL + 'v3/files',
  GET_GOOGLE_DOC: GOOGLE_DRIVE_BASE_URL + 'v3/files/documentId?fields=*',
  GET_GOOGLE_DOC_PER:
    GOOGLE_DRIVE_BASE_URL + 'v3/files/documentId/permissions?fields=*',
  COPY_GOOGLE_DOC: GOOGLE_DRIVE_BASE_URL + 'v3/files/documentId/copy?fields=*',
  REVOKE_GOOGLE_DOC_ACCESS:
    GOOGLE_DRIVE_BASE_URL + 'v3/files/fileId/permissions/permissionId',
  GET_REFRESH_TOKEN: 'https://www.googleapis.com/oauth2/v4/token',
  CHECK_TOKEN_VALID:
    'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=accessToken',
};
