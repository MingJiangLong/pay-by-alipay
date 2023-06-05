<template>
  <div class="component-paid-card">
    <img :src="props.imgSource" />
    <div>{{ desc[0] ?? "" }}</div>
    <div>{{ desc[1] ?? "" }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
const props = defineProps<{
  message: string[]
  imgSource: string
}>()

const desc = computed(() => {
  console.log( props.message);
  
  return props.message
})
</script>

<style scoped lang="less">
@img-size: 76px;
.component-paid-card {
  margin: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > img {
    height: @img-size;
    width: @img-size;
    margin: 84px 0 54px;
  }
  div:nth-of-type(1) {
    font-size: 18px;
    color: #3b3b3b;
    letter-spacing: 0;
    text-align: center;
    font-weight: 500;
  }
  div:nth-of-type(2) {
    font-size: 16px;
    color: #ff641d;
    letter-spacing: 0;
    text-align: center;
    font-weight: 400;
    padding-top: 14px;
  }
}
</style>
