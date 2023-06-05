<template>
  <div
    v-if="props.visible"
    class="component-modal-container"
    :style="{
      justifyContent: props.justifyContent ?? 'center',
      alignItems: props.alignItem ?? 'flex-end',
    }"
  >
    <children />
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue"
const props = defineProps<{
  visible?: boolean
  justifyContent?: string
  alignItem?: string
}>()
const slots = useSlots()
const children = () => slots.default?.()
</script>

<style scoped lang="less">
.component-modal-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  background: transparent;
  z-index: 200;
  display: flex;
  flex-direction: row;
  background: #00000047;
  font-size: 14px;

  animation: show 500ms ease 1 forwards;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide {
}
</style>
