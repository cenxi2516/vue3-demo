import type { PopconfirmProps, TooltipProps } from 'ant-design-vue'

export enum PresetThemeEnum {
  GUEST = 'guest', // default
  CATER = 'cater',
  OTHER = 'other'
}

export enum TThemeFieldEnum {
  MAIN_COLOR = 'mainColor',
  SECOND_COLOR = 'secondColor'
}

export enum TagStatusEnum {
  READONLY = 1,
  DELETED,
  SELECTED
}

export type TTagTheme = {
  [TThemeFieldEnum.MAIN_COLOR]: string
  [TThemeFieldEnum.SECOND_COLOR]?: string
}

export type TTheme = PresetThemeEnum | TTagTheme

export type TTagProps = {
  title: string
  theme?: TTheme
  isOtherCompany?: boolean
  canSelected?: boolean
  canDeleted?: boolean
  selected?: boolean
  delConfirm?: boolean
  limitByte?: number
  popConfirmProps?: PopconfirmProps
  tooltipProps?: TooltipProps
}

export type TConfirmDeleteFn = () => Promise<void>

export enum LabelTypeEnum {}

export enum LabelTypeThemeMapEnum {}

export type TTagOptionItem = {
  labelId: number
  labelName: string
  labelType: LabelTypeEnum
  canDeleted: boolean
  canSelected: boolean
  delConfirm: boolean
}
