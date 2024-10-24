export interface SelectWishList {
  isShowForm: boolean
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>
  nameListWishlist: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isButton: boolean
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
  blockClass: string
}

export interface AdminSetup {
  storeLogoUrl: string
  hasSchema: boolean
  schemaVersion: string
}

export interface AdminSettings {
  defaultTitleText: string
  imageName: string
  image: boolean
  imageRowWidth: number
  skuNameTitle: string
  skuName: boolean
  skuNameRowWidthAccount: number
  skuNameRowWidthShare: number
  departmentTitle: string
  department: boolean
  departmentRowWidth: number
  skuReferenceCodeTitle: string
  skuReferenceCode: boolean
  skuReferenceCodeRowWidth: number
  quantityTitle: string
  quantity: boolean
  quantityRowWidth: number
  unitValueTitle: string
  unitValue: boolean
  unitValueRowWidth: number
  totalValueTitle: string
  totalValue: boolean
  totalValueRowWidth: number
  notes: boolean
  addTitle: string
  add: boolean
  addRowWidth: number
  removeTitle: string
  remove: boolean
  adminSetup: AdminSetup
}

export interface PublicSettingsForApp {
  message: string
}

export interface WishlistProductItem {
  id: number
  itemId: number
  image: string
  department: string
  skuReferenceCode: string
  name: string
  quantity: number
  linkProduct: string
  bundle: null | string
  notes: null | string
}
