/* Never log the raw HTTP error: its request config carries the body and cookies, which hold user tokens. */
export const describeError = (error: any) => ({
  status: error?.response?.status,
  code: error?.code,
  errorMessage: error?.message,
})
