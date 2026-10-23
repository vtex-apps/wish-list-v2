import { auth } from '../middleware/auth'
import { configuration } from '../middleware/configuration'

const getRequesterEmail = async (ctx: Context) => {
  try {
    const { email } = await auth(ctx)

    return email
  } catch {
    return null
  }
}

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

  const [wishlist, requesterEmail] = await Promise.all([
    md.getWishlist(id),
    getRequesterEmail(ctx),
  ])

  if (!wishlist) {
    return wishlist
  }

  /* Shared links are readable by anyone, so the owner's email is only exposed to the owner. */
  const isOwner =
    !!requesterEmail &&
    wishlist.email?.toLowerCase() === requesterEmail.toLowerCase()

  return isOwner ? wishlist : { ...wishlist, email: null }
}
