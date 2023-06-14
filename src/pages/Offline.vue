<template>
  <PageContainer>
    <Main>
      <div>
        <img src="../assets/images/empty_network.png" />
        <div>网络异常，请重试</div>
        <button @click="onBtnClick">关闭</button>
      </div>
    </Main>
  </PageContainer>
</template>

<script setup lang="ts">
import Main from "@/components/Main.vue"
import PageContainer from "@/components/PageContainer.vue"
import {} from "vue"

function onBtnClick() {
  ap.popWindow()
}
</script>

<style scoped lang="less">
@img-size: 150px;
img {
  width: @img-size;
  height: @img-size;
  margin-top: 88px;
}

main {
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      font-size: 14px;
      color: #3b3b3b;
      text-align: center;
      font-weight: 500;
      padding-top: 14px;
    }
    button {
      margin: 0;
      padding: 11px 44px;
      background: #ff7500;
      border-radius: 22px;
      border: none;
      font-size: 16px;
      color: #ffffff;
      text-align: right;
      font-weight: 500;
      margin-top: 50px;
    }
  }
}
</style>
