/* eslint-disable no-undef */
export default function copyToClipboard(link, setTextCopied) {
  // Create a hidden textarea element to copy the text
  const textarea = document.createElement('textarea')

  textarea.value = link // Use the link passed as an argument
  document.body.appendChild(textarea)
  textarea.select()
  textarea.setSelectionRange(0, 99999)
  document.execCommand('copy')
  document.body.removeChild(textarea)
  setTextCopied(true)
  setTimeout(() => {
    setTextCopied(false)
  }, 2000)
}
