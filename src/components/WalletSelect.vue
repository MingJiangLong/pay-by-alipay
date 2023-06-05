<template>
  <Modal>
    <div class="component-wallet-select">
      <div>
        <div>请选择支付钱包</div>
        <div
          class="wallet-item"
          v-for="(item, index) in props.options"
          :key="index"
          @click="onClickItem(index, item)"
        >
          <div>
            <div>{{ item.name }}</div>
            <div>{{ `余额 ${item.balanceFen / 100}` }}</div>
          </div>
          <Icon :source="unUse" v-if="item.balanceFen == 0" />
          <Icon :source="activeImage" v-else-if="selected == index" />
          <Icon :source="inactiveImage" v-else />
        </div>
      </div>
      <div class="btn" @click="onClose">确定</div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Modal from "./Modal.vue"
import activeImage from "../assets/images/rb_sel.png"
import inactiveImage from "../assets/images/rb_unsel.png"
import unUse from "../assets/images/un_use.png"
import Icon from "./Icon.vue"
const emit = defineEmits<{
  (e: "onClose", item?: number): void
}>()
const props = defineProps<{
  options: { name: string; balanceFen: number }[]
}>()
const selected = ref<number>()

function onClose() {
  emit("onClose", selected.value)
}
function onClickItem(index: number, item: any) {
  if (item.balanceFen == 0) return
    
  if (index == selected.value) {
    return (selected.value = undefined)
  }
  selected.value = index
}
</script>

<style scoped lang="less">
.component-wallet-select {
  min-height: 60%;
  width: 100%;
  background: #f4f6f8;
  border-radius: 20px 20px 0 0;
  opacity: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  div:first-of-type {
    font-size: 16px;
    color: #3b3b3b;
    letter-spacing: 0;
    text-align: center;
    padding: 16px 0;
    flex: 1;
  }
  .btn {
    background-image: var(--ubox-btn-background);
    border-radius: 25px;
    height: 50px;
    color: #ffffff;
    line-height: 50px;
    font-size: 18px;
    letter-spacing: 2px;
    text-align: center;
    font-weight: 500;
    margin: 10px 20px;
  }
}
.wallet-item {
  display: flex;
  flex-direction: row;
  height: 68px;
  background: #ffffff;
  margin: 5px 16px 10px 16px;
  border-radius: 8px;
  align-items: center;
  padding: 16px;
  div:first-of-type {
    flex: 1;
    text-align: left;
    & > div:first-child {
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
      line-height: 16px;
      font-weight: 500;
    }
    & > div:last-child {
      font-size: 12px;
      color: #737373;
      letter-spacing: 0;
      padding-top: var(--ubox-base-gap);
    }
  }
}
</style>
