export interface ProductSearchApi {
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string | null
  linkText: string
  productReference: string
  productReferenceCode: string
  categoryId: string
  productTitle: string
  metaTagDescription: string | null
  releaseDate: string
  clusterHighlights: Record<string, any>
  productClusters: Record<string, string>
  searchableClusters: Record<string, string>
  categories: string[]
  categoriesIds: string[]
  link: string
  Composer: string[]
  EditorsChoice: string[]
  IndexComposer: string[]
  IndexTitle: string[]
  MarketingCopy: string[]
  PDPLayout: string[]
  SupplierItemID: string[]
  MyScore: string[]
  UsedBy: string[]
  Group: string[]
  allSpecifications: string[]
  allSpecificationsGroups: string[]
  description: string
  items: Item[]
  skuSpecifications: SkuSpecification[]
}

interface Item {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: ReferenceId[]
  measurementUnit: string
  unitMultiplier: number
  modalType: string | null
  isKit: boolean
  images: Image[]
  AudioAvailable: string[]
  Component: string[]
  Delivery: string[]
  EprintFolders: string[]
  Instrument: string[]
  ItemSequence: string[]
  MarketedStatus: string[]
  Material: string[]
  MinimumSellQuantity: string[]
  MINTSDataAvailable: string[]
  ProductLine: string[]
  Prop65: string[]
  ScoreAvailable: string[]
  Size: string[]
  VideoAvailable: string[]
  variations: string[]
  sellers: Seller[]
  Videos: any[]
  estimatedDateArrival: string | null
}

interface ReferenceId {
  Key: string
  Value: string
}

interface Image {
  imageId: string
  imageLabel: string
  imageTag: string
  imageUrl: string
  imageText: string
  imageLastModified: string
}

interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

interface CommertialOffer {
  DeliverySlaSamplesPerRegion: Record<string, DeliverySlaSample>
  Installments: Installment[]
  DiscountHighLight: any[]
  GiftSkuIds: any[]
  Teasers: any[]
  PromotionTeasers: any[]
  BuyTogether: any[]
  ItemMetadataAttachment: any[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  FullSellingPrice: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  IsAvailable: boolean
  Tax: number
  DeliverySlaSamples: DeliverySlaSample[]
  GetInfoErrorMessage: string | null
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: PaymentOptions
}

interface DeliverySlaSample {
  DeliverySlaPerTypes: any[]
  Region: string | null
}

interface Installment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

interface PaymentOptions {
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: any[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
}

interface InstallmentOption {
  paymentSystem: string
  bin: string | null
  paymentName: string
  paymentGroupName: string
  value: number
  installments: InstallmentDetail[]
}

interface InstallmentDetail {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments: SellerMerchantInstallment[]
}

interface SellerMerchantInstallment {
  id: string
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
}

interface PaymentSystem {
  id: number
  name: string
  groupName: string
  validator: any
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string | null
  requiresAuthentication: boolean
  dueDate: string
  availablePayments: any
}

interface SkuSpecification {
  field: SkuField
  values: SkuValue[]
}

interface SkuField {
  id: number
  name: string
  isActive: boolean
  position: number
  type: string
}

interface SkuValue {
  id: string
  name: string
  position: number
}
