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
}

export interface IQueryTagParams {
  guestId: number
}
export interface IAddGuestTagParams extends IQueryTagParams {
  preferLabelIdList: number[]
}

export interface IDeleteGuestTagParams extends IQueryTagParams {
  labelId: number
}

export const queryGuestTagList = async (params: IQueryTagParams): Promise<IRES<IRESTagItem[]>> =>
  http.post('/api/agreement_web/guest_label/info', { params })

export const queryCommonTagList = async (
  params: IQueryCommonTagListParams
): Promise<IRES<IRESTagItem[]>> =>
  http.post('/api/agreement_web/guest_label/query_list', { params })

export const addTagToLib = async (params: IAddTagParams): Promise<IRES<IRESTagItem>> =>
  http.post('/api/agreement_web/guest_label/add_to_system', { params })

export const addGuestTag = async (params: IAddGuestTagParams): Promise<IRES<boolean>> =>
  http.post('/api/agreement_web/guest_label/add', { params })

export const deleteGuestTag = async (params: IDeleteGuestTagParams): Promise<IRES<boolean>> =>
  http.post('/api/agreement_web/guest_label/delete', { params })
