import React from 'react'
import { Route } from 'vtex.my-account-commons/Router'

import MyWishLists from './components/MyWishLists'
import styles from './styles.css'

const MyWishListsPage = () => (
  <div className={styles.MyWishListsPage}>
    <Route path="/my-wishlists" exact component={MyWishLists} />
  </div>
)

export default MyWishListsPage
