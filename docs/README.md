📢 Use this project, [contribute](https://github.com/clouda-inc/wish-list-v2) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# My Wishlists

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The **My Wishlists** app handles the favorite products of users. Users can create multiple lists and add the products they like to those lists. They can manage them and Add them to the cart and buy.

![Alt text](image-1.png)

## Configuration

To configure the My Wishlists app, check the sections below.

### Adding the My Wishlists app to your theme's dependencies

In your theme's `manifest.json`, add the Search Result app as a dependency:

```json
"dependencies": {
    "vtex.my-wishlists": "3.x"
}
```

Now, you can use all the blocks exported by the `my-wishlists` app.

Add the `wishlist-button` to Product Details page. In the example below, the `wishlist-button` is added to the `flex-layout.row` block from the `store.product` template, which uses the product context:

```json
  "store.product": {
    "children": [
      "flex-layout.row#wishlist-button-pdp",
    ]
  },
  "flex-layout.row#wishlist-button-pdp": {
    "children": [
      "button-wishlist-pdp"
    ]
  }
```

Add the `wishlist-button` to Search page. In the example below, the `wishlist-button` is added to the `product-summary.shelf` block under the `gallery` in `store.search` template:

```json
  "product-summary.shelf": {
    "children": ["responsive-layout.desktop#productSummary"]
  },
  "responsive-layout.desktop#productSummary": {
    "children": [
      "flex-layout.row#wishlist-button-plp"
    ]
  },
  "flex-layout.row#wishlist-button-plp": {
    "children": [
      "button-wishlist-pdp"
    ]
  }
```

## Master Data

Data in the wishlist are stored in VTEX masterdata entity named `myWishlists`.

This entity is created automatically when first time accessing the wishlist.

### Updating schema

If masterdata schema is updated during the development (if any changes added to schema), schema version needs to be updated.
On each schema version update new schema is created automatically with following format `{versionNumber}-mywishlists` (i.e. `0.0.2-mywishlists`).

#### Master data schema

Here is the latest masterdata schema.

Data Entity Name: `myWishlists`
Schema Name: `0.0.4-mywishlists`

<details><summary>myWishlists</summary>

```json
{
  "properties": {
    "email": {
      "type": "string",
      "format": "email"
    },
    "wishlistType": {
      "type": "string"
    },
    "products": {
      "type": "array"
    },
    "isPublic": {
      "type": "boolean"
    },
    "fieldsConfig": {
      "type": "array"
    }
  },
  "required": ["email", "wishlistType", "products", "isPublic"],
  "v-indexed": [
    "email",
    "wishlistType",
    "products",
    "isPublic",
    "fieldsConfig"
  ],
  "v-default-fields": [
    "email",
    "wishlistType",
    "products",
    "isPublic",
    "fieldsConfig"
  ],
  "v-cache": false,
  "v-immediate-indexing": true,
  "v-security": {
    "allowGetAll": true,
    "publicRead": [
      "id",
      "email",
      "wishlistType",
      "products",
      "isPublic",
      "fieldsConfig"
    ],
    "publicWrite": [
      "email",
      "wishlistType",
      "products",
      "isPublic",
      "fieldsConfig"
    ],
    "publicFilter": [
      "email",
      "wishlistType",
      "products",
      "isPublic",
      "fieldsConfig"
    ]
  }
}
```

</details>

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                           |
| ------------------------------------- |
| `notesContainer`                      |
| `addNotesIcons`                       |
| `notesButtonContainer`                |
| `notesSubmitButtonContainer`          |
| `notesSubmitButton`                   |
| `notesSubmitDisabledButton`           |
| `notesModalContainer`                 |
| `notesModalTitle`                     |
| `notesModalBottomRow`                 |
| `notesCancelButton`                   |
| `productSummary`                      |
| `productSummaryImageContainer`        |
| `productSummaryImage`                 |
| `productSummaryInfo`                  |
| `productSummaryInfoName`              |
| `productSummaryInfoDetails`           |
| `productSummaryInfoDetailsPartNumber` |
| `productSummaryInfoDetailsPrice`      |
| `noteSubTitle`                        |
| `autocompleteInputWrapper`            |
| `productPriceContainer`               |
| `unitPriceContainer`                  |
| `wishlistNameContainer`               |
| `buttonWishlistName`                  |
| `titleWishlistName`                   |
| `wishlistName`                        |
| `wishlistSearchContainer`             |
| `wishlistProductTexts`                |
| `wishlistSelector`                    |
| `wishlistSearchSKUContainer`          |
| `wishlistPrivacyOptionsContainer`     |
| `componentContainer`                  |
| `componentContainerHelper`            |
| `addSkuContainer`                     |
| `textContainer`                       |
| `textContainerTitle`                  |
| `textContainerDescription`            |
| `wishlistOptionTexts`                 |
| `wishlistCreationOptions`             |
| `wishlistCreateNew`                   |
| `wishlistDelete`                      |
| `wishlistAddItem`                     |
| `wishlistRemoveItem`                  |
| `wishlistDeleteWishList`              |
| `wishlistDeleteItem`                  |
| `wishlistCreateNewHelper`             |
| `wishlistSearchSKU`                   |
| `wishlistSelectListOne`               |
| `wishlistSelectListOneOption`         |
| `wishlistSelectListOneText`           |
| `MyWishListsPage`                     |
| `containerLinkShare`                  |
| `popupCopy`                           |
| `privacySettings`                     |
| `createListandAndSelectFav`           |
| `nameAndOptionsMobile`                |
| `optionsMobile`                       |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->

---

Check out some documentation models that are already live:

- [Breadcrumb](https://github.com/vtex-apps/breadcrumb)
- [Image](https://vtex.io/docs/components/general/vtex.store-components/image)
- [Condition Layout](https://vtex.io/docs/components/all/vtex.condition-layout@1.1.6/)
- [Add To Cart Button](https://vtex.io/docs/components/content-blocks/vtex.add-to-cart-button@0.9.0/)
- [Store Form](https://vtex.io/docs/components/all/vtex.store-form@0.3.4/)
