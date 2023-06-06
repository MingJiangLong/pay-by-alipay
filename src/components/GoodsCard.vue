<template>
  <div class="goods-detail-card">
    <img :src="props.goodsUrl" />
    <div>
      <div class="goods-name">
        {{ props.goodsName ?? "" }}
      </div>
      <div class="goods-price">
        <span
          :style="{
            color:
              props.goodsActualPrice == props.goodsOriginPrice
                ? 'black'
                : 'red',
          }"
          v-if="`${props.goodsActualPrice ?? ''}`.length"
          >{{ `¥${props.goodsActualPrice ?? ""}` }}</span
        >
        <span
          v-if="
            `${props.goodsOriginPrice ?? ''}`.length &&
            props.goodsActualPrice != props.goodsOriginPrice
          "
          >{{ `¥${props.goodsOriginPrice ?? ""}` }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue"

const props = defineProps<{
  goodsUrl?: string
  goodsName?: string
  goodsOriginPrice?: string
  goodsActualPrice?: string
}>()
</script>
<style scoped lang="less">
.goods-detail-card {
  margin: 8px;
  height: 130px;
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  background: #ffffff;
  align-items: center;
  img {
    height: 90px;
    width: 90px;
    margin: 0 16px;
  }
}
.goods-name {
  font-family: var(--ubox-font-family);
  font-size: 14px;
  color: #3b3b3b;
  letter-spacing: 0;
  font-weight: 500;
}

.goods-price {
  padding-top: 2px;
  & > span:nth-child(odd) {
    font-size: 18px;
    color: #ff4027;
    letter-spacing: 0;
    font-weight: 500;
  }
  & > span:nth-child(even) {
    font-size: 13px;
    color: #737373;
    letter-spacing: 0;
    padding-left: var(--ubox-base-gap);
    text-decoration-line: line-through;
  }
}
</style>
