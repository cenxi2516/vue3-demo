import type { IRESTagItem } from '@/api/tag'
import type { Ref, ShallowRef } from 'vue'
import { PresetThemeEnum } from '../BaseTag/types'

export type TReadonlyRef<T> = Readonly<Ref<T>>
export type TReadonlySRef<T> = Readonly<ShallowRef<T>>

export enum LabelTypeEnum {
  ROOM_PREFERENCE = 'ROOM_PREFERENCE',
  DIET_PREFERENCE = 'DIET_PREFERENCE',
  OTHER_PREFERENCE = 'OTHER_PREFERENCE'
}

export interface TTagOptionItem extends IRESTagItem {
  title: string
  theme: PresetThemeEnum
  canDeleted: boolean
  canSelected: boolean
  delConfirm: boolean
  selected: boolean
  isOtherCompany: boolean
}

export enum ThemeKeyEnum {
  GUEST = 'guestTagList',
  CATER = 'caterTagList',
  OTHER = 'otherTagList'
}

export type TCommonTagData = {
  [ThemeKeyEnum.GUEST]: TTagOptionItem[]
  [ThemeKeyEnum.CATER]: TTagOptionItem[]
  [ThemeKeyEnum.OTHER]: TTagOptionItem[]
}

export enum CreateTagTypeEnum {
  NOT_CREATED = 'not_created',
  SELECTED = 'selected',
  NOT_SELECTED = 'not_selected'
}

export enum AddTagTypeEnum {
  COMMON_LIB = 1,
  SEARCH_CREATE = 2
}

export interface ISearchTagOption {
  labelId?: number
  labelType?: LabelTypeEnum
  labelName: string
  selected: boolean // true already selected，false not selected
  created: boolean // true already created, false not created
}
