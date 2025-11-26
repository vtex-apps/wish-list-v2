export default function hasSpecialCharacters(str: string) {
  const specialCharactersRegex = /[!@$%^*(),.?":{}|<>]/g

  return specialCharactersRegex.test(str)
}
