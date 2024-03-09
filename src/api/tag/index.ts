import { LabelTypeEnum } from '@/components/AddTagModal/types'
import type { IRES } from '@/hooks'
import http from '@/http'

export interface IRESTagItem {
  labelId: number
  labelType: LabelTypeEnum
  labelName: string
  isLocal?: boolean
}

export interface IQueryCommonTagListParams {
  labelName?: string
  size: number
}

export interface IAddTagParams {
  labelName: string
  labelType: LabelTypeEnum
  labelRemark?: string
}

export interface IAddGuestTagParams {
  guestId: number
  preferLabelIdList: number[]
}

export const queryCommonTagList = async (
  params: IQueryCommonTagListParams
): Promise<IRES<IRESTagItem[]>> =>
  http.post('/api/agreement_web/guest_label/query_list', { params })

export const addTagToLib = async (params: IAddTagParams): Promise<IRES<boolean>> =>
  http.post('/api/system_config/v1/prefer_label/add', { params })

export const addGuestTag = async (params: IAddGuestTagParams): Promise<IRES<void>> =>
  http.post('/api/agreement_web/guest_label/add', { params })
