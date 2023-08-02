<template>
  <Modal :visible="props.visible">
    <div class="component-wallet-select">
      <div>
        <div class="title-container">
          <div>请选择支付钱包</div>
          <Icon :source="close" @click="onClose" />
        </div>
        <div
          class="wallet-item"
          v-for="(item, index) in props.options"
          :key="index"
          @click="onClickItem(item)"
        >
          <div>
            <div>{{ item.name }}</div>
            <div>{{ `余额 ${new Decimal(item.balanceFen).div(100)}` }}</div>
          </div>
          <Icon :source="unUse" v-if="item.balanceFen == 0" />
          <Icon
            :source="activeImage"
            v-else-if="selected?.uniqueId == item.uniqueId"
          />
          <Icon :source="inactiveImage" v-else />
        </div>
      </div>
      <div class="btn" @click="onSelect">确定</div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import Modal from "./Modal.vue"
import activeImage from "../assets/images/rb_sel.png"
import inactiveImage from "../assets/images/rb_unsel.png"
import unUse from "../assets/images/un_use.png"
import close from "../assets/images/icon_close.png"
import Icon from "./Icon.vue"
import Decimal from "decimal.js"
const emit = defineEmits<{
  (e: "onClose"): void
  (e: "onSelect", item?: Wallet): void
}>()

const props = defineProps<{
  options: Wallet[]
  selectedItem?: Wallet
  visible: boolean
}>()

const selected = ref<Wallet>()

watch(
  () => [props.visible, props.selectedItem],
  newValue => {
    if (newValue) {
      selected.value = props.selectedItem
    }
  }
)

function onClose() {
  emit("onClose")
}

function onSelect() {
  emit("onSelect", selected.value)
}

function onClickItem(item: Wallet) {
  if (item.balanceFen == 0) return

  if (item.uniqueId == selected.value?.uniqueId) {
    return (selected.value = undefined)
  }
  selected.value = item
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
    padding: 10px 0;
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

.title-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
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
      // line-height: 16px;
      font-weight: 500;
    }
    & > div:last-child {
      font-size: 12px;
      color: #737373;
      letter-spacing: 0;
      // padding-top:8px;
    }
  }
}
</style>
