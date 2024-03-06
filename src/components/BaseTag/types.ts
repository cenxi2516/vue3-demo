export type TTagTheme = {
  mainColor: string
  secondColor?: string
}

export enum PresetThemeEnum {
  GUEST = 'guest', // default
  CATER = 'cater',
  OTHER = 'other'
}

export type TTheme = PresetThemeEnum | TTagTheme

export type TProps = {
  theme: TTheme
  title: string
  otherCompany?: boolean
  canSelected?: boolean
  canDeleted?: boolean
}
