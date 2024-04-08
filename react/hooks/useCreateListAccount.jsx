import { useState } from 'react'

const useCreateListAccount = () => {
  const [isModalAccountTable, setIsModalAccountTable] = useState(false)
  const [nameListAccountTable, setNameListAccountTable] = useState('')
  const [fieldValidationTable, setFieldValidationTable] = useState('')

  const [isModalAccount, setIsModalAccount] = useState(false)
  const [nameListAccount, setNameListAccount] = useState('')
  const [fieldValidation, setFieldValidation] = useState('')

  const buttonModalTable = () => {
    setIsModalAccountTable(true)
  }

  const buttonCloseModalTable = () => {
    setIsModalAccountTable(false)
  }

  const handleNameListTable = (event) => {
    const valueNameList = event.target.value

    setNameListAccountTable(valueNameList)
  }

  const buttonModal = () => {
    setIsModalAccount(true)
  }

  const buttonCloseModal = () => {
    setIsModalAccount(false)
  }

  const handleNameList = (event) => {
    const valueNameList = event.target.value

    setNameListAccount(valueNameList)
  }

  return {
    nameListAccountTable,
    isModalAccountTable,
    fieldValidationTable,
    isModalAccount,
    nameListAccount,
    fieldValidation,
    setNameListAccount,
    setFieldValidation,
    setIsModalAccount,
    buttonModal,
    buttonCloseModal,
    handleNameList,
    setFieldValidationTable,
    setNameListAccountTable,
    setIsModalAccountTable,
    buttonModalTable,
    buttonCloseModalTable,
    handleNameListTable,
  }
}

export default useCreateListAccount
