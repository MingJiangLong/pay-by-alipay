/**
 * 商品详情
 */
interface GoodsInfo {
  goodsUrl?: string
  goodsName?: string
  goodsPrice?: string
}
interface Window {
  ubox_toast_timer: undefined | NodeJS.Timeout;

  session?: string
  // 后端注入信息
  totalPrice: string;
  offPrice: string;
  innerCode: string;
  vmOnline: boolean;
  channel: string;
  goodId: number;
  goodName: string;
  goodsPic: string;
  goodsAvailable: boolean;
  funds: { "balanceFen": number, "name": string, "provider": number, "uniqueId": string }[];
  //下面几项根据产品需求返回,可空
  coupons: any[];
  couponsAmount: number;
  campaigns: any[];
  campaignsAmount: number;
  toPayPrice: string;
}
interface BEData {
  totalPrice: string,
  offPrice: string,
  innerCode: string,
  vmOnline: boolean,
  channel: string,
  goodId: number,
  goodName: string,
  goodsPic: string,
  goodsAvailable: boolean,
  funds: Wallet[],
  //下面几项根据产品需求返回,可空
  coupons: any[],
  couponsAmount: number,
  campaigns: any[],
  campaignsAmount: number,
  toPayPrice: string,
}
interface Wallet {
  balanceFen: number
  name: string,
  provider: number
  uniqueId: string

}
type PaidStatus = 'success' | 'failed' | 'yield'
type ResultCode = |
  /** 订单支付成功 */
  9000 |

  /** 正在处理中 */
  8000 |

  /** 订单支付失败 */
  4000 |

  /** 用户中途取消 */
  6001 |

  /** 网络连接出错 */
  6002 |

  /** 用户点击忘记密码导致快捷界面退出(only iOS) */
  99
type TradePayParams = {
  tradeNO?: string
}
declare namespace ap {

  const isAlipay: boolean
  /**
   * 支付接口
   * @param params 
   * @param callback 
   */
  function tradePay(params: TradePayParams, callback: (opt: {
    resultCode: ResultCode
  }) => void): void

  function showToast(options: {
    content: string
    type?: 'success' | 'fail' | 'exception' | 'none'
    duration?: number
  }, callback?: () => void): void
  function hideToast(): void

  function showLoading(option: { content?: string, delay?: number }): void
  function hideLoading(): void
  function popWindow(): void
  function popTo(index?: number): void

  function onResume(callback: (params?: any) => void): void

  function pushWindow({
    url: string
  }): void

  function onResume(callback: () => void)
}

