import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

const MyWishListsLink = ({ render, intl }) => {
  return render([
    {
      name: intl.formatMessage({ id: 'Favorites Lists' }),
      path: '/my-wishlists',
    },
  ])
}

MyWishListsLink.propTypes = {
  render: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(MyWishListsLink)
