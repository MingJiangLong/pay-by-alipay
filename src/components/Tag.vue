<template>
  <span class="component-tag">
    {{ props.title }}
  </span>
</template>

<script setup lang="ts">
import {} from "vue"
const props = defineProps<{
  title: string
}>()
</script>

<style scoped lang="less">
.component-tag {
  padding: 3px 4px;
  border: 0.5px solid rgba(255, 64, 39, 1);
  border-radius: 2px;
  color: red !important;
  font-size: 14px;
  transform: scale(.75);
}
</style>
