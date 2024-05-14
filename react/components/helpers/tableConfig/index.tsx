import React, { useState } from 'react'
import { Checkbox } from 'vtex.styleguide'

export const handleNextClick = ({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage,
}) => {
  if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
    setCurrentPage(Number(currentPage) + 1)
  }
}

export const handlePrevClick = (
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1)
  }
}

// Create list post
export const handleSubmitDataTable = ({
  event,
  createWishlist,
  setFieldValidationTable,
  nameListAccountTable,
  setNameListAccountTable,
  setIsModalAccountTable,
}) => {
  event.preventDefault()

  if (nameListAccountTable.trim() === '') {
    setFieldValidationTable('The field cannot be empty')
  } else {
    createWishlist({
      variables: {
        wishlist: {
          wishlistType: nameListAccountTable,
          isPublic: false,
          products: [],
        },
      },
    })
    setNameListAccountTable('')
    setFieldValidationTable('')
    setNameListAccountTable(false)
    setIsModalAccountTable(false)
  }
}

// Filter Table
export const SelectorObject = (props: any, filterState: any) => {
  const [, setNewValueObject] = useState({})

  const initialValue = {
    Ascending: false,
    Descending: false,
    ...(props.value || {}),
  }

  const toggleValueByKey = (key) => {
    const copyInitialObject = {
      ...(props.value || initialValue),
    }

    const newValue = {
      ...copyInitialObject,
      [key]: copyInitialObject ? !copyInitialObject[key] : false,
    }

    setNewValueObject(newValue)

    return newValue
  }

  return (
    <div>
      {Object.keys(initialValue).map((opt, index) => {
        return (
          <div className="mb3" key={`class-statement-object-${opt}-${index}`}>
            <Checkbox
              checked={props.value ? props?.value?.[opt] : filterState?.[opt]}
              label={opt}
              name="default-checkbox-group"
              onChange={() => {
                const newValue = toggleValueByKey(`${opt}`)
                const newValueKeys = Object.keys(newValue)
                const isEmptyFilter = !newValueKeys.some(
                  (key) => !newValue[key]
                )

                props.onChange(isEmptyFilter ? null : newValue)
              }}
              value={opt}
            />
          </div>
        )
      })}
    </div>
  )
}

export const handleFiltersChange = ({
  statements,
  initialState,
  setInitialState,
  paginatedData,
  setPaginatedData,
  setDisplayedProducts,
  onChangeStatements,
  setfilterState,
  filterState,
}) => {
  const newData = paginatedData ? [...paginatedData] : []

  if (onChangeStatements?.object) {
    const { subject, object } = onChangeStatements

    setfilterState({ ...filterState, [subject]: onChangeStatements })

    switch (subject) {
      case 'department':
        newData.sort((a, b) => {
          return object.Ascending
            ? a.department.localeCompare(b.department)
            : b.department.localeCompare(a.department)
        })
        break

      case 'name':
        newData.sort((a, b) => {
          return object.Ascending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        })
        break

      default:
        // Manejar caso no reconocido
        break
    }
  }

  setPaginatedData(newData)
  setDisplayedProducts(newData)

  if (statements.length <= 0) {
    return
  }

  const newDataLength = newData.length
  const { tableLength } = initialState
  const newSlicedData = newData.slice(0, tableLength)

  setInitialState((prevState) => ({
    ...prevState,
    filterStatements: statements,
    slicedData: newSlicedData,
    itemsLength: newDataLength,
    currentItemTo: Math.min(tableLength, newDataLength),
  }))
}
