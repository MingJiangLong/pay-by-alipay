<template>
  <div class="component-container" @click="onClick">
    <div>
      <Icon :source="walletImage" />
      <div>{{ props.name ?? "钱包" }}</div>
    </div>
    <div>
      <div :style="{ color: props.deduction ? 'red' : '#929292' }">
        {{
          props.deduction
            ? `-¥ ${getNumber(props.deduction).toFixed(2)}`
            : " 可选择钱包支付"
        }}
      </div>
      <Icon :source="rightArrow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import walletImage from "../assets/images/icon_wallet.png"
import rightArrow from "../assets/images/arrow_right_gray.png"
import {} from "vue"
import Icon from "./Icon.vue"
import getNumber from "@/utils/getNumber"
const emit = defineEmits<{
  (e: "onClick"): void
}>()
const props = defineProps<{
  deduction?: number | string
  name?: string
}>()
function onClick() {
  emit("onClick")
}
</script>

<style scoped lang="less">
.component-container {
  display: flex;
  flex-direction: row;
  height: 50px;
  background: #ffffff;
  margin: var(--ubox-base-gap);
  padding: 0 12px;
  padding-left: 20px;
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  & > div:first-child {
    flex: 1;
    div {
      font-size: 14px;
      color: #3b3b3b;
      letter-spacing: 0;
      font-weight: 500;
      padding-left: var(--ubox-base-gap);
    }
  }

  & > div:last-child {
    font-size: 14px;
    letter-spacing: 0;
    font-weight: 400;
  }
}
</style>
