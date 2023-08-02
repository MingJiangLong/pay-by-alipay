<template>
  <div class="component-paid-card2" v-if="props.mode == 2">
    <img :src="props.imgSource" />
    <div class="des">
      <div>{{ desc[0] ?? "" }}</div>
      <div v-if="desc[1]?.length">{{ desc[1] ?? "" }}</div>
    </div>
  </div>
  <div class="component-paid-card" v-else>
    <img :src="props.imgSource" />
    <div>{{ desc[0] ?? "" }}</div>
    <div>{{ desc[1] ?? "" }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
const props = defineProps<{
  mode?: number
  message: string[]
  imgSource: string
}>()

const desc = computed(() => {
  return props.message
})

</script>

<style scoped lang="less">
@img-size: 76px;
@img-size2: 56px;

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
.component-paid-card2 {
  margin: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 8px;
  img {
    height: @img-size2;
    width: @img-size2;
    padding: 12px 24px;
  }

  .des {
    div:nth-of-type(1) {
      font-size: 18px;
      color: #3b3b3b;
      text-align: center;
      font-weight: 500;
    }
    div:nth-of-type(2) {
      font-size: 16px;
      color: #ff641d !important;
      text-align: center;
      font-weight: 400;
      padding-top: 6px;
    }
  }
}
</style>
