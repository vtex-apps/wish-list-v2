import { configuration } from '../middleware/configuration'

export const getWishlist = async (
  _: unknown,
  args: { id: string },
  ctx: Context
) => {
  const {
    clients: { md },
  } = ctx

  const { id } = args

  await configuration(ctx)

  return md.getWishlist(id)
}
