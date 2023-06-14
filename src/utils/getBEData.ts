export default function () {
  const MODE = import.meta.env.MODE
  if (MODE === "development") {
    return {
      totalPrice: "2.50",
      offPrice: "2.50",
      innerCode: "10100348",
      vmOnline: false,
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
        amountFen:130,
        id:'12222',

      }],
      campaignsAmount: 0,
      toPayPrice: "2.50",
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
    'toPayPrice'
  ]

  return keys.reduce<BEData>((temp, key) => {
    return {
      ...temp,
      // @ts-ignore
      [key]: window[key]
    }
  }, {} as BEData)
}

