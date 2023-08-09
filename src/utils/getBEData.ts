export default function () {
  const MODE = import.meta.env.MODE
  if (MODE === "development") {
    return {
      totalPrice: "2.50",
      offPrice: "2.50",
      innerCode: "10100348",
      vmOnline: true,
      channel: "alipay",
      goodId: 308,
      goodName: "\u767E\u4E8B\u7F8E\u5E74\u8FBE\u6A59\u5473\u6C7D\u6C34330ml",
      goodsPic: "https://img.ubox.cn/ubox_mdse/308/0.png?t=20160922095628",
      goodsAvailable: true,
      funds: [
        { "balanceFen": 2355636, "name": "友宝钱包", "provider": 0, "uniqueId": "uboxWallet" },
        { "balanceFen": 1, "name": "友宝钱包2", "provider": 1, "uniqueId": "uboxWallet2" }
      ],
      //下面几项根据产品需求返回,可空
      coupons: [],
      couponsAmount: 0,
      campaigns: [{
        amountFen: 130,
        id: '12222',

      }],
      campaignsAmount: 0,
      toPayPrice: "2.50",
      uid: "2",
      ad: {"code":200,"msg":"推送广告-测试-114","adId":114,"adType":2,"pic":"http://v.dev.uboxol.com/ad-manager/img/1134545754531172352.jpg","url":"http://ubox-act.dev.uboxol.com/yqz6/zfbcj191015/wxlb?adid=114&vmid=0081118&uid=207152644&pid=1496&transcationId=&orderId=&key=0a8883cb4dcf4e439c331b494e685adb","cookievalue":"2-4-114-","data":"{\"closeTime\":0}"}
    }
  }

  let keys = [
    'totalPrice',
    'offPrice',
    'innerCode',
    'vmOnline',
    'channel',
    'goodId',
    'goodName',
    'goodsPic',
    'goodsAvailable ',
    'funds',
    'coupons',
    'couponsAmount',
    'campaigns',
    'campaignsAmount',
    'toPayPrice',
    'uid',
    'ad'
  ]

  return keys.reduce<BEData>((temp, key) => {
    return {
      ...temp,
      // @ts-ignore
      [key]: window[key]
    }
  }, {} as BEData)
}

