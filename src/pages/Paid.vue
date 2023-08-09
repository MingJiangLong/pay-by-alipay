<template>
  <PageContainer>
    <Main>
      <PaidCard
        :message="paidResult"
        :imgSource="imgSource"
        :mode="!!picAds.imageUrl ? 2 : 1"
      />
      <!-- 广告 -->
      <img
        v-if="picAds.imageUrl"
        :src="picAds.imageUrl"
        @click="onPicAdsClick(picAds.redirectUrl)"
      />
    </Main>
    <Footer>
      <div>客服电话：4001-528-528</div>
    </Footer>
  </PageContainer>
</template>

<script setup lang="ts">
import Main from "@/components/Main.vue"
import PageContainer from "@/components/PageContainer.vue"
import Footer from "@/components/Footer.vue"
import { computed } from "vue"
import { useRoute } from "vue-router"
import PaidCard from "@/components/PaidCard.vue"
import { ALIPAY_STATUS, UBOX_STATUS } from "@/config/constant"

import fail from "../assets/images/result_icon_failure.png"
import pending from "../assets/images/result_icon_waiting.png"
import success from "../assets/images/result_success.png"

const route = useRoute()
const paidResult = computed(() => {
  let query = route.query
  const uboxStatus: any = query?.uboxStatus
  const alipayCode: any = query?.alipayCode

  if (alipayCode == ALIPAY_STATUS.FAIL) return ["支付失败", "请重新下单"]

  const uboxStatusMessageMap: any = {
    1: ["支付失败", void 0],
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


const picAds = computed(() => {
  const query = route.query
  return {
    imageUrl: query.imageUrl as string,
    redirectUrl: query.redirectUrl as string,
  }
})

function onPicAdsClick(link: string) {
  if (!link) return
  window.location.href = link
}
</script>

<style scoped lang="less">
footer {
  font-size: 13px;
  color: #929292;
  text-align: center;
  font-weight: 400;
  padding: 20px 0;
}

img {
  box-sizing: border-box;
  width: 100%;
  object-fit: fill;
  padding: 15px 8px;
  border-radius: 8px;
}
</style>
