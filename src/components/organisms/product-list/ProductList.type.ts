import {type StoredCategoryData , type ProductDataType} from '../../types/ecommerce'

export type ProductListPropsType = {
    category: StoredCategoryData,
    products: ProductDataType[]
  }