<template>
  <div class="component-paid-confirm-btn" @click="onClick">{{ btnTitle }}</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
const props = defineProps<{
  type: "success" | "failed" | "yield"
}>()

const btnTitle = computed(() => {
  const titleMap = {
    success: "关闭",
    failed: "返回",
    yield: "刷新",
  }
  return titleMap[props.type]
})
const emit = defineEmits<{
  (e: "onClick"): void
}>()

function onClick() {
  emit("onClick")
}
</script>

<style scoped lang="less">
@btn-height: 50px;
.component-paid-confirm-btn {
  height: @btn-height;
  border-radius: 25px;
  background: var(--ubox-btn-background);
  margin: 8px 20px;

  font-size: 18px;
  color: #ffffff;
  letter-spacing: 2px;
  text-align: center;
  font-weight: 500;
  line-height: @btn-height;
}
</style>
