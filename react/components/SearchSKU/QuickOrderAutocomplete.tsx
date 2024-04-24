/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FunctionComponent } from 'react'
import React, { useState, useRef } from 'react'
import { AutocompleteInput } from 'vtex.styleguide'
import PropTypes from 'prop-types'
import type { WrappedComponentProps } from 'react-intl'
import { injectIntl } from 'react-intl'
import { useApolloClient } from 'react-apollo'
import { useCssHandles } from 'vtex.css-handles'

import autocomplete from '../../queries/autocomplete.gql'

import styles from './searchSKU.css'

const getImageSrc = (img: string) => {
  const td = img.split('/')
  const ids = td[td.indexOf('ids') + 1]

  return img.replace(ids, `${ids}-50-50`)
}

const CustomOption = (props: any) => {
  const { roundedBottom, searchTerm, value, selected, onClick } = props
  const [highlightOption, setHighlightOption] = useState(false)
  const CSS_HANDLES = ['customOptionButton'] as const

  const handles = useCssHandles(CSS_HANDLES)
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
        <span className="mr3 c-muted-2 flex pt1">
          {thumb && <img src={thumb} alt="" />}
        </span>
        <span className="pr2">{renderOptionHighlightedText()}</span>
        {typeof value !== 'string' && (
          <div className="t-mini c-muted-1">{value.caption}</div>
        )}
      </div>
    </button>
  )
}

interface QuickOrderAutocompleteInt {
  onSelect: any
}
const QuickOrderAutocomplete: FunctionComponent<
  WrappedComponentProps & QuickOrderAutocompleteInt
> = ({ onSelect }: any) => {
  const client = useApolloClient()
  const [optionsResult, setOptions] = useState([])
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastSearched, setLastSearched] = useState([])
  const timeoutRef: any = useRef(null)

  const handleSearch = async ({ value }: any) => {
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

  const options = {
    onSelect: (...args: any) => {
      onSelect(args)
    },
    loading,
    value: !term.length
      ? []
      : optionsResult
        .filter((item: any) => {
          return !!item.items[0].images[0].imageUrl
        })
        .map((item: any) => {
          return {
            value: item.items[0].itemId,
            label: item.items[0].name,
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
    // eslint-disable-next-line react/display-name
    renderOption: (props: any) => <CustomOption {...props} />,
  }

  const input = {
    onChange: (nterm: any) => {
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
    placeholder: 'Search products by SKU',
    value: term,
  }

  return (<div className={`${styles.autocompleteInputWrapper}`}>
    <AutocompleteInput input={input} options={options} />
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect width="25" height="24" fill="url(#pattern0_904_1396)" />
      <defs>
        <pattern id="pattern0_904_1396" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_904_1396" transform="matrix(0.0344828 0 0 0.0359195 0 -0.164511)" />
        </pattern>
        <image id="image0_904_1396" width="29" height="37" xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAlAB0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Sv7Pi/vT/wDf+T/4qj+z4v70/wD3/k/+KrD+I3xF0D4T+CtU8V+J79dN0TTY/MnnYFjyQqqqjlmZiFAHUkV4H/w118QF0f8A4So/s8+LB4C2+f8A2n/aFt/aHkdfN/s//WY2/N97Hv3rpp4erWXNBaeqXy13ZlKpCDsz6Y/s+L+9P/3/AJP/AIqj7BF/fm/7/v8A41i/Dz4g6D8VPBeleKvDN+upaJqUXm29woIPUhlYHlWVgVKnkEEV0dYSi4txlo0aJpq6Pmn9vixmX4T+FtfkspdS0Hwx4v0vXNds4kMhm0+J2EwKfxKC6kjoApJ4Fe0P8XPBUfgL/hNm8U6WPCfk+eNX+1L5BXbnAbP3sfw/ezxjPFdXNDHcwyQzRrLFIpR43UFWUjBBB6givDG/YZ+A7+IjrZ+Gmkm9LlzHul+zZJz/AMe+/wArHtsxXZCpSnTjTq3XK3tZ7+rX36+hhKM4ycoW17nIf8E79Tsdd+Efi/V9JlhXQ9U8aatfaZYRupaxtXdPLhdAf3Z4LbT2cHoRX1LXz1+zx+xroP7NvxI8ZeI/DWv6k2i69Gsdv4dk/wCPezAbcSW3EykHIRiAVVmBLE5r6FpY2dOpXlOk7p/1b5DoRlGmozVmgoooriNwooooA//Z" />
      </defs>
    </svg>
  </div>)
}

QuickOrderAutocomplete.propTypes = {
  onSelect: PropTypes.func,
}
export default injectIntl(QuickOrderAutocomplete)
