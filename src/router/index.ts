import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import Preview from "../pages/Preview.vue";
const routes: Array<RouteRecordRaw> = [
  {
    // 商品详情预览页面
    path: '/qr/:p',
    component: Preview,
    name: 'Preview',
    meta: { title: "商品详情" },
  },
  {
    // 商品支付结果
    path: '/paid',
    component: () => import('@/pages/Paid.vue'),
    meta: { title: "支付结果" },
    name: "Paid"
  },
  {
    // 商品详情预览页面
    path: '/ads',
    component: () => import('@/pages/Ads.vue'),
    meta: { title: "广告" },
  },


]
const router = createRouter({
  history: createWebHistory(''),
  routes
})

router.beforeEach((to, from, next) => {

  if (from.name && to.name === 'Preview') {
    window.location.reload()
  }
  window.document.title = `${to.meta?.title ?? ''}`
  next()
})

export default router
