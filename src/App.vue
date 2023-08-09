<script setup lang="ts">
import { onMounted } from "vue"
import getBEData from "./utils/getBEData"
// @ts-ignore
import Decimal from "./lib/decimal.min.mjs"
function addScript() {
  const head = document.getElementsByTagName("head")
  const script = document.createElement("script")
  const data = getBEData()
  script.src = `https://uboxgame.ubox.cn/games_gate/buy_page?source=ali-qr&vmcode=${
    data.innerCode
  }&uid=${data.uid}&pid=${
    data.goodId
  }&typeid=1&tabid=1&sellerId=1&price=${new Decimal(
    data.totalPrice ?? 0
  ).mul(100).toNumber()}&balance=${data.funds?.[0]?.balanceFen ?? 0}&time=${~~(
    Date.now() / 1000
  )}`
  script.defer = true

  if (!head.length) return
  const [firstHead] = head
  firstHead.appendChild(script)
}

onMounted(() => {
  addScript()
})
</script>
<template><router-view></router-view></template>
