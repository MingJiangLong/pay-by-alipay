import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import Preview from "../pages/Preview.vue";
const routes: Array<RouteRecordRaw> = [
  {
    // 商品详情预览页面
    path: '/qr/:chapters(\\w+)',
    component: Preview,
    meta: { title: "商品详情" },
  },
  {
    // 商品支付结果
    path: '/paid',
    component: () => import('@/pages/Paid.vue'),
    meta: { title: "支付结果" },
  },
  {
    // 商品详情预览页面
    path: '/ads',
    component: () => import('@/pages/Ads.vue'),
    meta: { title: "广告" },
  },


]
const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(''),
  routes
})

router.beforeEach((to, _form, next) => {
  window.document.title = `${to.meta?.title ?? ''}`
  next()
})
export default router
