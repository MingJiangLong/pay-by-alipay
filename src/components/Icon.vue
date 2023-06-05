<template>
  <img class="component-icon" :src="props.source" />
</template>

<script setup lang="ts">
import {} from "vue"

const props = defineProps<{ source: any }>()
</script>

<style scoped lang="less">
@icon-size: 18px;
.component-icon {
  height: @icon-size;
  width: @icon-size;
}
</style>
