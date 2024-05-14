const getEmailID = (wishlists) => {
  const info = wishlists.map((item) => ({
    label: item.wishlistType,
    value: item.id,
  }))

  return info
}

export default getEmailID
