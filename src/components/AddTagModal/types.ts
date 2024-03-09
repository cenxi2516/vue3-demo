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
