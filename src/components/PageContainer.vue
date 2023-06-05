<template>
  <div class="component-page-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.component-page-container {
  flex: 1;
  display: flex;
  background: #f4f6f8;
  flex-direction: column;
}
</style>
