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
  theme?: TTheme
  title: string
  otherCompany?: boolean
  canSelected?: boolean
  canDeleted?: boolean
}
