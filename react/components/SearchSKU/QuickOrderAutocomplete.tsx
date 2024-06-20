/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionComponent } from 'react'
import React, { useState, useRef } from 'react'
import { AutocompleteInput } from 'vtex.styleguide'
import PropTypes from 'prop-types'
import type { WrappedComponentProps } from 'react-intl'
import { injectIntl, IntlShape } from 'react-intl'
import { useApolloClient } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'

import { SearchIcon } from '../Icons'
import autocomplete from '../../queries/autocomplete.gql'
import styles from './searchSKU.css'

const getImageSrc = (img: string) => {
  const td = img.split('/')
  const ids = td[td.indexOf('ids') + 1]

  return img.replace(ids, `${ids}-50-50`)
}

interface Item {
  items: any
}

const CustomOption = (props: any) => {
  const { roundedBottom, searchTerm, value, selected, onClick } = props
  const [highlightOption, setHighlightOption] = useState(false)
  const CSS_HANDLES = [
    'customOptionButton',
    'imageThumbContainer',
    'imageThumb',
    'searchTextPreviewWrapper',
  ] as const

  const { handles } = useCssHandles(CSS_HANDLES)
  const renderOptionHighlightedText = () => {
    const highlightableText = typeof value === 'string' ? value : value.label
    const index: number = highlightableText
      .toLowerCase()
      .indexOf(searchTerm.toLowerCase())

    if (index === -1) {
      return highlightableText
    }

    const prefix = highlightableText.substring(0, index)
    const match = highlightableText.substr(index, searchTerm.length)
    const suffix = highlightableText.substring(
      index + parseInt(match.length, 10)
    )

    return (
      <span className="truncate">
        <span className="fw7">{prefix}</span>
        {match}
        <span className="fw7">{suffix}</span>
      </span>
    )
  }

  const buttonClasses = `
    ${handles.customOptionButton}
    ${roundedBottom ? 'br2 br--bottom' : ''}
    ${highlightOption || selected ? 'bg-muted-5' : 'bg-base'}
    bn w-100 tl pointer pa4 f6
  `

  const thumb = value.thumb ? value.thumb : ''

  return (
    <button
      className={buttonClasses}
      onFocus={() => setHighlightOption(true)}
      onMouseEnter={() => setHighlightOption(true)}
      onMouseLeave={() => setHighlightOption(false)}
      onClick={onClick}
    >
      <div className="flex items-center">
        {thumb && (
          <span
            className={`${handles.imageThumbContainer} mr3 c-muted-2 flex pt1`}
          >
            <img className={`${handles.imageThumb}`} src={thumb} alt="" />
          </span>
        )}
        <div className={`${handles.searchTextPreviewWrapper}`}>
          <span className="pr2">{renderOptionHighlightedText()}</span>
          {typeof value !== 'string' && (
            <div className="t-mini c-muted-1">{value.caption}</div>
          )}
        </div>
      </div>
    </button>
  )
}

interface QuickOrderAutocompleteInt {
  onSelect: any
}
const QuickOrderAutocomplete: FunctionComponent<
  WrappedComponentProps & QuickOrderAutocompleteInt
> = ({
  onSelect,
  intl,
}: {
  onSelect: (...args: any) => void
  intl: IntlShape
}) => {
  const client = useApolloClient()
  const [optionsResult, setOptions] = useState([])
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastSearched, setLastSearched] = useState([])
  const timeoutRef: any = useRef(null)

  const handleSearch = async ({ value }: { value: string }) => {
    if (value.length > 1) {
      const { data } = await client.query({
        query: autocomplete,
        variables: { inputValue: value },
      })

      setOptions(
        !!data &&
          !!data.productSuggestions &&
          !!data.productSuggestions.products
          ? data.productSuggestions.products
          : []
      )
    }
  }

  const renderOptionRender = (props: any) => <CustomOption {...props} />

  const options = {
    onSelect: (...args: any) => {
      onSelect(args)
    },
    loading,
    value: !term.length
      ? []
      : optionsResult
          .filter((item: Item) => {
            return !!item.items[0].images[0].imageUrl
          })
          .map((item: any) => {
            return {
              value: item.items[0].itemId,
              label: item.productName,
              slug: item.linkText,
              thumb: getImageSrc(item.items[0].images[0].imageUrl),
            }
          }),
    lastSearched: {
      value: lastSearched,
      label: 'Last searched products',
      onChange: (option: never) =>
        option && setLastSearched([...new Set([...lastSearched, option])]),
    },
    // --- This is what makes the custom option work!
    renderOption: renderOptionRender,
  }

  const input = {
    onChange: (nterm: string) => {
      if (nterm) {
        setLoading(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
          setLoading(false)
          setTerm(nterm)
          handleSearch({ value: nterm })
          timeoutRef.current = null
        }, 1000)
      } else {
        setTerm(nterm)
      }
    },
    onClear: () => setTerm(''),
    placeholder: intl.formatMessage({
      id: 'store/favorite-list.search-product-by-sku',
    }),
    value: term,
  }

  return (
    <div className={`${styles.autocompleteInputWrapper}`}>
      <AutocompleteInput input={input} options={options} />
      <SearchIcon />
    </div>
  )
}

QuickOrderAutocomplete.propTypes = {
  onSelect: PropTypes.func,
}
export default injectIntl(QuickOrderAutocomplete)
