import type { FunctionComponent } from 'react'
import React, { useState } from 'react'
import type { WrappedComponentProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { Button, Tag, IconClear } from 'vtex.styleguide'
import PropTypes from 'prop-types'
import { useApolloClient } from 'react-apollo'
import { Item, Product } from 'vtex.product-context/react/ProductTypes'

import QuickOrderAutocomplete from './QuickOrderAutocomplete'
import productQuery from '../../queries/product.gql'
import handles from '../../styles.css'

interface SelectedProps {
  label: string
  seller?: string
  slug: string
  thumb?: string
  value: string
  data?: { product: Product }
  product?: Product
}

const AutocompleteBlock: FunctionComponent<any & WrappedComponentProps> = ({
  text,
  description,
  componentOnly,
  onAddToWishlist,
}) => {
  const client = useApolloClient()
  const [state, setState] = useState<{
    selectedItem: SelectedProps | null
    quantitySelected: number
    unitMultiplier: number
  }>({
    selectedItem: null,
    quantitySelected: 1,
    unitMultiplier: 1,
  })

  const clear = () => {
    setState({
      ...state,
      selectedItem: null,
      quantitySelected: 1,
      unitMultiplier: 1,
    })
  }

  const { selectedItem } = state

  const onSelect = async (product: any) => {
    if (!!product && product.length) {
      const query = {
        query: productQuery,
        variables: { slug: product[0].slug },
      }

      const response = await client.query(query)
      const { data } = response
      const selectedSku =
        data.product.items.length === 1 ? data.product.items[0].itemId : null

      const seller = selectedSku
        ? data.product.items[0].sellers.find(
            (item: { sellerDefault: boolean }) => {
              return item.sellerDefault === true
            }
          ).sellerId
        : null

      let multiplier = 1

      if (data.product.items.length === 1) {
        multiplier = data.product.items[0].unitMultiplier
      }

      setState({
        ...state,
        selectedItem:
          !!product && product.length
            ? { ...product[0], value: selectedSku, seller, data }
            : null,
        unitMultiplier: multiplier,
        quantitySelected: multiplier,
      })
    }

    return true
  }

  const selectSku = (value: string) => {
    const seller = selectedItem?.data?.product?.items
      .find((item: { itemId: string }) => {
        return item?.itemId === value
      })
      ?.sellers?.find((s: { sellerDefault: boolean }) => {
        return s.sellerDefault === true
      })?.sellerId

    const newSelected = {
      label: selectedItem?.label ?? '',
      slug: selectedItem?.slug ?? '',
      ...selectedItem,
      seller,
      value,
    }

    const matchedItem = selectedItem?.data?.product.items.find(
      (item: { itemId: string }) => item.itemId === value
    )

    setState({
      ...state,
      selectedItem: newSelected,
      unitMultiplier: matchedItem?.unitMultiplier ?? 1,
      quantitySelected: matchedItem?.unitMultiplier ?? 1,
    })
  }

  const thumb = (url: string) => {
    return url.replace('25-25', `50-50`)
  }

  return (
    <div className={`${handles.addSkuContainer}`}>
      {!componentOnly && (
        <div className={`${handles.textContainer} w-third-l w-100-ns fl-l`}>
          <h2
            className={`${handles.textContainerTitle} t-heading-3 mb3 ml5 ml3-ns mt4`}
          >
            {text}
          </h2>
          <div
            className={`${handles.textContainerDescription} t-body lh-copy c-muted-1 mb7 ml3 false`}
          >
            {description}
          </div>
        </div>
      )}
      <div
        className={`${handles.componentContainer} ${!componentOnly ? '' : ''}`}
      >
        <div className="w-100 mb5">
          <div
            className={`bg-base t-body c-on-base pa7 br3 b--muted-4 ${handles.componentContainerHelper}`}
          >
            <div className={handles.quickOrderAutocomplete}>
              {!selectedItem && <QuickOrderAutocomplete onSelect={onSelect} />}
            </div>
            {!!selectedItem && (
              <div>
                <div
                  className={`w-two-thirds-l w-100-ns fl-l flex items-center ${handles.quickOrderAutocomplete}`}
                >
                  <div
                    className={`flex flex-column w-15 fl ${handles.productThumb}`}
                  >
                    <img
                      src={thumb(selectedItem?.thumb ?? '')}
                      width="50"
                      height="50"
                      alt=""
                    />
                  </div>
                  <div
                    className={`flex flex-column w-50 fl ${handles.productLabel}`}
                  >
                    <span className={`${handles.productTitle}`}>
                      {selectedItem.label}
                    </span>

                    {!!selectedItem &&
                      selectedItem.data?.product &&
                      selectedItem.data?.product?.items?.length > 1 && (
                        <div className={`${handles.productSku} flex flex-row`}>
                          {selectedItem.data?.product.items.map(
                            (item: Item) => {
                              return (
                                <span
                                  key={item.itemId}
                                  className={`mr4 ${handles.skuSelection}`}
                                >
                                  <Tag
                                    size="small"
                                    bgColor={
                                      item.itemId === selectedItem.value
                                        ? '#8bc34a'
                                        : '#979899'
                                    }
                                    onClick={() => {
                                      selectSku(item.itemId)
                                    }}
                                  >
                                    {item.name}
                                  </Tag>
                                </span>
                              )
                            }
                          )}
                        </div>
                      )}
                  </div>
                </div>
                <div className="w-third-l w-100-ns fr-l flex-row-l">
                  <div className="flex flex-column fl h-50">
                    <Button
                      variation="primary"
                      size="small"
                      onClick={async () => {
                        const result = await onAddToWishlist(selectedItem)

                        if (result) {
                          clear()
                        }
                      }}
                    >
                      Add to Favourite List
                    </Button>
                  </div>
                  <div
                    className={`flex flex-column w-100 fl ${handles.buttonClear}`}
                  >
                    <Button
                      variation="tertiary"
                      size="medium"
                      onClick={() => {
                        clear()
                      }}
                    >
                      <IconClear
                        onClick={() => {
                          clear()
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

AutocompleteBlock.propTypes = {
  componentOnly: PropTypes.bool,
  text: PropTypes.string,
  description: PropTypes.string,
  onAddToWishlist: PropTypes.func,
}

export default injectIntl(AutocompleteBlock)
