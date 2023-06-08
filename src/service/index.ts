import callWhenDev from '@/utils/callWhenDev'
import getBEData from '@/utils/getBEData'
import Axios from 'axios'

const axios = Axios.create({
  timeout: 1000 * 6,
  withCredentials: true,
})


axios.interceptors.request.use((config) => {
  callWhenDev(() => {
    console.log(`请求URL:${config.url}-->data:${JSON.stringify(config.data)}`);
  })
  return config
})

axios.interceptors.response.use(undefined, (error) => {
  callWhenDev(() => {
    console.log('接口出错:', error.code, error?.message);
  })
  return error
})
/**
 * 创建订单
 * @param data 
 * @returns 
 */
export function createOrder(data: {
  toPayPrice: string,
  // funds?: { amountFen: number, uniqueId: string }
  funds?: any
}) {

  const productInfo = getBEData()
  return axios.post<{
    error: number,
    message: string,
    toPay: number,
    trade: string
  }>('/vm/ajaxTrade', {
    totalPrice: productInfo.totalPrice,
    offPrice: productInfo.offPrice,
    innerCode: productInfo.innerCode,
    pid: productInfo.goodId,
    channel: productInfo.channel,
    coupons: productInfo.coupons,
    campaigns: productInfo.campaigns,
    ...data
  })
}

/**
 * 上报支付状态
 * @param params 
 * @returns 
 */
export function reportPaidStatus(params: {
  trade: string
  payResultCode: number
}) {
  return axios.get<{
    error: number;
    message: string;
    tradeSuccess: string;
    tradeStatus: string;
    vendSuccess: boolean
    vendStatus: string
    orderStatus: number
    adJson: any
  }>('/vm/report', {
    params: {
      channel: 'alipay',
      ...params
    }
  })
}

export function fetchAdsUrl() {

}