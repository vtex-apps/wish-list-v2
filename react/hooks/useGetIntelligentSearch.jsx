import axios from 'axios'
import { useState } from 'react'

const useGetIntelligentSearch = () => {
  const [searchProduct, setSearchProduct] = useState([])
  const [valueSearchSku, setValueSearchSku] = useState('')
  const [isShowProductSearch, setIsShowProductSearch] = useState(false)

  const changeValueSku = (event) => {
    const valueNameSku = event.target.value

    setValueSearchSku(valueNameSku)
  }

  const getSearchProduct = async () => {
    try {
      const axiosConfig = {
        method: 'get',
        url: `/api/io/_v/api/intelligent-search/product_search/?query=${valueSearchSku}`,
        headers: {
          Accept: 'application/json',
        },
      }

      const response = await axios(axiosConfig)
      const arrayDate = response.data.products

      setSearchProduct(arrayDate)
    } catch (error) {
      console.error(error)
    }

    setValueSearchSku('')
    setIsShowProductSearch(true)
  }

  return {
    searchProduct,
    valueSearchSku,
    isShowProductSearch,
    changeValueSku,
    getSearchProduct,
  }
}

export default useGetIntelligentSearch
