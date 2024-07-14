import { CategoryDataType } from '../../types/ecommerce';

export type DropdownPropsType= {
    options: CategoryDataType[],
    label: string,
    setDropdownValue : Function,
    initialValue ?: string
  }