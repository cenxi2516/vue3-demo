import { useEventListener } from '@vueuse/core'
import { pick } from 'lodash-es'
import { onMounted, shallowRef } from 'vue'

export enum NetworkSignalTypeEnum {
  SLOW_2G = 'slow-2g',
  NORMAL_2G = '2g',
  NORMAL_3G = '3g',
  NORMAL_4G = '4g'
}

export enum NetworkTypeEnum {
  BLUETOOTH = 'bluetooth',
  CELLULAR = 'cellular',
  ETHERNET = 'ethernet',
  NONE = 'none',
  WIFI = 'wifi',
  WIMAX = 'wimax',
  OTHER = 'other',
  UNKNOWN = 'unknown'
}

enum NetWorkEventType {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CHANGE = 'change'
}

interface INetworkInformation {
  rtt: number // 记录时延
  downlink: number // 记录带宽，M/s
  downlinkMax?: number // 记录最大带宽，M/s
  saveData: boolean // 记录用户代理是否设置了减少数据使用
  effectiveType: NetworkSignalTypeEnum // 记录网络信号类型
  type?: NetworkTypeEnum // 记录网络通信连接类型
}

export interface TNetwork extends INetworkInformation {
  since?: Date // 记录检测时间
  onLine: boolean // 记录是否有网络
}

// 获取Connection
const getConnection = (): INetworkInformation | null => {
  type TNav = Navigator & {
    connection: INetworkInformation
    mozConnection?: INetworkInformation
    webkitConnection?: INetworkInformation | null
  }
  const nav = window.navigator as TNav
  if(!(nav instanceof Navigator)) return null

  return nav.connection || nav.mozConnection || nav.webkitConnection
}

// 获取网络在线还是离线
const getOnLine = () => window.navigator.onLine

// 获取Connection Property
const getConnectionProperty = (onLine?: boolean): TNetwork | {} => {
  const connection = getConnection()

  if(!connection) return {}

  return {
    since: new Date(),
    onLine: onLine ?? getOnLine(),
    ...pick(connection, ['rtt', 'downlink', 'downlinkMax', 'saveData', 'effectiveType', 'type'])
  }
}

export const useNetwork = () => {
  const _network = shallowRef<Partial<TNetwork>>(getConnectionProperty())

  const _setNetWork = (onLine?: boolean) => {
    _network.value = getConnectionProperty(onLine)
  }

  onMounted(() => {
    useEventListener(window, NetWorkEventType.OFFLINE, () => _setNetWork(false))
    useEventListener(window, NetWorkEventType.ONLINE, () => _setNetWork(true))
    const connection = getConnection() as any

    connection &&
    useEventListener(connection, NetWorkEventType.CHANGE, (e) => _setNetWork())
  })

  return _network
}
