import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
const app = createApp(App);
// app.config.errorHandler = (_err, _vm, info) => {
//   ap.showToast({ content: info })
// }
ap.onResume(() => {
  window.location.reload()
})
app.use(router).mount('#app')
