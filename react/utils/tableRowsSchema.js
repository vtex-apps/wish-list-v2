import { useIntl } from 'react-intl'

const tableRowsSchema = {
  items: [
    {
      image: '',
      department: '',
      skuReferenceCode: '',
      name: '',
      qty: '',
      unitValue: '',
      totalValue: '',
    },
  ],
}

const tableLength = 5

export const initialJsonState = () => {
  const intl = useIntl()
  
  return {
    slicedData: tableRowsSchema.items.slice(0, tableLength),
    searchValue: '',
    emptyStateLabel: intl.formatMessage({ id: 'store/nothing-to-show' }),
    filterStatements: [
      intl.formatMessage({ id: 'store/ascending' }),
      intl.formatMessage({ id: 'store/descending' })
    ],
  }
}
