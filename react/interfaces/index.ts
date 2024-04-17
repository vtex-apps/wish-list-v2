export interface SelectWishList {
  isShowForm: boolean
  setIsShowForm: any
  nameListWishlist: any
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isButton: boolean
  setIsButton?: any
  isMessage: boolean
  isShowForm2: boolean
  handleAddList: () => void
  listTypeWishlist?: any
  emailInfo?: any
  handleSendData1: (e: React.FormEvent) => void
  handleSendData2: (e: React.FormEvent) => void
  showFormClick?: boolean
  clickCreate: boolean
  handleCloseModal?: () => void
  handleCreateLengthZero: () => void
  selectRef: any
  handleCaptureValue: (e: React.ChangeEvent<HTMLSelectElement>) => void
  selectSize: number
  handleSelectFocus: () => void
  handleSelectBlur: () => void
  handleAddToList: () => void
  closeSlect: boolean
  errorName: string
  errorSelect: string
  isLoading: boolean
}

export interface PropsModal {
  children: any
}
