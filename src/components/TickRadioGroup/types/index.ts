export interface BaseOptionType {
  disabled?: boolean

  [p: string]: any
}

export type Indexable<T = any> = {
  [key: string]: T
}

export interface DefaultOptionType extends BaseOptionType {
  label?: any
  value?: string | number | null
  children?: Omit<DefaultOptionType, 'children'>[]
}

export type TOFTickRadioGroupProps = {
  value: any
  options: (DefaultOptionType | (DefaultOptionType & Indexable))[]
  multiple?: boolean
  disabled?: boolean
  required?: boolean
}

export type TSelectedSet = Indexable<boolean>
