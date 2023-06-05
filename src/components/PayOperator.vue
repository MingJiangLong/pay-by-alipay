<template>
  <div class="component-pay-operator">
    <div class="left-price">
      <div>
        <span>金额</span>
        <span>¥{{ props?.price ?? 0 }}</span>
      </div>
      <div>
        <span>共优惠</span>
        <span>¥{{ props?.discount ?? 0 }}</span>
      </div>
    </div>
    <div>
      <div class="component-btn" @click="onClick">立即支付</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
const props = defineProps<{
  price: string
  discount: number
}>()
const emit = defineEmits<{
  (e: "onClick"): void
}>()

function onClick() {
  emit("onClick")
}
</script>

<style scoped lang="less">
@btn-height: 50px;
@container-height: 66px;
.component-pay-operator {
  height: @container-height;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  align-items: center;
  padding: 0 20px;
  background: #ffffff;
  .component-btn {
    background: var(--ubox-btn-background);
    height: @btn-height;
    width: 160px;
    border-radius: 25px;
    color: #ffffff;
    text-align: center;
    font-size: 18px;
    letter-spacing: 2px;
    text-align: center;
    line-height: @btn-height;
    font-weight: 500;
  }

  .left-price {
    flex: 1;

    div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
    div:first-of-type {
      span:first-of-type {
        color: #3b3b3b;
      }
      span:last-of-type {
        font-size: 20px;
        color: #ff4027;
        letter-spacing: 0;
        font-weight: 600;
        padding: 0 var(--ubox-base-gap);
      }
    }
    div:last-of-type {
      font-size: 12px;
      padding-top: var(--ubox-base-gap);
      span:first-of-type {
        color: #3b3b3b;
      }
      span:last-of-type {
        color: #ff4027;
        letter-spacing: 0;
        padding: 0 var(--ubox-base-gap);
      }
    }
  }
}
</style>
