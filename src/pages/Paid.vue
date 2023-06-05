<template>
  <PageContainer>
    <Main>
      <PaidCard :message="paidResult" :imgSource="imgSource" />
    </Main>
    <Footer>
      <PaidConfirmBtn
        :type="uboxStatus == 6 ? 'success' : 'failed'"
        @onClick="onOperatorClick"
      />
    </Footer>
  </PageContainer>
</template>

<script setup lang="ts">
import Main from "@/components/Main.vue"
import PageContainer from "@/components/PageContainer.vue"
import Footer from "@/components/Footer.vue"
import { computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import PaidCard from "@/components/PaidCard.vue"
import PaidConfirmBtn from "@/components/PaidConfirmBtn.vue"
import { ALIPAY_STATUS, UBOX_STATUS } from "@/config/constant"

import fail from "../assets/images/result_icon_failure.png"
import pending from "../assets/images/result_icon_waiting.png"
import success from "../assets/images/result_success.png"

const route = useRoute()
const router = useRouter()
const paidResult = computed(() => {
  let query = route.query
  const uboxStatus: any = query?.uboxStatus
  const alipayCode: any = query?.alipayCode

  if (alipayCode == ALIPAY_STATUS.FAIL) return ["支付失败", "请重新下单"]

  const uboxStatusMessageMap: any = {
    1: ["支付失败",void 0],
    5: ["支付成功", "出货中"],
    6: ["出货成功", "请取货"],
    7: ["支付成功", "出货中"],
    8: [void 0, "出货失败,稍后自动退款"],
    9: [void 0, "出货失败,稍后自动退款"],
  }
  return uboxStatusMessageMap[uboxStatus] ?? (["", ""] as string[])
})

const imgSource = computed(() => {
  let query = route.query
  const uboxStatus: any = query?.uboxStatus
  const alipayCode: any = query?.alipayCode
  if (alipayCode === ALIPAY_STATUS.FAIL) return fail
  if (uboxStatus == UBOX_STATUS.ALL_SUCCESS) return success
  return pending
})

const uboxStatus = computed(() => {
  return route.query?.uboxStatus as string | number
})

function onOperatorClick() {
  if (uboxStatus.value == "6") {
    return ap.popWindow()
  }
  router.back()
}
</script>

<style scoped lang="less"></style>
