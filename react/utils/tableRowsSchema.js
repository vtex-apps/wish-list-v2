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

export const initialJsonState = {
  slicedData: tableRowsSchema.items.slice(0, tableLength),
  searchValue: '',
  emptyStateLabel: 'Nothing to show.',
  filterStatements: ['Ascending', 'Descending'],
}
