<template>
  <div class="component-coupon-container">
    <div v-for="item in coupons" class="coupon-item" :key="item.name">
      <div>
        <Icon :source="item.imageSource" />
        <div class="coupon-name">{{ item.name }}</div>
        <Tag title="已选择最佳优惠" />
      </div>
      <div>
        <span>暂无</span>
        <Icon :source="rightArrow" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
import Icon from "./Icon.vue"
import couponsImage from "../assets/images/icon_coupon.png"
import activeImage from "../assets/images/icon_activity.png"
import rightArrow from "../assets/images/arrow_right_gray.png"
import Tag from "./Tag.vue"
const coupons = [
  {
    imageSource: couponsImage,
    name: "优惠券",
  },
  {
    imageSource: activeImage,
    name: "活动",
  },
]
</script>

<style scoped lang="less">
.component-coupon-container {
  margin: var(--ubox-base-gap);
  background: #ffffff;
  border-radius: 4px;
  font-size: 14px;
  color: #3b3b3b;
  font-weight: 500;
  .coupon-item {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    padding: 12px;
    & > div:first-child {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: var(--ubox-base-gap);
    }
    & > div:last-child {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: var( --ubox-grey);
      padding-left: var(--ubox-base-gap);
    }
    .coupon-name {
      padding: 0 var(--ubox-base-gap);
      font-size: 14px;
      color: #3b3b3b;
      letter-spacing: 0;
      line-height: 14px;
      font-weight: 500;
    }
  }
}
</style>
