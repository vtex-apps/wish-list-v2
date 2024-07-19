export const removePrefixRegex = (str, prefix) => {
  return str.replace(new RegExp(`^${prefix}`), '')
}
