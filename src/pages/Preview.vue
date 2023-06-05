<template>
  <PageContainer>
    <Main>
      <GoodsCard
        :goodsOriginPrice="pageData?.totalPrice"
        :goodsActualPrice="pageData?.offPrice"
        :goodsName="pageData?.goodName"
        :goodsUrl="pageData?.goodsPic"
      />
      <Coupons />
      <Wallet
        @onClick="onWalletClick"
        :deduction="deductionOfWallet"
        :name="selectedWallet?.name"
      />
      <WalletSelect
        :visible="isWalletSelectShow"
        @onClose="onSelectPayWay"
        :options="pageData?.funds ?? []"
      />
    </Main>
    <Footer>
      <PayOperator :price="bill" :discount="0" @onClick="onClickPayBtn" />
    </Footer>
  </PageContainer>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import GoodsCard from "@/components/GoodsCard.vue"
import PayOperator from "@/components/PayOperator.vue"
import PageContainer from "@/components/PageContainer.vue"
import Main from "@/components/Main.vue"
import Footer from "@/components/Footer.vue"
import Coupons from "@/components/Coupons.vue"
import Wallet from "@/components/Wallet.vue"
import WalletSelect from "@/components/WalletSelect.vue"
import getBEData from "@/utils/getBEData"
import getNumber from "@/utils/getNumber"
import { createOrder, reportPaidStatus } from "@/service"
import { useRouter } from "vue-router"
import { ALIPAY_STATUS, UBOX_REQUEST_SUCCESS } from "@/config/constant"
import callWhenDev from "@/utils/callWhenDev"
const router = useRouter()
const pageData = ref<BEData>()
const isWalletSelectShow = ref(false)

/** 选中的钱包 */
const selectedWallet = ref<Wallet>()

/** 钱包抵扣金额 */
const deductionOfWallet = ref<number>()

/** 账单需要支付金额 */
const bill = computed(() => {
  //支付金额 = 折扣后的金额 - 活动 - 优惠券 - 钱包(目前没有活动和优惠券)
  return `${
    (getNumber(pageData.value?.offPrice) * 100 -
      getNumber(deductionOfWallet.value) * 100) /
    100
  }`
})

/**
 * 拉起支付宝收银台支付
 * @param trade
 */
function alipay(trade: string) {
  return new Promise<ResultCode>(s => {
    ap.tradePay(
      {
        tradeNO: trade,
      },
      paidResult => {
        s(paidResult.resultCode)
      }
    )
  })
}

/**
 * 创建友宝订单
 */
async function createUboxOrder() {
  try {
    ap.showLoading({ content: "创建订单中..." })
    let orderInfo = await createOrder({
      toPayPrice: bill.value ?? "0",
      funds:
        deductionOfWallet.value && deductionOfWallet.value > 0
          ? {
              amountFen: (deductionOfWallet.value ?? 0) * 100,
              uniqueId: selectedWallet.value?.uniqueId ?? "",
            }
          : undefined,
    })
    if (orderInfo.data.error != 0) throw new Error(orderInfo.data.message)
    return orderInfo
  } catch (error) {
    throw error
  } finally {
    ap.hideLoading()
  }
}

/**
 * 上报支付状态到友宝后台
 * @param trade
 * @param status
 */
async function reportStatus2Ubox(trade: string, status: number) {
  try {
    ap.showLoading({ content: "加载中..." })
    let reportResult = await reportPaidStatus({
      trade: trade,
      payResultCode: status,
    })

    if (reportResult.data.error != 0) throw new Error(reportResult.data.message)
    return reportResult
  } catch (error) {
    throw error
  } finally {
    ap.hideLoading()
  }
}

/**
 * 支付按钮点击
 */
async function onClickPayBtn() {
  try {
    let temp = await createUboxOrder()
    let alipayCode: ResultCode = ALIPAY_STATUS.SUCCESS

    if (temp.data.toPay != 0) {
      alipayCode = await alipay(temp.data.trade)
    }

    let reportResult = await reportStatus2Ubox(temp.data.trade, alipayCode)
    if (reportResult.data.error != UBOX_REQUEST_SUCCESS)
      throw new Error(reportResult.data.message)

    let reportResultData = reportResult?.data

    // let alipayCode = 9000
    // let reportResultData = {
    //   orderStatus: 9,
    //   adJson:"{}"
    // }
    if (alipayCode != ALIPAY_STATUS.SUCCESS && alipayCode != ALIPAY_STATUS.FAIL)
      return

    if (alipayCode == ALIPAY_STATUS.FAIL) {
      return router.push({
        path: "/paid",
        query: {
          uboxStatus: reportResultData.orderStatus,
          alipayCode: ALIPAY_STATUS.FAIL,
        },
      })
    }

    try {
      let adJson = JSON.parse(reportResultData?.adJson)
      if (adJson?.url) {
        return (window.location.href = adJson?.url)
      }
    } catch (error) {}

    router.push({
      path: "/paid",
      query: {
        uboxStatus: reportResultData.orderStatus,
        alipayCode: ALIPAY_STATUS.SUCCESS,
      },
    })
  } catch (error: any) {
    ap.showToast({
      content: error?.message,
      type: "fail",
    })
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  }
}

/**
 * 选择钱包
 * @param item
 */
function onSelectPayWay(item?: number) {
  // 未选择钱包
  if (item == undefined) {
    isWalletSelectShow.value = false
    selectedWallet.value = undefined
    return (deductionOfWallet.value = undefined)
  }

  let wallet = pageData.value?.funds[item]

  if (wallet == undefined) {
    deductionOfWallet.value = undefined
    isWalletSelectShow.value = false
    return ap.showToast({ content: "无效钱包选择!" })
  }

  // 价格(元)和钱包(分)单位不统一
  selectedWallet.value = wallet
  deductionOfWallet.value =
    getNumber(wallet.balanceFen) >= getNumber(pageData.value?.offPrice) * 100
      ? getNumber(pageData.value?.offPrice)
      : getNumber(wallet.balanceFen) / 100
  isWalletSelectShow.value = false
}

/**
 * 打开钱包选择
 */
function onWalletClick() {
  isWalletSelectShow.value = true
}

onMounted(() => {
  pageData.value = getBEData()

  callWhenDev(() => {
    console.log(JSON.stringify(getBEData()))
  })
})
</script>

<style scoped lang="less"></style>
