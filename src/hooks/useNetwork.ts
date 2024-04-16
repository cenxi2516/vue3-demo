enum NetworkSignalTypeEnum {
  SLOW_2G = 'slow-2g',
  NORMAL_2G = '2g',
  NORMAL_3G = '3g',
  NORMAL_4G = '4g'
}

enum NetworkSignalTypeEnum {
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
  online = 'online',
  offline = 'offline',
  change = 'change'
}

type TNetwork = {
  since?: Date // 记录检测时间
  onLine?: boolean // 记录是否有网络
  rtt: number // 记录时延
  downlink: number // 记录带宽，M/s
  downlinkMax: number // 记录最大带宽，M/s
  saveData: boolean // 记录用户代理是否设置了减少数据使用
  effectiveType: NetworkSignalTypeEnum // 记录网络信号类型
  type: NetworkSignalTypeEnum // 记录网络通信连接类型
}

// 获取网络状态
const getConnection = () => {
  const nav: Navigator = window.navigator
  if (!(nav instanceof Navigator)) return null

  return nav.connection || nav.mozConnection || nav.webkitConnection;
}


export const useNetwork = () => {}
